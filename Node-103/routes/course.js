const express = require("express");
const { getCourses, getCourse } = require("../controllers/courseController");

const router = express.Router({ mergeParams: true });

router.get("/", getCourses);

// router.post("/create", createBootcamp);

router.get("/:id", getCourse);

module.exports = router;
