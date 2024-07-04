const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
    {
        npl: {
            type: String,
            required: true,
            unique: true,
        },
        customer_id: {
            type: String,
            required: true,
        },
        customer_name: {
            type: String,
            required: true,
        },
        online_date: {
            type: String,
            required: true,
        },
        created_on: {
            type: String,
            required: true,
        },
        house_model: {
            type: String,
            required: true,
        },
        square_ft: {
            type: Number,
            required: true,
        },
        bay_id: {
            type: String,
            required: true,
            unique: true,
        },
        bay_name: {
            type: String,
            required: true,
            unique: true,
        },
        bay_description: {
            type: String,
        },
        house_records_id: {
            type: String,
            unique: true,
        },
        status: {
            type: Number,
            required: true,
            default: 0,
        }
    }
);

const House = mongoose.model('House', houseSchema);

module.exports = House;