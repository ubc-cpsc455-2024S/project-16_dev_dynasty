var express = require("express");
var router = express.Router();
const { getBaysFromDb, getBayFromDb, getAvailableBaysFromDb } = require("../services/bayServices");

// GET endpoint to retrieve all bays
router.get("/", async (req, res) => {
  try {
    const bays = await getBaysFromDb();
    res.json({ result: bays });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET available bays
router.get("/empty", async (req, res) => {
  try {
    const emptyBays = await getAvailableBaysFromDb();
    console.log('empty bays are: ', emptyBays);
    res.json({ result: emptyBays });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET endpoint to retrieve a specific bay by ID
router.get("/:bayid", async (req, res) => {
  const { bayid } = req.params;
  try {
    const bay = await getBayFromDb(bayid);
    if (!bay) {
      res.status(404).send("Bay not found");
    } else {
      res.json({ result: bay });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
