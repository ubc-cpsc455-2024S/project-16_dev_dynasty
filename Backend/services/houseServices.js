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
    // filteredHouses = await addHouseToDb(data);
  } catch (e) {
    console.log("error: ", e);
  }

  // if (query) {
  //   if (query === "inBay") {
  //     filteredHouses = filteredHouses.filter((house) => house.bay_id !== null);
  //   } else {
  //     filteredHouses = filteredHouses.filter(
  //       (house) => house.status.toString() === query
  //     );
  //   }
  // }

  // if (nplQuery) {
  //   filteredHouses = filteredHouses.filter((house) =>
  //     house.npl.includes(nplQuery)
  //   );
  // }

  // if (customerNameQuery) {
  //   filteredHouses = filteredHouses.filter((house) =>
  //     house.customer_name
  //       .toLowerCase()
  //       .includes(customerNameQuery.toLowerCase())
  //   );
  // }

  // if (houseModelQuery) {
  //   filteredHouses = filteredHouses.filter((house) =>
  //     house.house_model.toLowerCase().includes(houseModelQuery.toLowerCase())
  //   );
  // }

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
  return await Bay_View();
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
    // house_id: houseId,
    // ...houseData,
    npl: "1",
    customer_id: new mongoose.Types.ObjectId("668b69cf786dde065ccf8f34"),
    online_date: "2021-09-01",
    created_on: dateCreated,
    house_model: "Model 1",
    square_ft: 1000,
    bay_id: 1,
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
  const houseDeleted = await House.findByIdAndDelete(houseid);
  return houseDeleted;
};

// Andrew
// Function to update house details
const updateHouseInDb = async (houseid, houseInfo) => {
  return await House.updateOne({ _id: houseid }, { $set: houseInfo });
};

// Andy
// Function to attach/detach a bay
const toggleBayAssignment = async (houseid, bayid) => {
  return await House.updateOne({ _id: houseid }, { $set: { bay_id: bayid } });
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
