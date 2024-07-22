import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getCustomers = async ({ customerNameQuery }) => {
  try {
    let response
    if (customerNameQuery === undefined) {
      response = await axios.get(`${BACKEND_URL}/customers`)
    } else {
      const params = new URLSearchParams({ customerNameQuery }).toString()
      response = await axios.get(`${BACKEND_URL}/customers?${params}`)
    }
    return response.data.result
  } catch (error) {
    console.error('Error fetching customers:', error)
  }
}

const getCustomer = async customerId => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/customers/${customerId}`
    )
    return response.data.result
  } catch (error) {
    console.error(`Error fetching customer with id ${customerId}:`, error)
  }
}

const addCustomer = async customerData => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/customers`,
      customerData
    )
    return response.data.result
  } catch (error) {
    console.error('Error adding customer:', error)
  }
}

const deleteCustomer = async customerId => {
  try {
    await axios.delete(`${BACKEND_URL}/customers/${customerId}`)
    return customerId
  } catch (error) {
    console.error(`Error deleting customer with id ${customerId}:`, error)
  }
}

export default {
  getCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
}
