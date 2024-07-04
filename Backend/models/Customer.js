const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        customer_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    }
);

const Customer = mongoose.model('Customer', baySchema);

module.exports = Customer;