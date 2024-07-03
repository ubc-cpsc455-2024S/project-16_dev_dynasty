var baysJson = require("../data/bays.json");

// Ryan
// TODO: Needs Fixing
// Funtion to retrieve all bays
const getBaysFromDb = () => {
  // const bays = housesJson.map((house) => {
  //   return {
  //     bay_id: house.bay_id,
  //     bay_name: house.bay_name,
  //     bay_description: house.bay_description,
  //   };
  // });
  // return bays.filter((bay) => bay.bay_id != null);
  return baysJson;
};

// TODO: Needs Fixing
// Funtion to retrieve a specific bay by ID
const getBayFromDb = (bayid) => {
  const bay = baysJson.find((bay) => bay.bay_id === bayid);
  return bay ? bay : null;
};

module.exports = {
  getBaysFromDb,
  getBayFromDb,
};
