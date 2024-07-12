require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// Import route handlers
const indexRouter = require('./routes/index');
const housesRouter = require('./routes/houses');
const baysRouter = require('./routes/bays');
const customersRouter = require('./routes/customers');
const defectsRouter = require('./routes/defects');

const app = express();

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
async function main() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}
main().catch(err => console.log(err));

// Middleware setup
app.set('trust proxy', 1);
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use route handlers
app.use('/', indexRouter);
app.use('/houses', housesRouter);
app.use('/bays', baysRouter);
app.use('/customers', customersRouter);
app.use('/defects', defectsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
