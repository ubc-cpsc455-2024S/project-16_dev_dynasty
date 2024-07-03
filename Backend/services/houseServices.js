var housesJson = require("../data/houses.json");

// Andrew
// Function to fetch all houses
const getHousesFromDb = ({
  query,
  nplQuery,
  customerNameQuery,
  houseModelQuery,
}) => {
  let filteredHouses = housesJson;

  if (query) {
    if (query === "inBay") {
      filteredHouses = filteredHouses.filter((house) => house.bay_id !== null);
    } else {
      filteredHouses = filteredHouses.filter(
        (house) => house.status.toString() === query
      );
    }
  }

  if (nplQuery) {
    filteredHouses = filteredHouses.filter((house) =>
      house.npl.includes(nplQuery)
    );
  }

  if (customerNameQuery) {
    filteredHouses = filteredHouses.filter((house) =>
      house.customer_name
        .toLowerCase()
        .includes(customerNameQuery.toLowerCase())
    );
  }

  if (houseModelQuery) {
    filteredHouses = filteredHouses.filter((house) =>
      house.house_model.toLowerCase().includes(houseModelQuery.toLowerCase())
    );
  }

  return filteredHouses;
};

// Andrew
// Function to fetch a specific house
const getHouseFromDb = (houseid) => {
  return housesJson.find((house) => house.house_id === houseid);
};

// Ryan
// Function to fetch all houses that are in production
const getHousesInBays = () => {
  return housesJson.filter((house) => house.bay_id !== null);
};

// Andrew
// Function to fetch the house in a specified bay
const getHouseInBay = (bayId) => {
  return housesJson.find((house) => house.bay_id === bayId) || null;
};

// Ryan
// Function to add a new house
const addHouseToDb = async (houseData) => {
  const houseId = Math.max(...housesJson.map((house) => house.house_id)) + 1; // Generate a new ID
  const dateCreated = formatDate(new Date());
  const newHouse = {
    house_id: houseId,
    ...houseData,
    created_on: dateCreated,
    customer_id: null,
    online_date: null,
    bay_id: null,
    bay_name: null,
    bay_description: null,
    house_records_id: null,
    status: 1,
  };
  housesJson.push(newHouse);
  return newHouse;
};

// Ryan
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

// Andrew
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

// Andy
// Function to attach/detach a bay
const toggleBayAssignment = (houseid, bayid) => {
  const index = housesJson.findIndex(
    (house) => house.house_id === parseInt(houseid)
  );
  console.log(houseid);
  console.log(index);
  if (index !== -1) {
    housesJson[index] = {
      ...housesJson[index],
      bay_id: bayid,
      bay_name: `Bay ${bayid}`,
      status: 1,
    };
    return { success: true };
  } else {
    return { error: "House not found" };
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
