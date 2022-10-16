const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be Empty"],
    trim: true,
    lowercase: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "tour",
//     select: "name",
//   }).populate({
//     path: "user",,
//     select: "name photo",
//   });
//   next();
// });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
