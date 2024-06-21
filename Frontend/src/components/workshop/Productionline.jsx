import React, { useEffect } from 'react'
import BayCard from './BayCard.jsx'
import Walls from './Walls.jsx'
import Doors from './Doors.jsx'
import LengendExample from './LengendExample.jsx'
import './styles/productionlineVnew.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBaysAsync } from '../../redux/bays/thunksBays'
import { getHousesInbayAsync, bayToHouseAsync } from '../../redux/houses/thunksHouses'
import { DndContext } from '@dnd-kit/core'

const Productionline = () => {
  const dispatch = useDispatch()
  const bayArray = useSelector(state => state.bays.list || [])
  const allInBayHouses = useSelector(state => state.houses.inBayList || [])

  useEffect(() => {
    dispatch(getAllBaysAsync())
    dispatch(getHousesInbayAsync())
  }, [])

  const handleDragEnd = (event) => {
    const {active, over} = event;
    console.log(over);
    console.log(active);
    const houseId = parseInt(active.id);
    const newBayId = parseInt(over.id);
    dispatch(bayToHouseAsync({houseId: houseId, bayId: newBayId}));
  }

  const log = () =>{
    console.log(allInBayHouses);
  }

  const send = () =>{
    dispatch(bayToHouseAsync({houseId: 1, bayId: 6}));
  }

  return (
    <div>
      <div className='layout-label'>Production Line Status</div>
      <button onClick={log}>log</button>
      <button onClick={send}>send</button>
      <div className='production-line-layout'>
        <DndContext onDragEnd={handleDragEnd}>
          <div className='production-line-grid'>
            {bayArray.map(bay => {
              return (
                  <BayCard bay={bay} houses={allInBayHouses} key={bay.bay_id}></BayCard>
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
