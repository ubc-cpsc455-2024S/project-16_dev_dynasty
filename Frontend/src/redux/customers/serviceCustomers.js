import axios from 'axios'

const getCustomers = async ({ customerNameQuery }) => {
  try {
    const params = new URLSearchParams({ customerNameQuery }).toString()
    const response = await axios.get(
      `http://localhost:3000/customers?${params}`
    )
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
      customerData
    )
    return response.data.result
  } catch (error) {
    console.error('Error adding customer:', error)
  }
}

const deleteCustomer = async customerId => {
  try {
    await axios.delete(`http://localhost:3000/customers/${customerId}`)
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
