const Bootcamp = require("../models/Bootcamp");
const Course = require("../models/Course");
const asyncHandler = require("../utils/asyncWrapper");
const ErrorResponse = require("../utils/errorResponse");

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      status:"success",
      count:courses.lebght,
      data:courses
    })
  } else {
    res.status(200).json(res.advanceResult)
  }


});

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(new ErrorResponse("no course found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    course,
  });
});

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with that id ${req.params.bootcampId}`,
        404
      )
    );
  }
  if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin'){
      
    return next(new ErrorResponse(`You are not authorize to add a course`, 401))
  }
  const newCourse = await Course.create(req.body);

  res.status(200).json({
    status: "success",
    newCourse,
  });
});
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`No Course with that id ${req.params.id}`, 404)
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    course,
  });
});

exports.deleteCourse = asyncHandler( async(req, res, next)=>{



  const course = await Course.findById(req.params.id)


  await course.remove()


  res.status(200).json({
    status:"success",
    data:{}
  })
})
