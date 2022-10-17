const express = require("express");
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("../controllers/authController");

const {
  updateMe,
  deleteMe,
  getAllUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);
router.patch("/updatemypassword", protect, updatePassword);

router.patch("/updateme", protect, updateMe);
router.delete("/deleteme", protect, restrictTo('user'), deleteMe);

router.delete("/:id", protect, restrictTo("admin"), deleteUser);

router.get("/getalluser", getAllUser);

// update user by Admin
router.patch("/:id", updateUser);

// review implimentation

module.exports = router;
