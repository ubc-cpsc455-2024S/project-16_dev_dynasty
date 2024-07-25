import React, { useEffect, useState } from 'react'
import BayCard from './BayCard.jsx'
import Walls from './Walls.jsx'
import Doors from './Doors.jsx'
import LengendExample from './LengendExample.jsx'
import './styles/productionlineVnew.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBaysAsync } from '../../redux/bays/thunksBays'
import {
  getHousesInbayAsync,
  bayToHouseAsync,
} from '../../redux/houses/thunksHouses'
import { DndContext, useSensor, useSensors, MouseSensor } from '@dnd-kit/core'
import BayCardEditDialog from './BayCardEditDialog.jsx'
import { houseStatusEnum } from '../../constants/contants.js'

const Productionline = () => {
  const dispatch = useDispatch()
  const bayArray = useSelector(state => state.bays.list || [])
  const allInBayHouses = useSelector(state => state.houses.inBayList || [])
  const [editHouseStatusDialog, setEditHouseStatusDialog] = useState({
    houseInfo: null,
    isOpen: false,
  })

  const lastUpdated = new Date().toLocaleString()

  useEffect(() => {
    dispatch(getAllBaysAsync())
    dispatch(getHousesInbayAsync())
  }, [])

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  })

  const sensors = useSensors(mouseSensor)

  const handleDragEnd = event => {
    const { active, over } = event
    console.log(over)
    console.log(active)
    const houseStatus = active.data.current.status
    console.log(houseStatus)

    if (houseStatus !== 4) {
      alert('house not ready to be moved to the next bay')
      return
    }
    if (houseStatus === 0) {
      alert('cancelled house, should be out of bay')
      return
    }

    const houseId = active.id
    console.log('houseid: ', houseId)
    const newBayId = parseFloat(over.id)
    console.log('bayid: ', newBayId)
    const oldBay = active.data.current.oldBay
    if (oldBay === newBayId) {
      return
    }
    dispatch(bayToHouseAsync({ houseId: houseId, bayId: newBayId }))
  }

  const handleOpenEditHouseStatusDialog = houseInfo => {
    console.log('house info opne', houseInfo)
    setEditHouseStatusDialog({ houseInfo, isOpen: true })
  }

  const handleCloseEditHouseStatusDialog = houseInfo => {
    setEditHouseStatusDialog({ houseInfo: null, isOpen: false })
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className='production-line-grid'>
          {bayArray.map(bay => {
            return (
              <BayCard
                bay={bay}
                houses={allInBayHouses}
                key={bay.bay_id}
                handleOpenEditHouseStatusDialog={
                  handleOpenEditHouseStatusDialog
                }
              />
            )
          })}
          <LengendExample />
          <Walls />
          <Doors />
        </div>
        {editHouseStatusDialog.isOpen && (
          <BayCardEditDialog
            isOpen={editHouseStatusDialog.isOpen}
            handleClose={handleCloseEditHouseStatusDialog}
            houseInfo={editHouseStatusDialog.houseInfo}
          />
        )}
      </DndContext>
    </>
  )
}

export default Productionline
