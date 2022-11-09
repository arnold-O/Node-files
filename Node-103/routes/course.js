const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const appFeatures = require("../middleware/appFeatures");
const { protect, authorize } = require("../middleware/protected");
const Course = require("../models/Course");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  appFeatures(Course, {
    path: "bootcamp",
    select: "name description",
  }),
  getCourses
);

// router.post("/create", createBootcamp);

router.get("/:id", getCourse);
router.post("/", protect, authorize("publisher", "admin"), addCourse);
router.patch("/:id", protect, authorize("publisher", "admin"), updateCourse);
router.delete("/:id", protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
