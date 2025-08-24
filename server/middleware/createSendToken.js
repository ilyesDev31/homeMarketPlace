module.exports = (user, statusCode, res) => {
  const token = user.signToken(user._id);
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };
  res.cookie("jwt", token, options).status(statusCode).json({
    status: "succes",
    user,
  });
};
