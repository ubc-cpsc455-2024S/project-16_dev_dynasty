var housesJson = require("../data/houses.json");

// TODO: Needs Fixing
// Funtion to retrieve all bays
const getBaysFromDb = () => {
  const bays = housesJson.map((house) => {
    return {
      bay_id: house.bay_id,
      bay_name: house.bay_name,
      bay_description: house.bay_description,
    };
  });
  return bays.filter((bay) => bay.bay_id != null);
};

// TODO: Needs Fixing
// Funtion to retrieve a specific bay by ID
const getBayFromDb = (bayid) => {
  const bay = housesJson.find((house) => house.bay_id === bayid);
  return bay
    ? {
        bay_id: bay.bay_id,
        bay_name: bay.bay_name,
        bay_description: bay.bay_description,
      }
    : null;
};

// Function to fetch all houses
const getHousesFromDb = () => {
  return housesJson;
};

// Function to fetch a specific house
const getHouseFromDb = (houseid) => {
  return housesJson.find((house) => house.house_id === houseid);
};

// Function to add a new house
const addHouseToDb = async (houseInfo) => {
  const newHouseId = Math.max(...housesJson.map((house) => house.house_id)) + 1; // Generate a new ID
  const newHouse = { house_id: newHouseId, ...houseInfo };
  housesJson.push(newHouse);
  return newHouse;
};

// Function to delete a house
const deleteHouseFromDb = (houseid) => {
  const index = housesJson.findIndex((house) => house.house_id === houseid);
  if (index > -1) {
    housesJson.splice(index, 1);
    return { deleted: true };
  } else {
    return { deleted: false };
  }
};

// Function to update house details
const updateHouseInDb = (houseid, houseInfo) => {
  const index = housesJson.findIndex(
    (house) => house.house_id === parseInt(houseid)
  );
  if (index > -1) {
    housesJson[index] = { ...housesJson[index], ...houseInfo };
    return housesJson[index];
  } else {
    return null;
  }
};

// Function to attach/detach a bay
const toggleBayAssignment = (houseid, bayid) => {
  const index = housesJson.findIndex((house) => house.house_id === houseid);
  if (house) {
    housesJson[index] = { ...housesJson[index], bay_id: bayid };
    return { success: true };
  } else {
    return { error: "House not found" };
  }
};

module.exports = {
  getBaysFromDb,
  getBayFromDb,
  getHousesFromDb,
  getHouseFromDb,
  addHouseToDb,
  deleteHouseFromDb,
  updateHouseInDb,
  toggleBayAssignment,
};
