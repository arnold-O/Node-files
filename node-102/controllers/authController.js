const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    user: newUser,
  });
});




exports.login = catchAsync( async(req, res, next)=>{
    
}

)