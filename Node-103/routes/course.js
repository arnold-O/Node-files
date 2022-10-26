const express = require("express");
const { getCourses } = require("../controllers/courseController");


const router = express.Router({mergeParams:true});


router.get("/", getCourses);

// router.post("/create", createBootcamp);

// router.get("/:id", getBootcamp);


module.exports = router;
