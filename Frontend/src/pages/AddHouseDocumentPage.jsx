// src/pages/AddHouseDocumentPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addDocumentAsync } from '../redux/documents/thunksDocuments';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import HouseHeader from '../components/headers/HouseHeader';

const AddHouseDocumentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const documentData = {
      title,
      type,
      description,
      file,
    };

    try {
      const response = await dispatch(addDocumentAsync({ houseId: id, documentData })).unwrap();
      if (!response) throw new Error('Failed to add document.');
      setLoading(false);
      navigate(`/houses/${id}/documents`);
    } catch (err) {
      setLoading(false);
      console.error("Error adding document:", err);
      setError('Failed to add document. Please try again.');
    }
  };

  return (
    <Navbar>
      <Container>
        <Header1 title={<HouseHeader npl="Add Document" />} />
        <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Add House Document
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <input
              accept="application/pdf, image/*"
              type="file"
              onChange={handleFileChange}
              style={{ marginTop: '20px' }}
            />
            {loading ? (
              <CircularProgress style={{ marginTop: '20px' }} />
            ) : (
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Add Document
              </Button>
            )}
          </form>
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
              <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>
          )}
        </Paper>
      </Container>
    </Navbar>
  );
};

export default AddHouseDocumentPage;
