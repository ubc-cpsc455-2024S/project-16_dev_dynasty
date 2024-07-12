import React from 'react';
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
} from '@mui/material';
import { styled } from '@mui/system';

const TableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
});

const StatusCell = styled(TableCell)(({ status }) => ({
  color: getStatusColor(status),
  fontWeight: 'bold',
}));

const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return 'red';
    case 1:
      return 'grey';
    case 2:
      return 'orange';
    case 3:
      return 'blue';
    case 4:
      return 'green';
    default:
      return 'black';
  }
};

const HouseDetails = ({ houseInfo }) => {
  if (!houseInfo) {
    return (
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          House Details
        </Typography>
        <Typography variant="body1">
          No house information available.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        House Details
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Attribute</TableHeadCell>
              <TableHeadCell>Value</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Project #</TableCell>
              <TableCell>{houseInfo.npl}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Model #</TableCell>
              <TableCell>{houseInfo.house_model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>{houseInfo.customer_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <StatusCell status={houseInfo.status}>
                {houseStatusEnum[houseInfo.status]}
              </StatusCell>
            </TableRow>
            <TableRow>
              <TableCell>Square Footage</TableCell>
              <TableCell>{houseInfo.square_ft} sqft</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Online Date</TableCell>
              <TableCell>{houseInfo.online_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created On</TableCell>
              <TableCell>{houseInfo.created_on}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bay ID</TableCell>
              <TableCell>{houseInfo.bay_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bay Name</TableCell>
              <TableCell>{houseInfo.bay_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bay Description</TableCell>
              <TableCell>{houseInfo.bay_description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default HouseDetails;
