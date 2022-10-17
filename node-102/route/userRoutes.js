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
  getUser,
  getMe,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);

router.use(protect);
// the above middleware is ran for user authentication

router.patch("/updatemypassword", updatePassword);
router.patch("/updateme", updateMe);
router.delete("/deleteme", deleteMe);

router.use(restrictTo("admin"));
// the above middleware is ran for Admin privileges  |authentication|
router.delete("/:id", deleteUser);

router.get("/getalluser", getAllUser);

router.get("/me", getMe, getUser);

router.get("/:id", getUser);

// update user by Admin
router.patch("/:id", updateUser);

// review implimentation

module.exports = router;
