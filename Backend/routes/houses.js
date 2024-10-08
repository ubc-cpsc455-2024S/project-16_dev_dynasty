var express = require("express");
var router = express.Router();
const {
  getHousesFromDb,
  getHouseFromDb,
  getHousesInBays,
  getHouseInBay,
  addHouseToDb,
  deleteHouseFromDb,
  updateHouseInDb,
  toggleBayAssignment,
} = require("../services/houseServices");
const { getLogsByHouseId } = require("../services/logServices");

const {
  requireLoggin,
  requirePermission,
} = require("../middleware/authMiddleware");

// GET endpoint to retrieve all houses
router.get("/", requireLoggin, async (req, res) => {
  try {
    const { query, nplQuery, customerNameQuery, houseModelQuery } = req.query;
    const houses = await getHousesFromDb({
      query,
      nplQuery,
      customerNameQuery,
      houseModelQuery,
    });
    res.json({ result: houses });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// GET endpoint to retrieve all houses that has bay
router.get("/inbay", requireLoggin, async (req, res) => {
  try {
    const houses = await getHousesInBays();
    res.json({ result: houses });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET endpoint to retrieve the house that is in a specific bay
router.get("/inbay/:bayid", requireLoggin, async (req, res) => {
  const { bayid } = req.params;
  try {
    const house = await getHouseInBay(bayid);
    res.json({ result: house });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET endpoint to retrieve a specific house
router.get("/:houseid", requireLoggin, async (req, res) => {
  const { houseid } = req.params;
  try {
    const houseLogs = await getLogsByHouseId(houseid);
    const house = (await getHouseFromDb(houseid))[0];
    house.logs = houseLogs;
    if (!house) {
      res.status(404).send("House not found");
    } else {
      res.json({ result: house });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server error");
  }
});

// POST endpoint to add a new house
router.post(
  "/",
  requireLoggin,
  requirePermission("admin"),
  async (req, res) => {
    try {
      const newHouse = await addHouseToDb(req.body);
      const houseLogs = await getLogsByHouseId(newHouse._id);
      newHouse.logs = houseLogs;
      res.status(201).json({ result: newHouse });
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Server error", error);
    }
  },
);

// DELETE endpoint to remove a house
router.delete(
  "/:houseid",
  requireLoggin,
  requirePermission("admin"),
  async (req, res) => {
    const { houseid } = req.params;
    try {
      const houseDeleted = await deleteHouseFromDb(houseid); // Function to delete a house
      res.status(200).json({ result: { houseDeleted } });
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Server error", error);
    }
  },
);

// PUT endpoint to update house information
router.put("/:houseid", requireLoggin, async (req, res) => {
  const { houseid } = req.params;
  try {
    const updatedHouse = await updateHouseInDb(houseid, req.body); // Function to update house details
    if (updatedHouse) {
      const houseLogs = await getLogsByHouseId(updatedHouse._id);
      updatedHouse.logs = houseLogs;
      res.status(200).json({ result: updatedHouse });
    } else {
      res.status(404).send("House not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// PATCH endpoint to attach or detach a house to a bay
router.patch("/:houseid/:bayid", requireLoggin, async (req, res) => {
  const { houseid, bayid } = req.params;
  try {
    const updatedHouse = await toggleBayAssignment(houseid, bayid); // Function to attach/detach a bay
    if (updatedHouse) {
      const houseLogs = await getLogsByHouseId(updatedHouse._id);
      updatedHouse.logs = houseLogs;
      res.status(200).json({ result: updatedHouse });
    } else {
      res.status(404).send("House not found");
    }
  } catch (error) {
    if (error.message.includes("Bay in use")) {
      res.status(400).json({ bayInUseError: error.message });
    } else {
      res.status(500).send("Server error");
    }
  }
});

module.exports = router;
