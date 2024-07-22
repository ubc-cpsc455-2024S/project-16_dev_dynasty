import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDefectsByHouseId, deleteDefectAsync } from '../redux/defects/thunksDefects';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Button,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Grid,
} from '@mui/material';
import Navbar from '../components/navigation/Navbar';
import HouseTabs from '../components/navigation/HouseTabs';
import Header1 from '../components/headers/Header1';
import HouseHeader from '../components/headers/HouseHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HouseDefectsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defects = useSelector((state) => state.defects.list);
  const loading = useSelector((state) => state.defects.loading);
  const houseInfo = useSelector((state) => state.houses.findHouse || null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchDefectsByHouseId(id));
  }, [dispatch, id]);

  const handleDelete = async (defectId) => {
    await dispatch(deleteDefectAsync({ houseId: id, defectId }));
    dispatch(fetchDefectsByHouseId(id));
  };

  const handleOpen = (url) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'incomplete':
        return 'red';
      case 'in progress':
        return 'orange';
      case 'resolved':
        return 'green';
      default:
        return 'black';
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Navbar>
      <Container>
        <Header1 title={<HouseHeader npl={houseInfo?.npl} />} />
        <HouseTabs />
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/houses/${id}/defects/add`)}>
            Add Defect
          </Button>
          <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              House Defects
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Bay ID</TableCell>
                    <TableCell>Images</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {defects.map((defect) => (
                    <TableRow key={defect._id}>
                      <TableCell>{defect.title}</TableCell>
                      <TableCell>{defect.description}</TableCell>
                      <TableCell style={{ color: getStatusColor(defect.status) }}>{defect.status}</TableCell>
                      <TableCell>{defect.bay_id}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                            gap: '8px',
                            maxHeight: '150px',
                            overflowY: 'auto',
                          }}
                        >
                          {defect.images.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`defect-${index}`}
                              width={70}
                              style={{ cursor: 'pointer', margin: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                              onClick={() => handleOpen(url)}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => navigate(`/houses/${id}/defects/${defect._id}/edit`)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(defect._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              border: '2px solid #000',
              boxShadow: 24,
              padding: '16px',
            }}>
              <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
            </div>
          </Fade>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default HouseDefectsPage;
