import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const getChecklist = async (houseId, checklist) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/checklists/${houseId}/${checklist}`
    )
    return response.data.result
  } catch (error) {
    console.error(
      `Error fetching ${checklist} checklist with houseId ${houseId}:`,
      error
    )
  }
}

export default {
  getChecklist,
}
