const Review = require("../models/Review");
const asyncHandler = require("../utils/asyncWrapper");






// @desc     Create  Review
// @route   Post /api/v1/review
// @access   Private/User/Admin
exports.createReview = asyncHandler(async (req, res, next)=>{

    const review =  await Review.create(req.body)
})


// @desc     Get  Reviews
// @route   Get /api/v1/bootcamps/:bootcampId/review
// @access   Public
exports.getAllReview = asyncHandler(async (req, res, next)=>{

    const review =  await Review.find({bootcamp : req.params.bootcampId})

    res.status(200).json(res.advanceResult)
})



// @desc     Get  Review
// @route   Get /api/v1/review/:id
// @access   Private/Admin
exports.getRevieew = asyncHandler(async (req, res, next)=>{

    const review =  await Review.create(req.body)
})


// @desc     Update  Review
// @route   Delete /api/v1/review:id
// @access   Private/Admin

exports.updateReview = asyncHandler(async (req, res, next)=>{

    const review =  await Review.create(req.body)
})

// @desc     Delete  User
// @route   Delete /api/v1/review/:id
// @access   Private/Admin
exports.deleteReview = asyncHandler(async (req, res, next)=>{

    const review =  await Review.create(req.body)
})