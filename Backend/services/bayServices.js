const Bay = require("../models/Bay");
// Funtion to retrieve all bays
const getBaysFromDb = async () => {
  try {
    return sortBays(await Bay.find({}));
  } catch (error) {
    console.error("Error fetching bays:", error);
    throw error;
  }
};

const parseBayId = (bayId) => {
  const parts = bayId.match(/^(\d+)(.*)$/);
  return parts ? [parseFloat(parts[1]), parts[2]] : [bayId, ""];
};

const sortBays = (bays) =>
  bays.sort((a, b) => {
    const [numA, suffixA] = parseBayId(a.bay_id);
    const [numB, suffixB] = parseBayId(b.bay_id);

    if (numA !== numB) {
      return numA - numB;
    }
    return suffixA.localeCompare(suffixB);
  });

// Funtion to retrieve a specific bay by ID
const getBayFromDb = async (bayid) => {
  try {
    return await Bay.findOne({ bay_id: bayid });
  } catch (error) {
    console.error(`Error fetching bay ${bayid}:`, error);
    throw error;
  }
};

module.exports = {
  getBaysFromDb,
  getBayFromDb,
};
