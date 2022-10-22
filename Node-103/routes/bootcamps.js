const express = require("express");
const { createBootcamp, getAllBootcamp } = require("../controllers/bootcampController");

const router = express.Router();

router.get("/getall", getAllBootcamp);
router.post("/create", createBootcamp);

module.exports = router;
