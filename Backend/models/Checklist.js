const mongoose = require("mongoose");
const checklistRecordSchema = require("./ChecklistRecord");

const checklistSchema = new mongoose.Schema({
  house_id: {
    type: String,
    required: true,
  },
  checklist_name: {
    type: String,
    required: true,
  },
  records: {
    type: [checklistRecordSchema],
    default: [],
  },
  notes: {
    type: String,
    default: "",
  },
});

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;
