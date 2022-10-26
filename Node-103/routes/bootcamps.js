const express = require("express");
const {
  createBootcamp,
  getAllBootcamp,
  getBootcamp,
} = require("../controllers/bootcampController");
const courseRouter = require('./course')

const router = express.Router();


// re-route to  other resource
router.use('/:bootcampId/courses', courseRouter)

router.get("/getall", getAllBootcamp);

router.post("/create", createBootcamp);


router.get("/:id", getBootcamp);


module.exports = router;
