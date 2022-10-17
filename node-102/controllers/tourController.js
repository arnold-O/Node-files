const Tour = require("../model/tour");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory')


exports.getTour = factory.getOne(Tour, {path:'reviews'})
exports.updateTour = factory.updateOne(Tour)
exports.deleteTour = factory.deleteOne(Tour)
exports.createTour = factory.createOne(Tour)
exports.getAllTour = factory.getAll(Tour)


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



