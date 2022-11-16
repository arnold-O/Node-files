const User = require("../model/User")
const catchAsyncError = require("../utils/catchAsyncError")


const register = catchAsyncError(  async(req, res, next)=>{

    const {name, email, password} = req.body
        const user = await User.create({
            name, email , password
        })

    res.status(201).json({
        status:"success",
        user
    })
})

const login = async(req, res, next)=>{

    res.send('register user')
}
const logout = async(req, res, next)=>{

    res.send('register user')
}


module.exports = {
    register, login, logout
}