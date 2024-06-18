var housesJson = require("../data/houses.json");

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
    const index = housesJson.findIndex((house) => house.house_id === parseInt(houseid));
    console.log(houseid);
    console.log(index);
    if (index !== -1) {
      housesJson[index] = { ...housesJson[index], bay_id: bayid, bay_name: `Bay ${bayid}` };
      return { success: true };
    } else {
      return { error: "House not found" };
    }
  };
  
  module.exports = {
    getHousesFromDb,
    getHouseFromDb,
    addHouseToDb,
    deleteHouseFromDb,
    updateHouseInDb,
    toggleBayAssignment,
  };
  