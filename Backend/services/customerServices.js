const Customer = require("../models/Customer");

const getCustomersFromDb = () => Customer.find({});

const addCustomerToDb = async (customerData) => {
  const { customer_name, customer_email } = customerData;
  const customer = new Customer({ customer_name, customer_email });
  await customer.save();
  return customer;
};

module.exports = {
  getCustomersFromDb,
  addCustomerToDb,
};
