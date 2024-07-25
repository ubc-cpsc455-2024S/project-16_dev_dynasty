const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const housesRouter = require("./routes/houses");
const baysRouter = require("./routes/bays");
const customersRouter = require("./routes/customers");
const defectsRouter = require("./routes/defects");
const checklistsRouter = require("./routes/checklists");

const app = express();

// Middleware setup
app.set("trust proxy", 1);
app.use(
  cors({
    // origin: "http://localhost:5173",
    // credentials: true,
  }),
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
app.use("/defects", defectsRouter);
app.use("/checklists", checklistsRouter);

module.exports = app;
