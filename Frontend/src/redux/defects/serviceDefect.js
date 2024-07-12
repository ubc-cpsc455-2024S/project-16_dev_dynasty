import axios from 'axios';

// Fetch all defects for a specific house
export const getDefectsByHouseId = async (houseId) => {
  try {
    const response = await axios.get(`http://localhost:3000/defects/${houseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching defects for house with id ${houseId}:`, error);
    throw error;
  }
};

// Fetch a specific defect by ID
export const getDefectById = async (houseId, defectId) => {
  try {
    const response = await axios.get(`http://localhost:3000/defects/${houseId}/${defectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching defect with id ${defectId}:`, error);
    throw error;
  }
};

// Add a new defect to a specific house
export const addDefect = async (houseId, defectData) => {
  try {
    const formData = new FormData();
    for (const key in defectData) {
      if (key === 'images') {
        defectData.images.forEach((image) => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, defectData[key]);
      }
    }

    const response = await axios.post(`http://localhost:3000/defects/${houseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding defect to house with id ${houseId}:`, error);
    throw error;
  }
};

// Update an existing defect
export const updateDefect = async (houseId, defectId, defectData) => {
  try {
    const formData = new FormData();
    for (const key in defectData) {
      if (key === 'images') {
        defectData.images.forEach((image) => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, defectData[key]);
      }
    }

    const response = await axios.put(`http://localhost:3000/defects/${houseId}/${defectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating defect with id ${defectId}:`, error);
    throw error;
  }
};

// Delete a defect
export const deleteDefect = async (houseId, defectId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/defects/${houseId}/${defectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting defect with id ${defectId}:`, error);
    throw error;
  }
};
