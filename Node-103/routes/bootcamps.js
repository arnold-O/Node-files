const express = require("express");
const {
  createBootcamp,
  getAllBootcamp,
  getBootcamp,
  deleteBootcamp,
  bootcampPhoto,
  updateBootcamp,
} = require("../controllers/bootcampController");
const courseRouter = require('./course')
const Bootcamp = require('../models/Bootcamp');
const appFeatures = require("../middleware/appFeatures");
const { protect, authorize } = require("../middleware/protected");

const router = express.Router();


// re-route to  other resource
router.use('/:bootcampId/courses', courseRouter)

router.get("/getall", appFeatures(Bootcamp, "courses"), getAllBootcamp);

router.post("/create", protect, authorize('publisher', 'admin'), createBootcamp);

// id functionality
router.get("/:id", getBootcamp);
router.patch("/:id", protect, authorize('publisher', 'admin'), updateBootcamp);
router.delete("/:id", protect,authorize('publisher', 'admin'),  deleteBootcamp);
router.put("/:id/photo",protect, authorize('publisher', 'admin'), bootcampPhoto);


module.exports = router;
