const asyncHandler = require("../utils/asynceWrapper");






exports.register = asyncHandler( async(req, res, next)=>{

const newUser = await User.create(req.body)

    res.status(201).json({
        status:"sucess",
        newUser
    })
})