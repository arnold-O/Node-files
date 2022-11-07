const User = require("../models/User");
const asyncHandler = require("../utils/asyncWrapper");






exports.register = asyncHandler( async(req, res, next)=>{

// const newUser = await User.create(req.body)

    res.status(201).json({
        status:"sucess",
        // newUser
    })
})


