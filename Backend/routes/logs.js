const express = require("express");
var router = express.Router();
const {
  getAllLogsFromDb,
  getLogsByHouseId,
} = require("../services/logServices");

// GET endpoint to retrieve all logs
router.get("/all", async (req, res) => {
  try {
    const logs = await getAllLogsFromDb();
    res.json({ result: logs });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET logs by houseId
router.get("/:houseId", async (req, res) => {
  try {
    const houseId = req.params.houseId;
    const logs = await getLogsByHouseId(houseId);
    res.json({ result: logs });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
