const mongoose = require("mongoose");
const slugify = require('slugify');
const geocoder = require("../utils/geocode");

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "name can not be more than 60 character"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "please add a name"],

      maxlength: [300, "name can not be more than 60 character"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,

        "Please use a valid URL with Http or Https",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email adress",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        // required:true
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
        // required:true
      },
      formattedAdress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.png",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  // {
  //   toJSON: {
  //     virtuals: true,
  //   },
  //   toObject: {
  //     virtuals: true,
  //   },
  // }
);

// instance methods


BootcampSchema.pre('save', function(next){
  this.slug  =slugify(this.name,{lower:true})
  next()
})


// geocode

BootcampSchema.pre('save', async function(next){
  const location = await geocoder.geocode(this.address)
  this.location = {
    type:'Point',
    coordinates:[location[0].longitude, location[0].latitude],
    formattedAddress:location[0].formattedAddress,
    street: location[0].streetName,
    city: location[0].city,
    state: location[0].stateCode,
    zipcode: location[0].zipcode,
    country: location[0].countryCode
  }
  this.address = undefined
  next()
})


 

const Bootcamp = mongoose.model("Bootcamp", BootcampSchema);

module.exports = Bootcamp;
