const Bootcamp = require("../models/Bootcamp");
const Course = require("../models/Course");
const asyncHandler = require("../utils/asynceWrapper");
const ErrorResponse = require("../utils/errorResponse");

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    status: "success",
    courses,
  });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
 

  const course= await Course.findById( req.params.id ).populate({
    path:'bootcamp',
    select:'name description'
  })

  if(!course){
    return next(new ErrorResponse('no course found with that ID', 404))
  }

  res.status(200).json({
    status: "success",
    course,
  });
});
