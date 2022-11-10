const { getRevieew } = require("../controllers/reviewController");


const router = express.Router({ mergeParams: true });

router.get(
  "/",
  appFeatures(Course, {
    path: "bootcamp",
    select: "name description",
  }),
  getRevieew
);

// router.post("/create", createBootcamp);

router.get("/:id", getCourse);
router.post("/", protect, authorize("publisher", "admin"), addCourse);
router.patch("/:id", protect, authorize("publisher", "admin"), updateCourse);
router.delete("/:id", protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
