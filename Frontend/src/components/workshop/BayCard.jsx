import React from 'react'
import './styles/bayCard.css'
import HouseCard from './HouseCard'
import { useDroppable } from '@dnd-kit/core'
import { MdEdit } from 'react-icons/md'
import { Button } from '@mui/material'
import { MdInfoOutline } from 'react-icons/md'
import { ButtonPointerWrapper } from '../buttons/ButtonPointerWrapper'
export default function BayCard({
  bay,
  houses,
  handleOpenEditHouseStatusDialog,
}) {
  const bayIdQuery = bay.bay_id
  const theHouse = houses.find(
    house => String(house.bay_id) === bayIdQuery || null
  )

  const { setNodeRef } = useDroppable({
    id: bayIdQuery,
  })

  return (
    <div className={`grid-card-items bay-${bayIdQuery}`} ref={setNodeRef}>
      <div className='bay-card card-bayName'>
        <div>{bay.bay_id}</div>
        {theHouse?.bay_id && String(theHouse.bay_id) === bayIdQuery && (
          <ButtonPointerWrapper>
            <MdEdit
              fontSize={14}
              onClick={() => handleOpenEditHouseStatusDialog(theHouse)}
            />
          </ButtonPointerWrapper>
        )}
      </div>
      {theHouse && <HouseCard house={theHouse} key={theHouse._id} />}
    </div>
  )
}
