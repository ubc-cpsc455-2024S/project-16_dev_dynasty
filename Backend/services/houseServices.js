var housesJson = require("../data/houses.json");
const House = require("../models/House");
const mongoose = require("mongoose");
const House_View = require("../models/House_View");
const Bay_View = require("../models/Bay_View");
const { ObjectId } = require("mongodb");

// Function to fetch all houses
const getHousesFromDb = async ({
  query,
  nplQuery,
  customerNameQuery,
  houseModelQuery,
}) => {
  let filteredHouses;
  const queryObj = {};
  if (query) {
    queryObj.status = parseInt(query);
  }
  if (nplQuery) {
    queryObj.npl = nplQuery;
  }
  if (customerNameQuery) {
    queryObj.customer_name = customerNameQuery;
  }
  if (houseModelQuery) {
    queryObj.house_model = houseModelQuery;
  }
  try {
    if (Object.keys(queryObj).length > 0) {
      console.log("queryObj", queryObj);
      filteredHouses = await House_View(queryObj);
    } else {
      filteredHouses = await House_View();
    }
  } catch (e) {
    console.log("error: ", e);
  }
  return filteredHouses;
};

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

// Function to fetch all houses that are in production
const getHousesInBays = async () => {
  return await House_View({ bay_id: { $ne: null } });
};

// Function to fetch the house in a specified bay
const getHouseInBay = async (bayId) => {
  return await Bay_View({ bay_id: bayId });
};

// Function to add a new house
const addHouseToDb = async (houseData) => {
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

// Function to delete a house
const deleteHouseFromDb = async (houseid) => {
  console.log("house delete id", houseid);
  return await House.findByIdAndDelete(houseid);
};

// Function to update house details, DO NOT use this endpoint to update bay!!
const updateHouseInDb = async (houseid, houseInfo) => {
  const currentHouse = (await House.find({ _id: houseid }))[0];
  // Moved from "Not Started" -> "In Progress" === update online date
  if (
    !currentHouse.online_date &&
    currentHouse.status === 1 &&
    houseInfo.status > 1
  ) {
    houseInfo.online_date = formatDate(new Date());
  }
  await House.updateOne({ _id: houseid }, { $set: houseInfo });
  return (await House_View({ _id: new ObjectId(houseid) }))[0];
};

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
      { $set: { bay_id: bayid, bay_name: `Bay ${bayid}`, status: 1 } }
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
