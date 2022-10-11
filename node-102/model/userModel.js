const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a passord"],
    minlength: 6,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please comfim your password"],
    validate: {
      // this works onl SAVE & Create
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
  photo: String,
  passwordChangedAt: Date
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctpassword = async function(candidatePassword, userPassword){
    return  await bcrypt.compare(candidatePassword, userPassword)
}
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){

  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000, 10)

    return JWTTimestamp < changedTimestamp

  }
  return false
}

const User = mongoose.model("User", userSchema);

module.exports = User;
