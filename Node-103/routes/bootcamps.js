const express = require("express");
const { getAll } = require("../controllers/bootcampController");

const router = express.Router();

router.get("/getall", getAll);

module.exports = router;
