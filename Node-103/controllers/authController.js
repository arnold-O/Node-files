const User = require("../models/User");
const asyncHandler = require("../utils/asyncWrapper");
const sendEmail = require("../utils/email");
const ErrorResponse = require("../utils/errorResponse");
const crypto = require("crypto");

// @desc     Register User
// @route   /api/v1/auth/register
// @access   Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !name) {
    return next(new ErrorResponse("please enter email and password"));
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

// @desc     Login User
// @route   /api/v1/auth/login
// @access   Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("please enter email and password"));
  }

  // check user in  DB
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("No User  found", 401));
  }

  // compare password

  const matchPassword = await user.matchPassword(password);

  if (!matchPassword) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// Get Token  and send cookie response

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE.env === "production") {
    options.secure = true;
  }
  res.cookie("token", token, options)
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

// @desc    Get current logged in User
// @route   Get /api/v1/auth/me
// @access   Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if(!user){
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});


// @desc    Log User Out / Clear cookie
// @route   Get /api/v1/auth/logout
// @access   Private

exports.logOut = asyncHandler(async (req, res, next) => {
 
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly:true
  })
 

  res.status(200).json({
    status: "success",
    
  });
});

// @desc    Get current logged in User
// @route   /api/v1/auth/forgotpassword
// @access   public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorResponse(
        `There is no user with this Email ${req.body.email}`,
        404
      )
    );
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `you recieving this message because you or someone else requested for a password reset .... you link for reset is ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset link is valid for 10mins",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "link sent to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new Error("There was error sending the Email", 500));
  }
});

// @desc    Reset Password
// @route     PUT  /api/v1/auth/resetpassword/:resetToken
// @access   public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse(`Invalid Token`, 404));
  }
  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});



// @desc    UpDATE LOGGED IN USER DETAILS
// @route     PUT  /api/v1/auth/updatedetails
// @access   Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const updatedDetails = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, updatedDetails, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});




// admin functionality
// @desc     UpDATE LOGGED IN USER  Password
// @route    PUT  /api/v1/auth/updatepassword
// @access   Private


exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("password");

  const passwordCheck = await user.matchPassword(
    req.body.currentPassword,
    user.password
  );

  if (!passwordCheck) {
    return next(new ErrorResponse("credentials are incorrect, please", 400));
  }

  user.password = req.body.password;

  await user.save();

  sendTokenResponse(user, 200, res);
});



// admin functionality

