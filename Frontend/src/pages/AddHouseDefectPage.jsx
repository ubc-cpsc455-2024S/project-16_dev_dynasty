import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addDefectAsync } from '../redux/defects/thunksDefects';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import HouseHeader from '../components/headers/HouseHeader';

const AddHouseDefectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const defectData = {
      title,
      description,
      status,
      images,
    };

    await dispatch(addDefectAsync({ houseId: id, defectData }));
    setLoading(false);
    navigate(`/houses/${id}/defects`);
  };

  return (
    <Navbar>
      <Container>
        <Header1 title={<HouseHeader npl="Add Defect" />} />
        <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Add House Defect
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
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="outlined" component="span">
                Upload Images
              </Button>
            </label>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Add Defect
              </Button>
            )}
          </form>
        </Paper>
      </Container>
    </Navbar>
  );
};

export default AddHouseDefectPage;
