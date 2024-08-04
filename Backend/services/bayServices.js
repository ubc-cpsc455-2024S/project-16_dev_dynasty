const Bay = require("../models/Bay");
const Bay_View = require("../models/Bay_View");

// Funtion to retrieve all bays
const getBaysFromDb = async () => {
  try {
    return sortBays(await Bay.find({}));
  } catch (error) {
    console.error("Error fetching bays:", error);
    throw error;
  }
};

const getAvailableBaysFromDb = async () => {
  const allbayviews = await Bay_View();
  const filteredData = allbayviews.filter(
    (item) => !Object.keys(item).includes("house_id")
  );
  const noBay = {
    bay_id: "0",
    bay_name: "No Bay",
    bay_description: "Not in a bay",
  };
  filteredData.unshift(noBay);
  return filteredData;
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
  getAvailableBaysFromDb,
  getBayFromDb,
};
