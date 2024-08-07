const Log = require("../models/Log");

const formatDateWithTimezone = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const options = { timeZoneName: "short" };
  const timezone = new Intl.DateTimeFormat("en-US", options)
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName").value;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timezone}`;
};

const formatDateWithUserTimezone = (date) => {
  const options = { timeZoneName: "short" };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(date);
  const timezone = parts.find((part) => part.type === "timeZoneName").value;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timezone}`;
};

const addLogToDb = async (type, logParams) => {
  try {
    let logContent = "";

    switch (type) {
      case "New customer":
        logContent = `New customer added: ${logParams.customerName}`;
        break;
      case "New house":
        logContent = `New house created for customer ${logParams.customerName}, with NPL ${logParams.npl} and model No. ${logParams.model}`;
        break;
      case "House started":
        logContent = `House with NPL ${logParams.npl} started for customer ${logParams.customerName}. The model No. is  ${logParams.model}`;
        break;
      case "House completed":
        logContent = `House with NPL ${logParams.npl} was completed for customer ${logParams.customerName}. The model No. is  ${logParams.model}`;
        break;
      case "Bay work begin":
        logContent = `Bay ${logParams.bayId} work begin for house with NPL ${logParams.npl}`;
        break;
      case "Bay work complete":
        logContent = `Bay ${logParams.bayId} work completed for house with NPL ${logParams.npl}`;
        break;
      case "Defect created":
        logContent = `Defect ${logParams.defectTitle} created for house with NPL ${logParams.houseNpl} in Bay ${logParams.bayId} , and the house model is ${logParams.model}`;
        break;
      case "Defect fixed":
        logContent = `Defect ${logParams.defectTitle} fixed for house with NPL ${logParams.houseNpl} in Bay ${logParams.bayId} , and the house model is ${logParams.model}`;
        break;
      default:
        throw new Error("Invalid event type");
    }

    const newLog = new Log({
      eventTime: formatDateWithUserTimezone(new Date()),
      logContent,
      eventType: type,
    });

    if (logParams.houseId) {
      newLog.relevant_house = logParams.houseId;
    }
    // Save the log entry to the database
    await newLog.save();
    return { success: true, message: "Log added successfully", log: newLog };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error adding log", error };
  }
};

const getAllLogsFromDb = async () => {
  try {
    return await Log.find({});
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

const getLogsByHouseId = async (houseId) => {
  try {
    return await Log.find({ relevant_house: houseId });
  } catch (error) {
    console.error("Error fetching logs for house:", error);
    throw error;
  }
};

module.exports = { addLogToDb, getAllLogsFromDb, getLogsByHouseId };
