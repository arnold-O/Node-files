const mongoose = require('mongoose')


const reviewSchema = mongoose.Schema({
    review:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
     rating:{
        type:Number,
        required:true,
        default:4.5
     },
      createdAt:{
        type:Date,
        default: new Date.now() 
      },

      tour:{
        type:mongoose.Schema.ObjectId,
        ref:"Tour"
      },
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
      }
     
})


const Review = mongoose.Model('Review', reviewSchema)

module.exports = Review