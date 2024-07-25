const Checklist = require("../models/Checklist");

const getChecklistFromDb = async (houseId) => {
  return Checklist.findOne({
    house_id: houseId,
  });
};

const initializeChecklist = (houseId, checklistName) => {
  const checklist = new Checklist({
    house_id: houseId,
  });

  return checklist;
};

module.exports = {
  initializeChecklist,
  getChecklistFromDb,
};
