import React, { useEffect } from 'react'
import './styles/bayCard.css'
import HouseCard from './HouseCard'
import { useSelector, useDispatch } from 'react-redux'
import {getHouseInAbayAsync} from '../../redux/houses/thunksHouses';

export default function BayCard({bay, houses}) {
  const bayIdQuery = bay.bay_id;
  // const dispatch = useDispatch();
  // const bayHouseMap = useSelector((state) => state.houses.bayHouseMap || {});
  // const allInBayHouses = useSelector(state => state.houses.inbayList || []);
  const theHouse = houses.find((house) => house.bay_id === parseFloat(bayIdQuery) || null);

  // useEffect (() =>{
  //   dispatch(getHouseInAbayAsync(bayIdQuery));
  // }, [dispatch, bayIdQuery])


  return (
    <>
      <p className='bay-card card-bayName'>{bayIdQuery}</p>
      {theHouse && (
        <HouseCard house = {theHouse}></HouseCard>
      )}
    </>
  )
}
