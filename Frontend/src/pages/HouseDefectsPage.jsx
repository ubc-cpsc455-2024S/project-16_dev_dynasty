import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDefectsByHouseId } from '../redux/defects/thunksDefects';
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
} from '@mui/material';
import Navbar from '../components/navigation/Navbar';
import HouseTabs from '../components/navigation/HouseTabs';

const HouseDefectsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const defects = useSelector((state) => state.defects.list);
  const loading = useSelector((state) => state.defects.loading);

  useEffect(() => {
    dispatch(fetchDefectsByHouseId(id));
  }, [dispatch, id]);

  if (loading) return <CircularProgress />;

  return (
    <Navbar>
      <Container>
        <HouseTabs />
        <Box mt={3}>
          <Paper elevation={3} style={{ padding: '16px' }}>
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
