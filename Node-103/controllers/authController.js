const User = require("../models/User");
const asyncHandler = require("../utils/asyncWrapper");
const ErrorResponse = require("../utils/errorResponse");

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

  const token = user.getSignedJwtToken();

  res.status(201).json({
    status: "sucess",
    user,
    token,
  });
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

  res.status(statusCode).cookie("token", token, options).json({
    status: "success",
    token,
  });
};

// @desc    Get current logged in User
// @route   /api/v1/auth/me
// @access   Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: user,
  });
});




// @desc    Get current logged in User
// @route   /api/v1/auth/forgotpassword
// @access   Private

exports.forgotPassword = asyncHandler( async (req, res, next)=>{


  const user = await User.findOne({email:req.body.email})

  if(!user){
    return next(new ErrorResponse(`There is no user with this Email ${req.body.email}`, 404))
  }

  // get reset token 
  const resetToken = user.getResetPasswordToken()

  await user.save({validateBeforeSave:false})

  const resetUrl = `${req.procol}://`

  // const message = 


  res.status(200).json({
    status:"success",
    data: user

  })
})