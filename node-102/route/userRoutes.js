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
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);
router.patch("/updatemypassword", protect, updatePassword);

router.patch("/updateme", protect, updateMe);
router.delete("/deleteme", protect, restrictTo("admin"), deleteMe);

router.delete("/:id", protect, restrictTo("admin"), deleteUser);

router.get("/getalluser", getAllUser);

// review implimentation

module.exports = router;
