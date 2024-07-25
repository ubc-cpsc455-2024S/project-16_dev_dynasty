const mongoose = require("mongoose");
const checklistRecordSchema = require("./ChecklistRecord");
const unit_exterior_template = require("../checklist_templates/unit_exterior");
const kitchen_dining_template = require("../checklist_templates/kitchen_dining");

const checklistSchema = new mongoose.Schema({
  house_id: {
    type: String,
    required: true,
  },
  unit_exterior: {
    records: {
      type: [checklistRecordSchema],
      default: unit_exterior_template,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  kitchen_dining: {
    records: {
      type: [checklistRecordSchema],
      default: kitchen_dining_template,
    },
    notes: {
      type: String,
      default: "",
    },
  },
});

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;
