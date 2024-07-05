var express = require("express");
var router = express.Router();
const {
  getCustomersFromDb,
  addCustomerToDb,
} = require("../services/customerServices");

// GET endpoint to retrieve all customers
router.get("/", async (req, res, next) => {
  try {
    const customers = await getCustomersFromDb();
    res.status(200).send({ result: customers });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// POST endpoint to add a new customer
router.post("/", async (req, res) => {
  try {
    const newCustomer = await addCustomerToDb(req.body);
    res.status(201).json({ result: newCustomer });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// GET endpoint to retrieve a specific customer by id

// DELETE endpoint to delete a specific customer by id

// PUT endpoint to update a

module.exports = router;
