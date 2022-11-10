const express = require("express");
const {
  getUsers,
  getSingleUsers,
  createUser,
  UpdateUser,
  deleteUser,
} = require("../controllers/usersController");
const appFeatures = require("../middleware/appFeatures");
const { protect, authorize } = require("../middleware/protected");
const User = require("../models/User");

const router = express.Router({ mergeParams: true });
router.use(protect);
router.use(authorize("admin"));

router.get("/", appFeatures(User), getUsers);

router.post("/", createUser);
router.get("/:id", getSingleUsers);
router.put("/:id", UpdateUser);
router.delete("/:id", deleteUser);






module.exports = router;
