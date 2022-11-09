const express = require("express");
const { register, login, getMe, forgotPassword, resetPassword } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/protected");

const router = express.Router();




router.post('/register', register)
router.post('/login', login)
router.get('/getme', protect, authorize('user'), getMe)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router