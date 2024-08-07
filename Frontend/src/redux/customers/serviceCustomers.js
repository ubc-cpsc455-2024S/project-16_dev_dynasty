import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import { toast } from 'react-toastify'

const getCustomers = async ({ customerNameQuery }) => {
  try {
    let response
    if (customerNameQuery === undefined) {
      response = await axios.get(`${BACKEND_URL}/customers`, {
        withCredentials: true,
      })
    } else {
      const params = new URLSearchParams({ customerNameQuery }).toString()
      response = await axios.get(`${BACKEND_URL}/customers?${params}`, {
        withCredentials: true,
      })
    }
    return response.data.result
  } catch (error) {
    console.error('Error fetching customers:', error)
  }
}

const getCustomer = async customerId => {
  try {
    const response = await axios.get(`${BACKEND_URL}/customers/${customerId}`, {
      withCredentials: true,
    })
    return response.data.result
  } catch (error) {
    console.error(`Error fetching customer with id ${customerId}:`, error)
  }
}

const addCustomer = async customerData => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/customers`,
      customerData,
      {
        withCredentials: true,
      }
    )
    return response.data.result
  } catch (error) {
    console.error('Error adding customer:', error)
    if (error.response.status === 401) {
      toast.error('You are not authorized to add customer')
    }
  }
}

const deleteCustomer = async customerId => {
  try {
    await axios.delete(`${BACKEND_URL}/customers/${customerId}`, {
      withCredentials: true,
    })
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
