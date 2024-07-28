const Checklist = require("../models/Checklist");

const getChecklistFromDb = async (houseId) => {
  return Checklist.findOne({
    house_id: houseId,
  });
};

const initializeChecklist = (houseId) => {
  return new Checklist({
    house_id: houseId,
  });
};

const deleteChecklistFromDb = async (houseId) => {
  const checklist = await Checklist.findOneAndDelete({
    house_id: houseId,
  });
  if (checklist) {
    return { success: true };
  } else {
    return { success: false };
  }
};

module.exports = {
  initializeChecklist,
  getChecklistFromDb,
  deleteChecklistFromDb,
};
