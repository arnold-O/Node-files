const express = require("express");
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require("../controllers/courseController");

const router = express.Router({ mergeParams: true });

router.get("/", getCourses);

// router.post("/create", createBootcamp);

router.get("/:id", getCourse);
router.post("/", addCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
