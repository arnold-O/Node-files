const Tour = require("../model/tour");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);
    if (!newTour) {
      return next(new AppError("No tour found with that id ", 404));
    }

    res.status(200).json({
      newTour,
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

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
  const { id } = req.params;

  const singleTour = await Tour.findById(id);
  if (!singleTour) {
    return next(new AppError("No tour found with that id ", 404));
  }

  res.status(200).json({
    singleTour,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateTour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateTour) {
    return next(new AppError("No tour found with that id ", 404));
  }

  res.status(200).json({
    updateTour,
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const tour = await Tour.findByIdAndDelete(id);

  if (!tour) {
    return next(new AppError("No tour found with that id ", 404));
  }

  res.status(200).json({
    msg: "value successfully deleted",
  });
});

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
