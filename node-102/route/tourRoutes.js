const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRoutes = require("./reviewRoute");
const {
  createTour,
  getAllTour,
  getTour,
  updateTour,
  deleteTour,
  gettourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");

const router = express.Router();

router.use("/:tourId/review", reviewRoutes);

router.get("/getstats", gettourStats);
router.get(
  "/monthly-plan/:year",
  protect,
  restrictTo("admin", "lead-guide", "guide"),
  getMonthlyPlan
);

router.post("/create", protect, restrictTo("admin", "lead-guide"), createTour);
router.get("/getall", getAllTour);
router.get("/getone/:id", getTour);
router.patch(
  "/update/:id",
  protect,
  restrictTo("admin", "lead-guide"),
  updateTour
);
router.delete("/delete/:id", protect, restrictTo("admin"), deleteTour);

// router.post('/:tourId/review', protect, restrictTo('user'), createReview)

module.exports = router;
