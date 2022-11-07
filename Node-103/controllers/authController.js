const User = require("../models/User");
const asyncHandler = require("../utils/asyncWrapper");







exports.register = asyncHandler( async(req, res, next)=>{
    

const {name, email, password, role} = req.body

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


