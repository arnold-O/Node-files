const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/protected");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getme", protect,  getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);


module.exports = router;
