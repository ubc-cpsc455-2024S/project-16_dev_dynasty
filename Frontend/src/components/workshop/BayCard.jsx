import React from 'react'
import './styles/bayCard.css'
import HouseCard from './HouseCard'
import {useDroppable} from '@dnd-kit/core';

export default function BayCard({bay, houses}) {
  const bayIdQuery = bay.bay_id;
  const theHouse = houses.find((house) => String(house.bay_id) === bayIdQuery || null);

  const {setNodeRef} = useDroppable({
    id: bayIdQuery,
  });
  

  return (
    <div className='bay-card-div' ref={setNodeRef}>
      <p className='bay-card card-bayName'>{bayIdQuery}</p>
      {theHouse && (
        <HouseCard house = {theHouse}></HouseCard>
      )}
    </div>
  )
}
