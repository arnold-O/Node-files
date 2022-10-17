const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  createReview,
  getAllReview,
  deleteReview,
} = require("../controllers/reviewControllers");6

const router = express.Router({ mergeParams: true });

router.post("/", protect, restrictTo("user"), createReview);

// router.post('/create',protect, restrictTo('user'), createReview)
router.get("/", getAllReview);
router.delete("/:id", deleteReview);

module.exports = router;
