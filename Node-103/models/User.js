const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:[true, 'please add a course title']
    },
    email: {
        type: String,
        required: [true, 'please enter email'],
        unique:true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please use a valid email adress",
        ],
      },
      role:{
        type:String,
        enum:['user', 'publiisher'],
        default:'user'
      },
    password:{
        type:String,
        required:[true, 'please add number of weeks'],
        minlength:6,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,


    createdAt:{
        type:Date,
        default:Date.now
    },
    
})         
      





module.exports= mongoose.model('User', UserSchema)


