const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const housesRouter = require('./routes/houses');
const baysRouter = require('./routes/bays');
const customersRouter = require('./routes/customers');
const defectsRouter = require('./routes/defects');
const authRouter = require('./routes/users');
const app = express();

require("dotenv").config();
const frontend_url = process.env.FRONTEND_URL;

// Middleware setup
app.set('trust proxy', 1);
app.use(
  cors({
    origin: frontend_url,
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/houses', housesRouter);
app.use('/bays', baysRouter);
app.use('/customers', customersRouter);
app.use('/defects', defectsRouter);
app.use('/users', authRouter);



module.exports = app;
