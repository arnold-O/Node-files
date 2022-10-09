const express = require('express')
const { signUp } = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signUp)




module.exports = router