const Review = require("../model/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createReview = catchAsync(async (req, res, next) => {


  if(!req.body.tour) req.body.tour = req.params.tourId
  if(!req.body.user) req.body.user = req.user.id

  const { review, rating, user, tour } = req.body;
  if (!review || !rating) {
    return next(new AppError("please enter your review", 400));
  }
  const newReview = await Review.create({
    review,
    rating,
    user,
    tour
  });

  res.status(201).json({
    status: "success",
    newReview,
  });
});

exports.getAllReview = catchAsync(async (req, res, next) => {
  const allReviews = await Review.find();

  res.status(201).json({
    status: "success",
    allReviews,
  });
});



