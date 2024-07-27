import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getDocumentsByHouseId = async (houseId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/documents/${houseId}/documents`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching documents for house with id ${houseId}:`, error);
    throw error;
  }
};

export const addDocument = async (houseId, documentData) => {
  try {
    const formData = new FormData();
    for (const key in documentData) {
      if (key === 'file') {
        formData.append('file', documentData.file);
      } else {
        formData.append(key, documentData[key]);
      }
    }

    const response = await axios.post(`${BACKEND_URL}/documents/${houseId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding document to house with id ${houseId}:`, error);
    throw error;
  }
};

export const updateDocument = async (houseId, documentId, documentData) => {
  try {
    const formData = new FormData();
    for (const key in documentData) {
      if (key === 'file' && documentData.file) {
        formData.append('file', documentData.file);
      } else {
        formData.append(key, documentData[key]);
      }
    }

    const response = await axios.put(`${BACKEND_URL}/documents/${houseId}/documents/${documentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating document with id ${documentId}:`, error);
    throw error;
  }
};

export const deleteDocument = async (houseId, documentId) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/documents/${houseId}/documents/${documentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting document with id ${documentId}:`, error);
    throw error;
  }
};
