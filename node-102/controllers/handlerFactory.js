const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.deleteOne = Model =>catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const doc = await Model.findByIdAndDelete(id);
  
    if (!doc) {
      return next(new AppError("No doc found with that id ", 404));
    }
  
    res.status(200).json({
      msg: "value successfully deleted",
    });
  });

  exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No doc found with that id ", 404));
    }
  
    res.status(200).json({
      data: doc
    });
  });
  