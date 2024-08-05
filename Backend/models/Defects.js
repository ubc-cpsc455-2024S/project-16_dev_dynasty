const mongoose = require('mongoose');

const defectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: false
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
});

const Defect = mongoose.model('Defect', defectSchema);

module.exports = Defect;
