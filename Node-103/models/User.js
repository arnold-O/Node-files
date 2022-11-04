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
    tuition:{
        type:Number,
        required:[true, 'please add a tuition cost']
    },
    minimumSkill:{
        type:String,
        required:[true, 'please add a minimum skill'],
        enum:['beginner','intermediate', 'advanced']
    },
    scholarshipAvailable:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})         
      





module.exports= mongoose.model('User', CourseSchema)


