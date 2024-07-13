import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { addDefectAsync, fetchDefectsByHouseId } from '../redux/defects/thunksDefects';
import { getAllBaysAsync } from '../redux/bays/thunksBays';
import { getHouseAsync } from '../redux/houses/thunksHouses';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import HouseHeader from '../components/headers/HouseHeader';

const AddHouseDefectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const house = useSelector((state) => state.houses.findHouse);
  const bays = useSelector((state) => state.bays.list);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bayId, setBayId] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getAllBaysAsync());
    dispatch(getHouseAsync(id)).then((houseData) => {
      if (houseData.payload && houseData.payload.bay_id) {
        setBayId(houseData.payload.bay_id);
      }
    });
  }, [dispatch, id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setError('Some files were not valid images and were not added.');
    }
    setImages((prevImages) => [...prevImages, ...validFiles]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => file.type.startsWith('image/'));
    if (validFiles.length !== acceptedFiles.length) {
      setError('Some files were not valid images and were not added.');
    }
    setImages((prevImages) => [...prevImages, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const defectData = {
      title,
      description,
      bay_id: bayId,
      images,
    };

    console.log("Defect Data:", defectData);

    try {
      const response = await dispatch(addDefectAsync({ houseId: id, defectData })).unwrap();
      if(!response) throw new error;
      setLoading(false);
      dispatch(fetchDefectsByHouseId(id)); // Update the defects list
      navigate(`/houses/${id}/defects`);
    } catch (err) {
      setLoading(false);
      console.error("Error adding defect:", err);
      if (err.response && err.response.status === 400) {
        setError('Bad request. Please check the input data.');
      } else if (err.response && err.response.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Failed to add defect. Please try again.');
      }
    }
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Bay ID</InputLabel>
              <Select
                value={bayId}
                onChange={(e) => setBayId(e.target.value)}
                label="Bay ID"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {bays.map((bay) => (
                  <MenuItem key={bay._id} value={bay.bay_id}>
                    {bay.bay_id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #ccc',
                padding: '20px',
                marginTop: '20px',
                backgroundColor: isDragActive ? '#e0e0e0' : '#fafafa',
                textAlign: 'center'
              }}
            >
              <input {...getInputProps()} />
              <Typography align="center">
                {isDragActive ? 'Drop the files here ...' : 'Drag & drop files here, or click to select files'}
              </Typography>
            </div>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              {images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card style={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={URL.createObjectURL(image)}
                      alt={`defect-image-${index}`}
                    />
                    <IconButton
                      style={{ position: 'absolute', top: '5px', right: '5px' }}
                      onClick={() => handleDeleteImage(index)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {loading ? (
              <CircularProgress style={{ marginTop: '20px' }} />
            ) : (
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Add Defect
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

export default AddHouseDefectPage;
