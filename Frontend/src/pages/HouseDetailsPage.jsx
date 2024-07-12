import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getHouseAsync, updateHouseAsync, deleteHouseAsync } from '../redux/houses/thunksHouses';
import { getAllBaysAsync } from '../redux/bays/thunksBays';
import { houseStatusEnum } from '../constants/contants';
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import SelectCustom from '../components/inputs/SelectCustom';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Link,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
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

const HouseDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const houseInfo = useSelector((state) => state.houses.findHouse || null);
  const bays = useSelector((state) => state.bays.list || []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getHouseAsync(id));
    dispatch(getAllBaysAsync());
  }, [dispatch, id]);

  const handleChangeStatus = (event) => {
    const status = Number(event.target.value);
    const houseData = {
      houseId: houseInfo._id,
      houseData: { ...houseInfo, status: status },
    };
    dispatch(updateHouseAsync(houseData));
  };

  const handleChangeBay = (event) => {
    let bay_id = event.target.value;
    if (bay_id === 'No Bay') {
      bay_id = null;
    }
    const houseData = {
      houseId: houseInfo._id,
      houseData: { ...houseInfo, bay_id: bay_id },
    };
    dispatch(updateHouseAsync(houseData));
  };

  const handleDeleteHouse = () => {
    dispatch(deleteHouseAsync(houseInfo._id));
    navigate('/houses');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const houseStatusOptions = Object.keys(houseStatusEnum).map((key) => ({
    value: key,
    label: houseStatusEnum[key],
  }));

  const bayOptions = bays.map(({ bay_id }) => ({
    value: bay_id,
    label: bay_id,
  }));

  if (!houseInfo) return <CircularProgress />;
  console.log(houseInfo);

  return (
    <Navbar>
      <Container>
        <Header1
          title={
            <Box>
              <Link href="/houses" underline="none">
                <Typography variant="h6" component="span" color="primary">
                  Houses
                </Typography>
              </Link>
              <Typography variant="h6" component="span" color="textPrimary">
                {' > House ' + houseInfo.npl}
              </Typography>
            </Box>
          }
          button={
            <Box display={'flex'}>
              <SelectCustom
                style={{ marginRight: '10px' }}
                label={'Status'}
                options={houseStatusOptions}
                value={houseInfo.status}
                onChange={handleChangeStatus}
              />
              <SelectCustom
                label={'Bay #'}
                extraOption={{ value: 'No Bay', label: 'No bay' }}
                options={bayOptions}
                value={houseInfo.bay_id || 'No Bay'}
                onChange={handleChangeBay}
              />
              <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                Delete House
              </Button>
            </Box>
          }
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete House</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this house? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteHouse} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Navbar>
  );
};

export default HouseDetailsPage;

