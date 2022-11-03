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
  let query;
      let reqQuery = { ...req.query}

      // field excluded
      const removeFields = ['select', 'sort', 'page', 'limit']

      // functionality to remove fields from query
      removeFields.forEach(item => delete reqQuery[item])

      
      // stringify query for replace method 
  let queryString = JSON.stringify(reqQuery)

  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match =>`$${match}`)

  // query search
  query = Bootcamp.find(JSON.parse(queryString)).populate({
    path:'courses',
    select:'title description'
  });

  // Select functionality
  if(req.query.select){
    const fields = req.query.select.split(',').join(' ')
   query = query.select(fields)
  }
  // sorting
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ')
   query = query.sort(sortBy)
  }else{
    query = query.sort('-createdAt')
  }
  // pagination

  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 10

  const startIndex = (page - 1)* limit
  const endIndex = page * limit
  
  const total = await Bootcamp.countDocuments()
  
  
  
  query = query.skip(startIndex).limit(limit)

    const allCamps = await query

    const paginate = {}

    if(endIndex < total){
      paginate.next = {
        page:page +1,
        limit

      }
    }
    if(startIndex > 0){
      paginate.prev = {
        page: page - 1,
        limit
      }
    }

    res.status(200).json({
      nbHits: allCamps.length,
      status: "success",
      paginate ,
      allCamps

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

  exports.deleteBootcamp = asyncHandler (async(req, res, next)=>{

    const bootCamp = await Bootcamp.findById(req.params.id)

    if(!bootCamp){
      return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404))
    }
    bootCamp.remove();

    res.status(200).json({
      status:"success",
      message:"deleted successfully"
    })
  })



  // @desc   Upload photo for bootcamp


  exports.bootcampPhoto =  asyncHandler(async (req, res, next)=>{
    const bootCamp = await Bootcamp.findById(req.params.id)

    if(!bootCamp){
      return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404))
    }

    if(!req.files){
      return next(new ErrorResponse('Please upload a file', 400))
    }

    const file = req.files.file
    // test file to be photo

    if(!file.mimetype.startsWith('image')){
      return next(new ErrorResponse('Please upload an image file', 400))

    }


    
  })

