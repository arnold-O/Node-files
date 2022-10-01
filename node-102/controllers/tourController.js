const Tour = require("../model/tour");

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
    const queryObj = { ...req.query };
    const excludeFiles = ["page", "limit", "fields", "sort"];
    excludeFiles.forEach((item) => delete queryObj[item]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryString));

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const allTours = await query;

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

