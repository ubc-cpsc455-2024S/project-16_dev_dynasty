import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { NavLink, useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { routes } from '../../router/routes'

const HouseCard = ({ house }) => {
  const navigate = useNavigate()
  const houseId = house._id
  const houseStatus = house.status
  const bayId = parseInt(house.bay_id)

  return (
    <div
      className={`house-card status${house.status}`}
      onClick={() => {
        navigate(`/houses/${houseId}/details`)
      }}
    >
      <Typography className='bay-card-text card-onlineDate'>
        {house.online_date}
      </Typography>
      <NavLink
        to={`${routes.housesRoute} +{houseId}`}
        className='bay-card-text card-npl'
      >
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
