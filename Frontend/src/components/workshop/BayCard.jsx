import React from 'react'
import './styles/bayCard.css'
import HouseCard from './HouseCard'

export default function BayCard({bay, houses}) {
  const bayIdQuery = bay.bay_id;
  const theHouse = houses.find((house) => String(house.bay_id) === bayIdQuery || null);

  return (
    <>
      <p className='bay-card card-bayName'>{bayIdQuery}</p>
      {theHouse && (
        <HouseCard house = {theHouse}></HouseCard>
      )}
    </>
  )
}
