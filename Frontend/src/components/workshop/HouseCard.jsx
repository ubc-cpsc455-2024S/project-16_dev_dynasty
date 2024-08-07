import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

const HouseCard = ({ house }) => {
  const navigate = useNavigate()
  const houseId = house._id
  const houseStatus = house.status
  const bayId = parseInt(house.bay_id)

  return (
    <div className={`house-card status${house.status}`}>
      <Typography className='bay-card-text card-onlineDate'>
        {house.online_date}
      </Typography>
      <NavLink to={'/houses/' + houseId} className='bay-card-text card-npl'>
        {house.npl}
      </NavLink>
      <Typography className='bay-card-text card-modelNumber'>
        {house.house_model}{' '}
      </Typography>
      <Typography className='bay-card-text card-customer'>
        {house.customer_name}
      </Typography>
      <Typography className='bay-card-text card-size'>
        {house.square_ft}
      </Typography>
    </div>
  )
}

export default HouseCard
