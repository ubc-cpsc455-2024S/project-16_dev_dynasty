import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const getChecklist = async houseId => {
  try {
    const response = await axios.get(`${BACKEND_URL}/checklists/${houseId}`, {
      withCredentials: true
    })
    return response.data.result
  } catch (error) {
    console.error(`Error fetching checklist from house ${houseId}:`, error)
  }
}

export const putChecklist = async (houseId, checklistData) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/checklists/${houseId}`,
      checklistData,
      {
        withCredentials: true
      }
    )
    return response.data.result
  } catch (error) {
    console.error(`Error adding checklist to house ${houseId}:`, error)
  }
}

export const deleteChecklist = async houseId => {
  try {
    await axios.delete(`${BACKEND_URL}/checklists/${houseId}`,
      {
        withCredentials: true
      })
    return houseId
  } catch (error) {
    console.error(`Error deleting checklist from house ${houseId}:`, error)
  }
}

export default {
  getChecklist,
  putChecklist,
  deleteChecklist,
}
