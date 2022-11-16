const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide a valid email"],
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
    minLength: 6,
    maxLength: 12,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.correctPassword = async function (userpassword) {
  const isRight = await bcrypt.compare(userpassword, this.password);

  return isRight;
};

module.exports = mongoose.model("User", userSchema);
