const express = require("express");
const {
  getReview,
  createReview,
  updateReview,
  deleteReview,
  getAllReview,
} = require("../controllers/reviewController");
const appFeatures = require("../middleware/appFeatures");
const { authorize, protect } = require("../middleware/protected");
const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

router.get("/", appFeatures(Review), getAllReview);

router.use(protect);
router.use(authorize("admin", "user"));
// router.post("/create", createBootcamp);

router.post("/", createReview);
router.get("/:id", getReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
