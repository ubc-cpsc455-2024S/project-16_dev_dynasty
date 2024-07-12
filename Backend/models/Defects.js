const mongoose = require('mongoose');

const defectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  bay_id: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  resolved_date: {
    type: Date,
    default: null
  }
});

const Defect = mongoose.model('Defect', defectSchema);

module.exports = Defect;
