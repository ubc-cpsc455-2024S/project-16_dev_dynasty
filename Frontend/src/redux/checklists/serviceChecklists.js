import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const getChecklist = async (houseId, checklistName) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/checklists/${houseId}/${checklistName}`
    )
    return response.data.result
  } catch (error) {
    console.error(
      `Error fetching ${checklistName} checklist with houseId ${houseId}:`,
      error
    )
  }
}

export default {
  getChecklist,
}
