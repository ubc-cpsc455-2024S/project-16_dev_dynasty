var housesJson = require("../data/houses.json");
const House = require("../models/House");
const mongoose = require("mongoose");
const House_View = require("../models/House_View");
const Bay_View = require("../models/Bay_View");
const { ObjectId } = require("mongodb");

// Andrew
// Function to fetch all houses
const getHousesFromDb = async ({
  query,
  nplQuery,
  customerNameQuery,
  houseModelQuery,
}) => {
  // let filteredHouses = housesJson;
  console.log("made it here");
  let filteredHouses;
  try {
    filteredHouses = await House_View();
    console.log(filteredHouses[0]);
    // filteredHouses = await House.find();
    // filteredHouses = await addHouseToDb(data);
  } catch (e) {
    console.log("error: ", e);
  }
  return filteredHouses;
};

// Andrew
// Function to fetch a specific house
const getHouseFromDb = async (houseid) => {
  try {
    return await House_View({ _id: new ObjectId(houseid) });
  } catch (error) {
    console.error("Error fetching house from DB:", error);
    throw error;
  }
};

module.exports = getHouseFromDb;

// Ryan
// Function to fetch all houses that are in production
const getHousesInBays = async () => {
  return await House_View({ bay_id: { $ne: null } });
};

// Andrew
// Function to fetch the house in a specified bay
const getHouseInBay = async (bayId) => {
  return await Bay_View({ bay_id: bayId });
};

// Ryan
// Function to add a new house
const addHouseToDb = async (houseData) => {
  // const houseId = Math.max(...housesJson.map((house) => house.house_id)) + 1; // Generate a new ID
  const dateCreated = formatDate(new Date());
  const newHouse = {
    ...houseData,
    created_on: dateCreated,
    bay_id: null,
    house_records_id: null,
    status: 1,
  };
  const newHouseMade = await House.create(newHouse);
  return newHouseMade;
};

// Ryan
// Function to delete a house
const deleteHouseFromDb = async (houseid) => {
  console.log("house delete id", houseid);
  return await House.findByIdAndDelete(houseid);
};

// Andrew
// Function to update house details, DO NOT use this endpoint to update bay!!
const updateHouseInDb = async (houseid, houseInfo) => {
  return await House.updateOne({ _id: houseid }, { $set: houseInfo });
};

// Andy
// Function to attach/detach a bay. Checks bay availability, updates bay name and status at the same time!!
const toggleBayAssignment = async (houseid, bayid) => {
  try {
    const newBay = await Bay_View({ bay_id: bayid });
    if (newBay[0].house_id) {
      throw new Error(
        `Bay in use: ${bayid} is already assigned to another house.`
      );
    }
    const result = await House.updateOne(
      { _id: houseid },
      { $set: { bay_id: bayid,bay_name: `Bay ${bayid}`, status: 1 } }
    );
    return result;
  } catch (error) {
    console.error(`Error updating house ${houseid} with bay ${bayid}:`, error);
    throw error;
  }
};

const formatDate = (date) => {
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  return `${day}-${month}-${year}`;
};

module.exports = {
  getHousesFromDb,
  getHouseFromDb,
  getHousesInBays,
  getHouseInBay,
  addHouseToDb,
  deleteHouseFromDb,
  updateHouseInDb,
  toggleBayAssignment,
};
