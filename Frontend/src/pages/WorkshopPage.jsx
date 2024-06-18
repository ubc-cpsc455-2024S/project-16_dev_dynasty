import React, { useEffect } from 'react';
import {store} from '../redux/store';
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import { Button } from '@mui/material';
import Productionline from '../components/workshop/Productionline';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBaysAsync, getBayAsync } from '../redux/bays/thunksBays';
import {
  getAllHousesAsync,
  getHouseAsync,
  getHousesInbayAsync,
  addHouseAsync,
  deleteHouseAsync,
  updateHouseAsync,
  bayToHouseAsync,
} from '../redux/houses/thunksHouses';

const WorkshopPage = () => {
  // const dispatch = useDispatch();
  // const bays = useSelector(state => state.bays.list);
  // const bayfound = useSelector((state) => state.bays.findBay || null);
  // const houses = useSelector((state) => state.houses.list || []);
  // const housefound = useSelector((state) => state.houses.findHouse || null);
  // const housesInBay = useSelector((state) => state.houses.inbayList || []);

  // useEffect(() => {
  //   const newhouse =  {
  //     "npl": "1918",
  //     "customer_id": 4,
  //     "customer_name": "Dene Tha'",
  //     "online_date": "18-Jan-24 ",
  //     "created_on": "17-Jan-24",
  //     "house_model": "026-035",
  //     "square_ft": 1482,
  //     "bay_id": null,
  //     "bay_name": null,
  //     "bay_description": null,
  //     "house_records_id": "string"
  //   }
  //   const payload = {
  //     houseId: 14,
  //     bayId: 7
  //   }
  //   dispatch(getAllHousesAsync());
  // },[])

  // const log = () =>{
  //   console.log(houses);
  // }

  return (
    <Navbar>
      <Header1 title={'Workshop Page'}>
      {/* <button onClick={log}>log</button> */}
        <Productionline />
        
      </Header1>
    </Navbar>
  )
}

export default WorkshopPage
