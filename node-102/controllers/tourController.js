const Tour = require("../model/tour");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory')

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  if (!newTour) {
    return next(new AppError("No tour found with that id ", 404));
  }

  res.status(200).json({
    newTour,
  });
});

exports.getAllTour = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Tour.find(), req.query)
    .filter()
    .sorting()
    .fieldlimiting()
    .paginate();
  const allTours = await features.query;

  res.status(200).json({
    allTours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');
  // Tour.findOne({ _id: req.params.id })

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});
exports.updateTour = factory.updateOne(Tour)




exports.deleteTour = factory.deleteOne(Tour)



exports.gettourStats = catchAsync(async (req, res, next) => {
  const stat = await Tour.aggregate([
    {
      $group: {
        _id: "$difficulty",
        numTours: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },

    },
  ]);
  res.status(200).json({
    stat,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
  ]);
  res.status(200).json({
    plan,
  });
});
