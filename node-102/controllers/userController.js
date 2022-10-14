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


exports.updateMe = catchAsync(async(req, res, next)=>{
    const {password, passwordConfirm} = req.body

   if(password || passwordConfirm){
    return next(new AppError('this route is not for password Update, please use /updatemypassword',400))
   }

   const filteredBody = filterObj(req.body, 'name', 'email')
   const updatedUser  = await User.findByIdAndUpdate(req.user.id ,filteredBody , {
    new:true,
    runValidators:true
   })




res.status(200).json({
    status:"success",
    updatedUser
})
})