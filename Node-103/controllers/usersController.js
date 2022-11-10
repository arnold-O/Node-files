const User = require("../models/User");
const asyncHandler = require("../utils/asyncWrapper");
const sendEmail = require("../utils/email");
const ErrorResponse = require("../utils/errorResponse");
const crypto = require("crypto");

// @desc     Get all User
// @route   Get /api/v1/auth/getalluser
// @access   Private/Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResult);
});

// @desc     Get  User
// @route    Get /api/v1/auth/singleuser/:id
// @access   Private/Admin

exports.getSingleUsers = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    user,
  });
});

// @desc     Create  User
// @route   Post /api/v1/auth/user
// @access   Private/Admin

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    user,
  });
});

// @desc     Update  User
// @route   Put /api/v1/auth/user/:id
// @access   Private/Admin

exports.UpdateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    user,
  });
});

// @desc     Delete  User
// @route   Delete /api/v1/auth/user/:id
// @access   Private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "User deleted Successffully",
  });
});
