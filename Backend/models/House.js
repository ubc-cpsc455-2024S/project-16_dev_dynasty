const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  npl: {
    type: String,
    // required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  online_date: {
    type: String,
  },
  created_on: {
    type: String,
    // required: true,
  },
  house_model: {
    type: String,
    // required: true,
  },
  square_ft: {
    type: Number,
    // required: true,
  },
  bay_id: {
    type: String,
    default: null,
  },
  bay_name: {
    type: String,
    default: null,
  },
  house_records_id: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
