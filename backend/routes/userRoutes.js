const router = require("express").Router();

const { protect } = require("../controllers/authControllers");
const {
  updateProfile,
  getSingleUser,
} = require("../controllers/userControllers");

router.put("/update", protect, updateProfile);
router.get("/:id", getSingleUser);
module.exports = router;
