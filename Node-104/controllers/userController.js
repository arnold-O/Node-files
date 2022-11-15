const User = require("../model/User");
const AsyncError = require("../utils/AsyncError");






exports.createUser = AsyncError( async(req, res, next)=>{

const newUser = await User.create(req.body)

    resstatus(200).json({
        status:"success"
    })
})