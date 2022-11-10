const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "please add  title"],
    maxlength:100
  },
  description: {
    type: String,

    required: [true, "please add a description"],
  },
  rating: {
    type: Number,
    required: [true, "please add a Rating between 1 and 5"],
    min:1,
    max:5
  },
  
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});


module.exports = mongoose.model("Review", ReviewSchema);

