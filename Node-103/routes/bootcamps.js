const express = require("express");
const {
  createBootcamp,
  getAllBootcamp,
  getBootcamp,
} = require("../controllers/bootcampController");

const router = express.Router();

router.get("/getall", getAllBootcamp);

router.post("/create", createBootcamp);


router.get("/:id", getBootcamp);


module.exports = router;
