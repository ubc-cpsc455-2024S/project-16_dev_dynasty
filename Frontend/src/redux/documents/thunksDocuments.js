import { createAsyncThunk } from '@reduxjs/toolkit';
import * as serviceDocuments from './serviceDocuments';

export const fetchDocumentsByHouseId = createAsyncThunk(
  'documents/fetchByHouseId',
  async (houseId) => {
    const response = await serviceDocuments.getDocumentsByHouseId(houseId);
    return response;
  }
);

export const addDocumentAsync = createAsyncThunk(
  'documents/addDocument',
  async ({ houseId, documentData }) => {
    const response = await serviceDocuments.addDocument(houseId, documentData);
    return response;
  }
);

export const updateDocumentAsync = createAsyncThunk(
  'documents/updateDocument',
  async ({ houseId, documentId, documentData }) => {
    const response = await serviceDocuments.updateDocument(houseId, documentId, documentData);
    return response;
  }
);

export const deleteDocumentAsync = createAsyncThunk(
  'documents/deleteDocument',
  async ({ houseId, documentId }) => {
    const response = await serviceDocuments.deleteDocument(houseId, documentId);
    return response;
  }
);
