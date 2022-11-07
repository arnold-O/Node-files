const User = require("../models/User");
const asyncHandler = require("../utils/asyncWrapper");
const ErrorResponse = require("../utils/errorResponse");




// @desc     Register User
// @route   /api/v1/auth/register
// @access   Public

exports.register = asyncHandler( async(req, res, next)=>{
    

const {name, email, password, role} = req.body
if(!email || !password || !name){
    return next(new ErrorResponse('please enter email and password'))
}


 const user = await User.create({
    name, 
    email, 
    password,
    role
})

const token = user.getSignedJwtToken()

    res.status(201).json({
        status:"sucess",
        user,
        token
    })
})



// @desc     Login User
// @route   /api/v1/auth/login
// @access   Public

exports.login = asyncHandler( async(req, res, next)=>{
    
const { email,  password} = req.body


if(!email || !password){
    return next(new ErrorResponse('please enter email and password'))
}

// check user i  DB
 const user = await User.findOne({email}).select('+password')

 if(!user){
    return next(new ErrorResponse('No User  found', 401))
 }

// compare password

const matchPassword = await user.matchPassword(password)

if(!matchPassword){
    return next(new ErrorResponse('Invalid Credentials', 401))
}


const token = user.getSignedJwtToken()

    res.status(201).json({
        status:"sucess",
        user,
        token
    })
})


