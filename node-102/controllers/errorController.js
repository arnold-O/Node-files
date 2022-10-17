const AppError = require("../utils/appError");
const handleCastErrorDB = (err) => {
  console.log("hello");
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors).map((value) => value.message);
  return new AppError(message, 400);
};
const handleJsonwebtokenError = (err) => {
  const message = `Token is invalid ! try Agian!!!!`;
  return new AppError(message, 400);
};
const handleTokenExpiredError = (err) => {
  const message = `Token has expired! try Agian!!!!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
  3;
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJsonwebtokenError(err);
    if (err.name === "TokenExpiredError") err = handleTokenExpiredError(err);

    return sendErrorProd(err, res);
  }
};
