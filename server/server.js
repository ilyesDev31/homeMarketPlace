require("dotenv").config({
  path: "./.env",
});
const colors = require("colors");
const mongoose = require("mongoose");
const app = require("./app");

(async () => {
  try {
    const dbStr = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
    const db = await mongoose.connect(dbStr);
    console.log("db connected".green);
  } catch (error) {
    console.log(error.message);
  }
})();

app.listen(process.env.PORT, console.log(`port => ${process.env.PORT}`));
