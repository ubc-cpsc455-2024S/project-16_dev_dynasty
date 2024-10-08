var express = require("express");
var router = express.Router();
const {
  getCustomersFromDb,
  addCustomerToDb,
  deleteCustomerFromDb,
  getCustomerFromDb,
  updateCustomerInDb,
} = require("../services/customerServices");
const {
  requireLoggin,
  requirePermission,
} = require("../middleware/authMiddleware");

// GET endpoint to retrieve all customers
router.get("/", requireLoggin, async (req, res, next) => {
  try {
    const { customerNameQuery } = req.query;
    const customers = await getCustomersFromDb({ customerNameQuery });
    res.status(200).send({ result: customers });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// POST endpoint to add a new customer
router.post(
  "/",
  requireLoggin,
  requirePermission("admin"),
  async (req, res) => {
    try {
      const newCustomer = await addCustomerToDb(req.body);
      res.status(201).json({ result: newCustomer });
    } catch (err) {
      res.status(500).send("Server error");
    }
  },
);

// GET endpoint to retrieve a specific customer by id
router.get("/:customerId", requireLoggin, async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const customer = await getCustomerFromDb(customerId);
    if (customer) {
      res.status(200).json({ result: customer });
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// DELETE endpoint to delete a specific customer by id
router.delete(
  "/:customerId",
  requireLoggin,
  requirePermission("admin"),
  async (req, res) => {
    const customerId = req.params.customerId;
    try {
      const result = await deleteCustomerFromDb(customerId);
      if (result.success) {
        res.status(204).send();
      } else {
        res.status(404).send("Customer not found");
      }
    } catch (error) {
      res.status(500).send("Server error");
    }
  },
);

// PUT endpoint to update a specific customer
router.put("/:customerId", requireLoggin, async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const updatedCustomer = await updateCustomerInDb(customerId, req.body); // Function to update customer details
    if (updatedCustomer) {
      res.status(200).json({ result: updatedCustomer });
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
