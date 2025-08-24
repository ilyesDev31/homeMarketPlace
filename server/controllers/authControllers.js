const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const catchAsync = require("../middleware/catchAsync");
const createSendToken = require("../middleware/createSendToken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/Email");

// get profile
exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("listing");
  res.header("Access-Control-Allow-Credentials", "true").status(200).json({
    status: "success",
    user,
  });
});
// register user
exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  createSendToken(user, 200, res);
});
// login user
exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user || !(await user.comparePassword(req.body.password, user.password)))
    return next(new ErrorResponse("email or password incorect", 401));
  createSendToken(user, 200, res);
});
// logout user
exports.logout = (req, res, next) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 10 }).json({
    status: "successfully logged out",
  });
};
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token || token === null)
    return next(new ErrorResponse("please login again 1"));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || user.checkToken(decoded.iat))
    return next(new ErrorResponse("please login again", 401));

  req.user = user;
  next();
});
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new ErrorResponse("you are restricted", 401));
    next();
  };
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorResponse("check your mailbox", 400));
  const token = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const url = `${req.protocol}://${req.get("host")}${
    req.originalUrl
  }/${token}`.replace("forgot", "reset");
  const em = new sendEmail(url, user).resetPassword();
  res.status(200).json({
    status: "successfully sent",
  });
});
exports.checkResetPasswordToken = catchAsync(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gte: Date.now() },
  });
  if (!user)
    return next(new ErrorResponse("link expired!azeaz please try again", 400));
  res.status(200).json({
    status: "success",
    access: true,
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gte: Date.now() },
  });
  if (!user)
    return next(new ErrorResponse("url expired please try again later", 400));
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  createSendToken(user, 200, res);
});
// change password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.comparePassword(currentPassword, user.password)))
    return next(new ErrorResponse("current password incorect", 400));
  user.password = newPassword;
  user.confirmPassword = confirmPassword;
  await user.save();
  createSendToken(user, 200, res);
});
