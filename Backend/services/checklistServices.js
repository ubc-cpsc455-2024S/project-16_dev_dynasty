const Checklist = require("../models/Checklist");
const House = require("../models/House");
const unitExteriorTemplate = require("../checklist_templates/unitExterior");

const getChecklistFromDb = async (houseId, checklistName) => {
  return Checklist.findOne({
    house_id: houseId,
    checklist_name: checklistName,
  });
};

const getHouseFromDb = async (houseId) => {
  return House.findById(houseId);
};

const initializeChecklist = (houseId, checklistName) => {
  const checklist = new Checklist({
    house_id: houseId,
    checklist_name: checklistName,
    records: [],
  });
  for (let record of unitExteriorTemplate) {
    console.log(record);
    checklist.records.push(record);
  }
  return checklist;
};

module.exports = {
  initializeChecklist,
  getChecklistFromDb,
  getHouseFromDb,
};
