const House = require("../models/House");
const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const House_View = require("../models/House_View");
const Bay_View = require("../models/Bay_View");
const { ObjectId } = require("mongodb");
const { addLogToDb } = require('./logServices')

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
    // bay_id: null,
    // house_records_id: null,
    // status: 1,
  };

  const newHouseMade = await House.create(newHouse);
  if (houseData.customer_id) {
    const theCustomer = await Customer.findById(houseData.customer_id);
    const logParams = {
      customerName: theCustomer.customer_name,
      npl: houseData.npl, model: houseData.house_model, houseId: newHouseMade._id
    }
    await addLogToDb('New house', logParams);
  }
  return newHouseMade;
};

// Function to delete a house
const deleteHouseFromDb = async (houseid) => {
  return await House.findByIdAndDelete(houseid);
};

// Function to update house details, DO NOT use this endpoint to update bay!!
const updateHouseInDb = async (houseid, houseInfo) => {
  const theHouse = await House.findById(houseid);
  if (theHouse.status !== 2 && houseInfo.status === 2) {
    const logParams = {
      bayId: theHouse.bay_id,
      npl: theHouse.npl,
      houseId: theHouse._id
    }
    await addLogToDb('Bay work begin', logParams);
  }
  if (theHouse.status !== 4 && houseInfo.status === 4) {
    const logParams = {
      bayId: theHouse.bay_id,
      npl: theHouse.npl,
      houseId: theHouse._id
    }
    await addLogToDb('Bay work complete', logParams);
  }
  if (theHouse.status !== 5 && houseInfo.status === 5) {
    if (theHouse.customer_id) {
      const theCustomer = await Customer.findById(theHouse.customer_id);
      const logParams = {
        bayId: theHouse.bay_id,
        npl: theHouse.npl,
        houseId: theHouse._id,
        customerName: theCustomer.customer_name,
        model: theHouse.house_model
      }
      await addLogToDb('House completed', logParams);
    }
  }
  await House.updateOne({ _id: houseid }, { $set: houseInfo });
  return (await House_View({ _id: new ObjectId(houseid) }))[0];
};

// Function to attach/detach a bay. Checks bay availability, updates bay name and status at the same time!!
const toggleBayAssignment = async (houseid, bayid) => {
  try {
    // bay availability check if bay is not null
    if (bayid !== 'null') {
      const newBay = await Bay_View({ bay_id: bayid });
      if (newBay[0].house_id) {
        throw new Error(
          `Bay in use: ${bayid} is already assigned to another house.`,
        );
      }
    }
    // find the house
    const currentHouse = await House.findById(houseid);
    // update online date if house was not started, and log the house started event
    if (!currentHouse.online_date) {
      currentHouse.online_date = formatDate(new Date());
      if (currentHouse.customer_id) {
        const theCustomer = await Customer.findById(currentHouse.customer_id);
        const logParams = {
          customerName: theCustomer.customer_name,
          npl: currentHouse.npl, model: currentHouse.house_model, houseId: currentHouse._id
        }
        await addLogToDb('House started', logParams);
      }
    }
    if (bayid == 'null') {
      currentHouse.bay_id = null;
      currentHouse.bay_name = null;
      await currentHouse.save();
      // const logParams = {
      //   customerName: currentHouse.customer_id,
      //   npl: currentHouse.npl, model: currentHouse.house_model
      // }
      // await addLogToDb('House completed', logParams);
      return (await House_View({ _id: new ObjectId(houseid) }))[0];
    } else {
      currentHouse.bay_id = bayid;
      currentHouse.bay_name = `Bay ${bayid}`;
      currentHouse.status = 1;
      await currentHouse.save();
      return (await House_View({ _id: new ObjectId(houseid) }))[0];

    }

    // return currentHouse;
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
