const express = require('express')
const { createTour, getAllTour, getTour } = require('../controllers/tourController')


const router = express.Router()



router.post('/create', createTour)
router.get('/getall', getAllTour)
router.get('/getone/:id', getTour)




module.exports = router