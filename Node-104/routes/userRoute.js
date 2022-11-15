


const express = require('express')
const { model } = require('mongoose')
const { createUser } = require('../controllers/userController')


const router = express.Router()



router.post('/', createUser)


module.exports = router