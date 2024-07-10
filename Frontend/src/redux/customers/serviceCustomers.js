import axios from 'axios'

const getAllCustomers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/customers`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching customers:', error)
  }
}

const getCustomer = async customerId => {
  try {
    const response = await axios.get(
      `http://localhost:3000/customers/${customerId}`
    )
    return response.data.result
  } catch (error) {
    console.error(`Error fetching customer with id ${customerId}:`, error)
  }
}

const addCustomer = async customerData => {
  try {
    const response = await axios.post(
      `http://localhost:3000/customers`,
      customerData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data.result
  } catch (error) {
    console.error('Error adding customer:', error)
  }
}

const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/customers/${customerId}`,
      customerData
    )
    return response.data.result
  } catch (error) {
    console.error(`Error updating customer with id ${customerId}:`, error)
  }
}

const deleteCustomer = async customerId => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/customers/${customerId}`
    )
    return response.data.result
  } catch (error) {
    console.error(`Error deleting customer with id ${customerId}:`, error)
  }
}

export default {
  getAllCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
}
