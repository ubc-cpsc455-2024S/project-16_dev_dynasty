const Bay = require('../models/Bay')
// Funtion to retrieve all bays
const getBaysFromDb = async () => {
  try {
    return await Bay.find({});
  } catch (error) {
    console.error('Error fetching bays:', error);
    throw error;
  }
};

// Funtion to retrieve a specific bay by ID
const getBayFromDb = async (bayid) => {
  try {
    return await Bay.findOne({bay_id: bayid});
  } catch (error) {
    console.error(`Error fetching bay ${bayid}:`, error);
    throw error;
  }
};

module.exports = {
  getBaysFromDb,
  getBayFromDb,
};
