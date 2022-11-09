const mongoose = require("mongoose");
// const User = require("./userModel");

const tourSchema = new mongoose.Schema(
  {
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
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 1.0"],
      set: (val) => Math.round(val * 10) / 10,
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

    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    location: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// tourSchema.index({price:1})
tourSchema.index({ price: 1, ratingsAvg: -1 });

// tourSchema.pre('save', async function(next){

//   this.guidesPromises = this.guides.map(async id =>await User.findById(id) )
//   this.guides = await Promise.all(this.guidesPromises)
// next()
// })
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
