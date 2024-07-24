const mongoose = require("mongoose");
const ChecklistRecord = require("./ChecklistRecord");

const checklistSchema = new mongoose.Schema({
  house_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  records: [ChecklistRecord],
});

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;
