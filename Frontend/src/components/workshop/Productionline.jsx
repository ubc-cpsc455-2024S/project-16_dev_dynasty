import React, { useEffect } from 'react'
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

const Productionline = () => {
  const dispatch = useDispatch()
  const bayArray = useSelector(state => state.bays.list || [])
  const allInBayHouses = useSelector(state => state.houses.inBayList || [])

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

  return (
    <div>
      <div className='layout-label'>
        Production Line last update on {lastUpdated}
      </div>
      {/* <button onClick={log}>log</button>
      <button onClick={send}>send</button> */}
      <div className='production-line-layout'>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <div className='production-line-grid'>
            {bayArray.map(bay => {
              return (
                <BayCard
                  bay={bay}
                  houses={allInBayHouses}
                  key={bay.bay_id}
                ></BayCard>
              )
            })}
            <LengendExample></LengendExample>
            <Walls></Walls>
            <Doors></Doors>
          </div>
        </DndContext>
      </div>
    </div>
  )
}

export default Productionline
