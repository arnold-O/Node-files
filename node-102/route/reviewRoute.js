

const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const { createReview, getAllReview } = require('../controllers/reviewControllers')

const router = express.Router()

router.post('/create',protect, restrictTo('user'), createReview)
router.get('/allreview', getAllReview)





module.exports = router