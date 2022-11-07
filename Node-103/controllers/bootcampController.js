const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../utils/asyncWrapper");
const ErrorResponse = require("../utils/errorResponse");
const path = require('path')

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
 

    res.status(200).json(res.advanceResult);

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
    
    
    // check file size
    
    if(file.size >process.env.MAX_FILE_UPLOAD){
      return next( new ErrorResponse(`please upload file less than ${process.env.MAX_FILE_UPLOAD}`, 400))
    }
    
    // create custom name , for if same file has one dir name , it will overwrite 
    
    file.name = `photo_${bootCamp._id}${path.parse(file.name).ext}`
    
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err=>{
    if(err){

      console.log(err)
      return next(new ErrorResponse(`file upload error`, 404))
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, {photo : file.name})

    res.status(200).json({
      status:"success",
      data : file.name
    })

  })

  })

