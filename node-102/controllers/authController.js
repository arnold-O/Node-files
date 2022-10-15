const { promisify } = require("util");
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  if (process.env.NODE_ENV === "production") {
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    });
  }

  if (process.env.NODE_ENV === "development") {
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),

      httpOnly: true,
      secure: true,
    });
  }

  const userData = {
    name: user.name,
    role: user.role,
    active: user.active,
    id: user._id,
    email: user.email,
  };

  res.status(statusCode).json({
    status: "success",
    token,
    userData,
  });
};
exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // when login in, u need to also check for active users

  // const deletedUser = await User.findOne({email, active:false})

  // if(deletedUser){
  //   return next(new AppError('please reactivate your account', 200))
  // }

  if (!email || !password) {
    return next(new AppError("please provide your Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("no user found", 400));
  }

  const passwordCheck = await user.correctpassword(password, user.password);

  if (!passwordCheck) {
    return next(new AppError("credentials are incorrect, please", 400));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log(token)

  if (!token) {
    return next(new AppError("you are not logged in , please login ", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The User belonging to this token do not  exist", 401)
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("Please login Again", 401));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you do not have permission", 403));
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("no user with that email address", 404));
  }

  const resetToken = await user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // sending the mail

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetpassword/${resetToken}`;

  const message = `forgot your password? submit a PATCh request with your new Password and passwordConfirm to ${resetUrl}, \n if you didnt make this request please ignore this request`;

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

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is Invalid or has Expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("password");

  const passwordCheck = await user.correctpassword(
    req.body.passwordCurrent,
    user.password
  );

  if (!passwordCheck) {
    return next(new AppError("credentials are incorrect, please", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});



