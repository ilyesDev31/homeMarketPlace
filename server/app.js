const express = require("express");
const app = express();
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const sanitize = require("express-mongo-sanitize");
const limit = require("express-rate-limit");
const path = require("path");
const cookiesParser = require("cookie-parser");
const morgan = require("morgan");
// importing routes
const listingRoutes = require("./routes/listingRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
// dealing with data url and body
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
// serving static files
app.use(express.static(path.join(__dirname, "public")));
// securing app

app.use(hpp());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
      "https://home-market-place-nine.vercel.app",
    ],
    credentials: true,
  })
);
app.use(helmet());
const limiting = limit({
  max: 10,
  windowMs: 10 * 60 * 1000,
  message: "to many requests please try again later",
});
console.log(__dirname);
app.use("/api/v1/auth/login", limiting);
// initializing routes
app.use("/api/v1/listings", listingRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use(errorHandler);
module.exports = app;
