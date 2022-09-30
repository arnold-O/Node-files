

const mongoose = require('mongoose')


const tourSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A tour mush have a name']
    },
     rating:{
        type:Number,
      default:4.5
    },
     price:{
        type:Number,
        required:[true, 'A tour mush have a price']
    } 
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour