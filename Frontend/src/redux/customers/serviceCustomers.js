import axios from 'axios'

const addCustomer = async customerData => {
  try {
    const response = await axios.post(
      `http://localhost:3000/customers`,
      customerData
    )
    return response.data.result
  } catch (err) {
    console.log('Error adding customer')
  }
}

export default {
  addCustomer,
}
