const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../utils/asynceWrapper");
const ErrorResponse = require("../utils/errorResponse");

exports.createBootcamp = async (req, res, next) => {
try{ 
  const newBootcamp = await Bootcamp.create(req.body);

  res.status(200).json({
    status: "success",
    newBootcamp,
  });

} catch(err){
  next(err)

}
   
 
};

exports.getAllBootcamp = asyncHandler(  async (req, res, next) => {
      let queryQuery = { ...req.query}
  let query;

  let queryString = JSON.stringify(queryQuery)

  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match =>`$${match}`)

  query = Bootcamp.find(JSON.parse(queryString));

    const allCamps = await query

    res.status(200).json({
      nbHits: allCamps.length,
      status: "success",
      allCamps,
    });

  })

exports.getBootcamp = asyncHandler ( async (req, res, next) => {
  
    const allCamps = await Bootcamp.findById(req.params.id);
    // if (!allCamps) {
    //   return next(
    //     new ErrorResponse(`Bootcamp not found with Id of ${req.params.id}`, 500)
    //   );
    // }

    res.status(200).json({
      nbHits: allCamps.length,
      status: "success",
      allCamps,
    });
  
  })

