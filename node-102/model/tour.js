const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour mush have a name"],
    trim: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour mush have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour mush have a group Size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour mush have a difficulty"],
  },
  ratingsAvg: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour mush have a price"],
  },
  priceDiscount: Number,

  summary: {
    type: String,
    trim: true,
    required: [true, "Tour must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],

  startLocation:{
    type:{
        type:String,
        default:'Point',
        enum: ['Point']
    },
    coordinates: [Number],
    address:String,
    description:String
  },
  location:[
    {
      type:{
        type:String,
        default:'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address:String,
      description:String,
      day:Number
    }
  ]
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
