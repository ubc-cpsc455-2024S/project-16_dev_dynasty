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
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import HouseHeader from '../components/headers/HouseHeader';

const AddHouseDefectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files].slice(0, 10);
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleImageRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const defectData = {
      title,
      description,
      status: 0, // Default to 'incomplete' state
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
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                style={{ marginRight: '10px', marginTop: '20px', height: '36.5px' }}
                disabled={images.length >= 10}
              >
                Upload Images
              </Button>
            </label>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px', height: '36.5px' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Add Defect'}
            </Button>
          </form>
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Image Previews
            </Typography>
            <Grid container spacing={2}>
              {imagePreviews.map((preview, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Box position="relative">
                    <img src={preview} alt={`Defect ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                    <IconButton
                      onClick={() => handleImageRemove(index)}
                      style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Navbar>
  );
};

export default AddHouseDefectPage;
