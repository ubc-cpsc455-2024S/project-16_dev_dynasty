const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
