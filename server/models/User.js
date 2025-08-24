const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a user name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please add an email address"],
      unique: [true, "please choose another email address"],
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "please choose a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "please add a password to your profile"],
      minlength: [6, "your password is to short"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "please confirm you password"],
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "password and confirm password are not similar",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "user role must be user or admin",
      },
      default: "user",
    },
    photo: [String],
    passwordChangedAt: Date,
    passwordResetExpires: Date,
    passwordResetToken: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// setting virtual fields
userSchema.virtual("listing", {
  ref: "Listing",
  localField: "_id",
  foreignField: "userRef",
});
// crypting password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});
// setting password changed at
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() + 1000;
  next();
});
// sign token
userSchema.methods.signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
//   confirm password
userSchema.methods.comparePassword = async (candidate, password) => {
  return await bcrypt.compare(candidate, password);
};
// check if token sent before or after password modified
userSchema.methods.checkToken = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    this.passwordChangedAt > jwtTimeStamp * 1000;
  }
  return false;
};
// set reset password token
userSchema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
