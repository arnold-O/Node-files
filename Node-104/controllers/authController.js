const User = require("../model/User")
const AsyncError = require("../utils/catchAsyncError");


exports.register = AsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
  
    const userAlreadyExist = await User.findOne({ email });
  
    if (userAlreadyExist) {
      return next(new AppError("Email already exist", 400));
    }
    const firstAcount = (await User.countDocuments({})) === 0;
    const role = firstAcount ? "admin" : "user";
    const newUser = await User.create({
      name,
      email,
      password,
      role
    });
  
    res.status(200).json({
      status: "success",
      newUser,
    });
  });

