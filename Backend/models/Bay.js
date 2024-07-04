const mongoose = require('mongoose');

const baySchema = mongoose.Schema(
    {
        bay_id: {
            type:String,
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
            required: true,
        }
    }
);

const Bay = mongoose.model('Bay', baySchema);

module.exports = Bay;

