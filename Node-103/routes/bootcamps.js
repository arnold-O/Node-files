const express = require("express");
const {
  createBootcamp,
  getAllBootcamp,
  getBootcamp,
  deleteBootcamp,
  bootcampPhoto,
} = require("../controllers/bootcampController");
const courseRouter = require('./course')

const router = express.Router();


// re-route to  other resource
router.use('/:bootcampId/courses', courseRouter)

router.get("/getall", getAllBootcamp);

router.post("/create", createBootcamp);

// id functionality
router.get("/:id", getBootcamp);
router.delete("/:id", deleteBootcamp);
router.put("/:id/photo", bootcampPhoto);


module.exports = router;
