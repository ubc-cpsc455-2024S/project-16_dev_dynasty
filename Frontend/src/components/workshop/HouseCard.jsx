import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const HouseCard = ({ house }) => {
  const houseId = house.house_id
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: houseId,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }
  return (
    <div
      className={`house-card status${house.status}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <p className='bay-card card-onlineDate'>{house.online_date}</p>
      <p className='bay-card card-npl'>{house.npl}</p>
      <p className='bay-card card-modelNumber'>{house.house_model}</p>
      <p className='bay-card card-customer'>{house.customer_name}</p>
      <p className='bay-card card-size'>{house.square_ft}</p>
    </div>
  )
}

export default HouseCard
