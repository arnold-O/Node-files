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

// exports.deleteTour = catchAsync(async (req, res, next) => {
//     const { id } = req.params;
  
//     const tour = await Tour.findByIdAndDelete(id);
  
//     if (!tour) {
//       return next(new AppError("No tour found with that id ", 404));
//     }
  
//     res.status(200).json({
//       msg: "value successfully deleted",
//     });
//   });