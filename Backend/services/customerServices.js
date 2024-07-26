const Customer = require("../models/Customer");

const getCustomersFromDb = async ({ customerNameQuery }) => {
  const filter = customerNameQuery
    ? {
        customer_name: { $regex: customerNameQuery, $options: "i" },
      }
    : {};

  return Customer.find(filter);
};

const addCustomerToDb = async (customerData) => {
  const { customer_name, customer_email } = customerData;
  const customer = new Customer({ customer_name, customer_email });
  await customer.save();
  return customer;
};

const deleteCustomerFromDb = async (customerId) => {
  const customer = await Customer.findByIdAndDelete(customerId);
  console.log(customer);
  if (customer) {
    return { success: true };
  } else {
    return { success: false };
  }
};

const getCustomerFromDb = async (customerId) => Customer.findById(customerId);

const updateCustomerInDb = async (customerId, customerData) => {
  const { customer_name, customer_email } = customerData;
  return Customer.findByIdAndUpdate(
    customerId,
    {
      $set: {
        customer_name: customer_name,
        customer_email: customer_email,
      },
    },
    {
      new: true,
    },
  );
};

module.exports = {
  getCustomersFromDb,
  addCustomerToDb,
  deleteCustomerFromDb,
  getCustomerFromDb,
  updateCustomerInDb,
};
