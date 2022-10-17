const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  createReview,
  getAllReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require("../controllers/reviewControllers");6

const router = express.Router({ mergeParams: true });

router.post("/", protect, restrictTo("user"), setTourUserIds, createReview);

// router.post('/create',protect, restrictTo('user'), createReview)
router.get("/", getAllReview);
router.get("/:id", getReview);
router.delete("/:id", deleteReview);
router.patch("/:id", updateReview);
3
module.exports = router;
