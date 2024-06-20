import React, { useEffect } from 'react'
import './styles/bayCard.css'
import HouseCard from './HouseCard'
import { useSelector, useDispatch } from 'react-redux'
import {getHouseInAbayAsync} from '../../redux/houses/thunksHouses';

export default function BayCard({bay}) {
  const bayIdQuery = bay.bay_id;
  const dispatch = useDispatch();
  const bayHouseMap = useSelector((state) => state.houses.bayHouseMap || {});

  useEffect (() =>{
    dispatch(getHouseInAbayAsync(bayIdQuery));
  }, [dispatch, bayIdQuery])


  return (
    <>
      <p className='bay-card card-bayName'>{bayIdQuery}</p>
      {bayHouseMap[bayIdQuery] && (
        <HouseCard house = {bayHouseMap[bayIdQuery]}></HouseCard>
      )}
    </>
  )
}
