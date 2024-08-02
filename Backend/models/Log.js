const mongoose = require('mongoose');


const logSchema = new mongoose.Schema({
    eventTime: {
        type: String,
        required: true
    },
    logContent: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        enum: ['New customer',
            'New house',
            'House started',
            'Bay work begin',
            'Bay work complete',
            'House completed',
            'Defect created',
            'Defect fixed',],
        required: true
    }
})

const Log = mongoose.model('Log', logSchema);
module.exports = Log