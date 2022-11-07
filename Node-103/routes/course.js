const express = require("express");
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require("../controllers/courseController");
const appFeatures = require("../middleware/appFeatures");
const Course = require("../models/Course");

const router = express.Router({ mergeParams: true });

router.get("/", appFeatures(Course, {
    path: "bootcamp",
    select: "name description",
  }), getCourses);

// router.post("/create", createBootcamp);

router.get("/:id", getCourse);
router.post("/", addCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
