const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const { createTour, getAllTour, getTour, updateTour, deleteTour, gettourStats, getMonthlyPlan } = require('../controllers/tourController')


const router = express.Router()


router.get('/getstats', gettourStats)
router.get('/monthly-plan/:year', getMonthlyPlan)

router.post('/create', createTour)
router.get('/getall', getAllTour)
router.get('/getone/:id', getTour)
router.patch('/update/:id', updateTour)
router.delete('/delete/:id',protect, restrictTo('admin'), deleteTour)




module.exports = router