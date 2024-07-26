import React from 'react'
import './styles/bayCard.css'
import HouseCard from './HouseCard'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import { MdEdit } from 'react-icons/md'
import { CSS } from '@dnd-kit/utilities'
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
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({
    id: bayIdQuery,
    data: theHouse,
    disabled: theHouse?.status !== 4,
  })
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: bayIdQuery,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    border: isDragging ? '1px solid #726b6b' : '',
    zIndex: isDragging ? 9999 : 1,
    cursor: theHouse?.status === 4 ? 'grab' : 'not-allowed',
  }
  return (
    <div
      className={`grid-card-items bay-${bayIdQuery}`}
      ref={node => {
        setDraggableNodeRef(node)
        setDroppableNodeRef(node)
      }}
      {...listeners}
      {...attributes}
      style={style}
    >
      <div className='bay-card-text card-bayName'>
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
