const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  res.status(error.statusCode || 400).json({
    status: "failed",
    message: error.message || "something went wrong",
  });
};

module.exports = errorHandler;
