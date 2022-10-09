const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken')

exports.signUp = catchAsync(async (req, res, next) => {

    const {name, email, password, passwordConfirm} = req.body
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm
  });

const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN
})
  res.status(201).json({
    status: "success",
    token,
    user: newUser,
  });
});




exports.login = catchAsync( async(req, res, next)=>{


}

)