var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

var indexRouter = require("./routes/index");
var housesRouter = require("./routes/houses");
var baysRouter = require("./routes/bays");
var customersRouter = require("./routes/customers");

var app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    // origin: "http://localhost:5173",
    // credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/houses", housesRouter);
app.use("/bays", baysRouter);
app.use("/customers", customersRouter);

module.exports = app;
