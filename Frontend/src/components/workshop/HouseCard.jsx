import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { NavLink, useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

const HouseCard = ({ house }) => {
  const navigate = useNavigate()
  const houseId = house._id
  const houseStatus = house.status
  const bayId = parseInt(house.bay_id)
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: houseId,
      data: {
        status: houseStatus,
        oldBay: bayId,
      },
      disabled: houseStatus !== 4,
    })

  const style = {
    transform: CSS.Translate.toString(transform),
    // zIndex: isDragging ? '10 !important' : 3,
    border: isDragging ? '1px solid #726b6b' : '',
    cursor: houseStatus === 4 ? 'grab' : 'not-allowed',
  }

  return (
    <div
      className={`house-card status${house.status}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Typography className='bay-card-text card-onlineDate'>
        {house.online_date}
      </Typography>
      <NavLink to={`/houses/${houseId}`} className='bay-card-text card-npl'>
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
