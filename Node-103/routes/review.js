const express = require('express')
const { getRevieew, createReview, updateReview, deleteReview, getAllReview } = require("../controllers/reviewController");
const appFeatures = require('../middleware/appFeatures');
const { authorize, protect } = require('../middleware/protected');
const Review = require('../models/Review');


const router = express.Router({ mergeParams: true });
router.use(protect);
router.use(authorize('admin', 'user'))

router.get(
  "/",
  appFeatures(Review),
  getAllReview
);

// router.post("/create", createBootcamp);

router.get("/:id", getRevieew);
router.post("/",  createReview);
router.patch("/:id",  updateReview);
router.delete("/:id",  deleteReview);

module.exports = router;
