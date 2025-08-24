const User = require("../models/User");
const catchAsync = require("../middleware/catchAsync");
const ErrorResponse = require("../utils/ErrorResponse");

const fieldsToUpdate = (body, ...fields) => {
  let obj = {};
  Object.keys(body).forEach((ele) => {
    if (fields.includes(ele)) {
      obj[ele] = body[ele];
    }
  });
  return obj;
};
exports.updateProfile = catchAsync(async (req, res, next) => {
  if (!req.body.email && !req.body.name)
    return next(
      new ErrorResponse("please enter data that you want to update", 400)
    );
  const data = fieldsToUpdate(req.body, "email", "name");
  const updatedUser = await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "successfully updated",
  });
});

// get single user with id
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorResponse("no user with this id found", 404));
  res.status(200).json({
    status: "success",
    user,
  });
});
