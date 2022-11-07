const asyncHandler = require("../utils/asyncWrapper");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // else if(req.cookies.token){
  //     req.cookies.token

  // }

  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
});
