const Tour = require("../model/tour");
const ApiFeatures = require("../utils/apiFeatures");

exports.createTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(200).json({
      newTour,
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.getAllTour = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sorting()
      .fieldlimiting()
      .paginate();
    const allTours = await features.query;

    res.status(200).json({
      allTours,
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const { id } = req.params;

    const singleTour = await Tour.findById(id);

    res.status(200).json({
      singleTour,
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      updateTour,
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      msg: "value successfully deleted",
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.gettourStats = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.getMonthlyPlan = async (req, res, next) => {
  try {
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
  } catch (error) {}
};
