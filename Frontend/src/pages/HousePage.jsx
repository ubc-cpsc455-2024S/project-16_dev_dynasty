import React, { useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Link,
  Tabs,
  Tab,
} from '@mui/material';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHouseAsync, updateHouseAsync } from '../redux/houses/thunksHouses';
import { houseStatusEnum } from '../constants/contants';
import SelectCustom from '../components/inputs/SelectCustom';
import { getAllBaysAsync } from '../redux/bays/thunksBays';

const HousePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const houseInfo = useSelector((state) => state.houses.findHouse || null);
  const bays = useSelector((state) => state.bays.list || []);

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

  const houseStatusOptions = Object.keys(houseStatusEnum).map((key) => ({
    value: key,
    label: houseStatusEnum[key],
  }));

  const bayOptions = bays.map(({ bay_id }) => ({
    value: bay_id,
    label: bay_id,
  }));

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

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
            </Box>
          }
        />
        <Box mt={3}>
          <Tabs
            value={location.pathname}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Details" value={`/houses/${id}/details`} />
            <Tab label="Defects" value={`/houses/${id}/defects`} />
            <Tab label="Documents" value={`/houses/${id}/documents`} />
            <Tab label="Checklist" value={`/houses/${id}/checklist`} />
          </Tabs>
          <Box mt={3}>
            <Outlet context={{ houseInfo }} />
          </Box>
        </Box>
      </Container>
    </Navbar>
  );
};

export default HousePage;
