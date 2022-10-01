const express = require('express')
const { createTour, getAllTour, getTour, updateTour, deleteTour } = require('../controllers/tourController')


const router = express.Router()




router.post('/create', createTour)
router.get('/getall', getAllTour)
router.get('/getone/:id', getTour)
router.patch('/update/:id', updateTour)
router.delete('/delete/:id', deleteTour)




module.exports = router