import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Container, Typography, Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { routes } from '../router/routes';
import { getAllHousesAsync } from '../redux/houses/thunksHouses';
import HousesTable from '../components/tables/HousesTable'; 
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import { houseStatusEnum } from '../constants/contants';


const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
});

const ErrorText = styled(Typography)({
  color: 'red',
  textAlign: 'center',
  marginTop: '50px',
});

const commonQueries = [
  { label: 'None', value: '' },
  { label: 'In-Bay Houses', value: 'inBay' },
  ...Object.keys(houseStatusEnum).map(key => ({ label: houseStatusEnum[key], value: key }))
];

const HousesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.houses.list);
  const status = useSelector((state) => state.houses.status);
  const error = useSelector((state) => state.houses.error);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState('');
  const [nplQuery, setNplQuery] = useState('');
  const [customerNameQuery, setCustomerNameQuery] = useState('');
  const [houseModelQuery, setHouseModelQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, query, nplQuery, customerNameQuery, houseModelQuery]);

  const fetchData = () => {
    dispatch(getAllHousesAsync({ query, nplQuery, customerNameQuery, houseModelQuery }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClear = () => {
    setQuery('');
    setNplQuery('');
    setCustomerNameQuery('');
    setHouseModelQuery('');
    setPage(0);
    fetchData();
  };

  return (
    <Navbar>
      <Container>
        <Header1
          title={'House Page'}
          button={
            <Button
              variant='contained'
              onClick={() => navigate(routes.housesAddRoute)}
              startIcon={<MdAdd />}
            >
              Add House
            </Button>
          }
        />
        <Box mt={3}>
          <Box mb={3} display="flex" justifyContent="space-between">
            <FormControl variant="outlined" size="small" style={{ minWidth: 200, marginRight: '10px' }}>
              <InputLabel>Common Queries</InputLabel>
              <Select
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                label="Common Queries"
              >
                {commonQueries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="NPL"
              value={nplQuery}
              onChange={(e) => setNplQuery(e.target.value)}
              variant="outlined"
              size="small"
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Customer Name"
              value={customerNameQuery}
              onChange={(e) => setCustomerNameQuery(e.target.value)}
              variant="outlined"
              size="small"
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="House Model"
              value={houseModelQuery}
              onChange={(e) => setHouseModelQuery(e.target.value)}
              variant="outlined"
              size="small"
              style={{ marginRight: '10px' }}
            />
            <Button variant="contained" onClick={handleClear} style={{ backgroundColor: 'grey', color: 'white' }}>
              Clear
            </Button>
          </Box>
          {status.getAll === 'pending' ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : error ? (
            <ErrorText>
              Error: {error}
            </ErrorText>
          ) : (
            <div>
              <HousesTable
                houses={houses}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          )}
        </Box>
      </Container>
    </Navbar>
  );
}

export default HousesPage;
