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

// GET endpoint to retrieve all houses
router.get("/", async (req, res) => {
  try {
    const houses = await getHousesFromDb(); // Function to fetch all houses
    res.json({ result: houses });
  } catch (error) {
    res.status(500).send("Server error");
  }
});


// GET endpoint to retrieve all houses that has bay
router.get("/inbay", async (req, res) => {
  try {
    const houses = await getHousesInBays(); 
    res.json({ result: houses });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET endpoint to retrieve all houses that has bay
router.get("/inbay/:bayid", async (req, res) => {
  const { bayid } = req.params;
  console.log("bayid", bayid);
  try {
    const house = await getHouseInBay(parseInt(bayid)); 
    res.json({ result: house });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET endpoint to retrieve a specific house
router.get("/:houseid", async (req, res) => {
  const { houseid } = req.params;
  console.log("houseid", houseid);
  try {
    const house = await getHouseFromDb(parseInt(houseid)); // Function to fetch a specific house
    if (!house) {
      res.status(404).send("House not found");
    } else {
      res.json({ result: house });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});



// POST endpoint to add a new house
router.post("/", async (req, res) => {
  try {
    const newHouse = await addHouseToDb(req.body); // Function to add a new house
    res.status(200).json({ result: { house_id: newHouse.house_id } });
  } catch (error) {
    switch (error.code) {
      case "BAY_IN_USE":
        res.status(400).send("Bay in use");
        break;
      case "NPL_OR_BAY_NOT_EXIST":
        res.status(404).send("NPL#/Bay not exist");
        break;
      case "FORBIDDEN":
        res.status(403).send("Forbidden");
        break;
      default:
        res.status(500).send("Server error");
    }
  }
});

// DELETE endpoint to remove a house
router.delete("/:houseid", async (req, res) => {
  const { houseid } = req.params;
  try {
    const result = await deleteHouseFromDb(parseInt(houseid)); // Function to delete a house
    if (result.deleted) {
      res.status(200).json({ result: { house_id: houseid } });
    } else {
      res.status(404).send("House not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// PUT endpoint to update house information
router.put("/:houseid", async (req, res) => {
  const { houseid } = req.params;
  try {
    const updatedHouse = await updateHouseInDb(parseInt(houseid), req.body); // Function to update house details
    if (updatedHouse) {
      res.status(200).json({ result: updatedHouse });
    } else {
      res.status(404).send("House not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// PATCH endpoint to attach or detach a house to a bay
router.patch("/:houseid/:bayid", async (req, res) => {
  const { houseid, bayid } = req.params;
  try {
    const result = await toggleBayAssignment(houseid, bayid); // Function to attach/detach a bay
    if (result.success) {
      res.status(200).json({ message: `Successfully updated bay for house ${houseid}`, house_id: houseid, bay_id: bayid});
    } else if (result.error === "BAY_IN_USE") {
      res.status(409).send("Bay in use");
    } else {
      res.status(404).send("House not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
