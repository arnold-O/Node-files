const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../utils/asynceWrapper");
const ErrorResponse = require("../utils/errorResponse");



exports.getCourses = asyncHandler( async(req, res, next)=>{
    let query;



    if(req.params.bootcampId){
        query = Course.find({bootcamp:req.parama.bootcampId})
    }

    res.status(200).json({
        status: "success",
        
      });
})