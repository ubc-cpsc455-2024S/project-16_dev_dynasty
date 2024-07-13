import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(fetchDefectsByHouseId(id));
  }, [dispatch, id]);

  const handleDelete = async (defectId) => {
    await dispatch(deleteDefectAsync({ houseId: id, defectId }));
    dispatch(fetchDefectsByHouseId(id));
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
                      <TableCell>{defect.status}</TableCell>
                      <TableCell>{defect.bay_id}</TableCell>
                      <TableCell>
                        {defect.images.map((url, index) => (
                          <img key={index} src={url} alt={`defect-${index}`} width={50} />
                        ))}
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
      </Container>
    </Navbar>
  );
};

export default HouseDefectsPage;
