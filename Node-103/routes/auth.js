const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/protected");

const router = express.Router();




router.post('/register', register)
router.post('/login', login)
router.get('/getme', protect, getMe)



module.exports = router