const express = require('express')
const { signUp, login, forgotPassword, resetPassword, updatePassword, protect } = require('../controllers/authController')
const { updateMe, deleteMe, getAllUser } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)
router.patch('/updatemypassword', protect, updatePassword)

router.patch('/updateme', protect, updateMe)
router.delete('/deleteme', protect, deleteMe)


router.get('/getalluser', getAllUser)




module.exports = router