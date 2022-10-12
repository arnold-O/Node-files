const express = require('express')
const { signUp, login, forgotPassword, resetPassword } = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)




module.exports = router