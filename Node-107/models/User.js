const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});


userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
 
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

module.exports = mongoose.model("User", userSchema);
