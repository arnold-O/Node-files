const { promisify } = require('util')
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

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

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});


exports.protect = catchAsync( async(req, res, next)=>{
    let token ;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]

  }
  // console.log(token)

  if(!token){
    return next(new AppError('you are not logged in , please login ', 401))
  }
 const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

 
 const currentUser = User.findById(decoded.id)

 if(!currentUser){
  return next(new AppError('The User belonging to this token do not  exist',401))
 }


 if(currentUser.changedPasswordAfter(decoded.iat)){
  return next(new AppError('Please login Again', 401))
 }


 req.user = currentUser


  next()
}

)
