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
    max:10
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



// avg RAting

ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },

    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      AverageRating: obj[0].getAverageRating
    });
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.bootcamp);
});


module.exports = mongoose.model("Review", ReviewSchema);

