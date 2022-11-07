const express = require("express");
const {
  createBootcamp,
  getAllBootcamp,
  getBootcamp,
  deleteBootcamp,
  bootcampPhoto,
} = require("../controllers/bootcampController");
const courseRouter = require('./course')
const Bootcamp = require('../models/Bootcamp');
const appFeatures = require("../middleware/appFeatures");
const { protect } = require("../middleware/protected");

const router = express.Router();


// re-route to  other resource
router.use('/:bootcampId/courses', courseRouter)

router.get("/getall", appFeatures(Bootcamp, "courses"), getAllBootcamp);

router.post("/create", protect, createBootcamp);

// id functionality
router.get("/:id", getBootcamp);
router.delete("/:id", protect, deleteBootcamp);
router.put("/:id/photo",protect, bootcampPhoto);


module.exports = router;
