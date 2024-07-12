import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDefectsByHouseId } from '../redux/defects/thunksDefects';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  CircularProgress,
} from '@mui/material';

const HouseDefects = ({ houseId }) => {
  const dispatch = useDispatch();
  const defects = useSelector((state) => state.defects.list);
  const loading = useSelector((state) => state.defects.loading);

  useEffect(() => {
    dispatch(fetchDefectsByHouseId(houseId));
  }, [dispatch, houseId]);

  if (loading) return <CircularProgress />;

  return (
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
  );
};

export default HouseDefects;
