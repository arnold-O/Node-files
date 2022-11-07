const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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





UserSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
 
  next()

})
      

UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn:process.env.JWT_EXPIRE
  })
}





module.exports= mongoose.model('User', UserSchema)


