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
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDefectId, setSelectedDefectId] = useState(null);

  useEffect(() => {
    dispatch(fetchDefectsByHouseId(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    await dispatch(deleteDefectAsync({ houseId: id, defectId: selectedDefectId }));
    setDeleteDialogOpen(false);
    setSelectedDefectId(null);
    dispatch(fetchDefectsByHouseId(id));
  };

  const handleOpenDeleteDialog = (defectId) => {
    setSelectedDefectId(defectId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedDefectId(null);
  };

  const handleOpenImageModal = (url) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleCloseImageModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Incomplete':
        return 'red';
      case 'In progress':
        return 'orange';
      case 'Resolved':
        return 'green';
      default:
        return 'black';
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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
                      <TableCell>
                        <Tooltip title={defect.title} arrow>
                          <span>{truncateText(defect.title, 20)}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={defect.description} arrow>
                          <span>{truncateText(defect.description, 40)}</span>
                        </Tooltip>
                      </TableCell>
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
                              onClick={() => handleOpenImageModal(url)}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => navigate(`/houses/${id}/defects/${defect._id}/edit`)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDeleteDialog(defect._id)}>
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

        {/* Image Modal */}
        <Modal
          open={open}
          onClose={handleCloseImageModal}
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
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this defect? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Navbar>
  );
};

export default HouseDefectsPage;
