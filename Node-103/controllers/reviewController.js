const Review = require("../models/Review");
const asyncHandler = require("../utils/asyncWrapper");
const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

// @desc     Create  Review
// @route   Post /api/v1/bootcamps/:bootcampId/review
// @access   Private/User/Admin
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the ID ${req.params.bootcampId}`, 404)
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: review,
  });
});

// @desc     Get  Reviews
// @route   Get /api/v1/bootcamps/:bootcampId/review
// @access   Public

exports.getAllReview = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const review = await Review.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: "success",
      count: review.length,
      review,
    });
  } else {
    res.status(200).json(res.advanceResult);
  }
});

// @desc     Get  Review
// @route   Get /api/v1/review/:id
// @access   Public

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return next(
      new ErrorResponse(`no review found with the Id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    review,
  });
});

// @desc     Update  Review
// @route   PUT /api/v1/review/:id
// @access   Private/Admin

exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorResponse(`no review with id  ${req.params.id}`, 404));
  }
  // check who review belongs to
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`You are not authorize to update a review`, 401)
    );
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    review,
  });
});

// @desc     Delete  User
// @route   Delete /api/v1/review/:id
// @access   Private/Admin
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById4(req.params.id);
  if (!review) {
    return next(new ErrorResponse(`no review with id  ${req.params.id}`, 404));
  }
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`You are not authorize to Delete this review`, 401)
    );
  }

  await review.remove();

  res.status(200).json({
    status: "success",
    msg: "review deleted successfully",
  });
});
