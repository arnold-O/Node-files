const Tour = require("../model/tour");

exports.createTour = async (req, res, next) => {
  try {
    const { name, rating, price } = req.body;

    const newTour = await Tour.create({
      name,
      rating,
      price,
    });

    res.status(200).json({
      newTour,
    });
  } catch (error) {
    res.status(200).json(error);
  }
};
exports.getAllTour = async (req, res, next) => {
  try {
    const allTour = await Tour.find();

    res.status(200).json({
      allTour,
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
