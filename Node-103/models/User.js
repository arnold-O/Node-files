const mongoose = require('mongoose')


const CourseSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:[true, 'please add a course title']
    },
    email:{
        type:String,
     
        required:[true, 'please add a description']
    },
    password:{
        type:String,
        required:[true, 'please add number of weeks']
    },


    
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})         
      





module.exports= mongoose.model('User', CourseSchema)


