const router = require("express").Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  getProfile,
  logout,
  checkResetPasswordToken,
} = require("../controllers/authControllers");

router.get("/me", protect, getProfile);
router.post("/logout", logout);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.get("/checkPasswordToken/:token", checkResetPasswordToken);
router.post("/resetPassword/:token", resetPassword);
router.post("/password", protect, updatePassword);

module.exports = router;
