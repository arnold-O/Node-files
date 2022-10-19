const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  createReview,
  getAllReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require("../controllers/reviewControllers");
6;

const router = express.Router({ mergeParams: true });

router.use(protect);

router.post("/", restrictTo("user"), setTourUserIds, createReview);
router.get("/", getAllReview);
router.get("/:id", getReview);
router.delete("/:id", restrictTo('user', 'admin'), deleteReview);
router.patch("/:id", restrictTo('user', 'admin'), updateReview);

module.exports = router;
