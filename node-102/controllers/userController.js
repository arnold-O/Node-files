const User = require("../model/userModel");
const { findById } = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");




const filterObj = (obj , ...allowedFields)=>{
    const newObj = {}


    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el)) newObj[el]= obj[el]
    })
    return newObj 
}


exports.getAllUser = catchAsync(async (req, res, next)=>{

    const allUsers = await User.find()


    res.status(200).json({
        status:"success",
        allUsers
    })
})

exports.updateMe = catchAsync(async(req, res, next)=>{
    const {password, passwordConfirm,name, email} = req.body

   if(password || passwordConfirm){
    return next(new AppError('this route is not for password Update, please use /updatemypassword',400))
   }

//    const filteredBody = filterObj(req.body, 'name', 'email')
   const updatedUser  = await User.findByIdAndUpdate(req.user.id ,{name, email} , {
    new:true,
    runValidators:true
   })

res.status(200).json({
    status:"success",
    updatedUser



})
})


exports.deleteMe = catchAsync(async(req, res, next)=>{
    await User.findByIdAndUpdate(req.user.id, {active:false})
    res.status(204).json({
        status:"success",
        data:null
    })
})