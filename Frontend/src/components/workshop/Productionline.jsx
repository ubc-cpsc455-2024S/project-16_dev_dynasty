import React, { useEffect } from 'react'
import BayCard from './BayCard.jsx'
import Walls from './Walls.jsx'
import Doors from './Doors.jsx'
import LengendExample from './LengendExample.jsx'
import './styles/productionlineVnew.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBaysAsync } from '../../redux/bays/thunksBays'
import { getHousesInbayAsync } from '../../redux/houses/thunksHouses'

const Productionline = () => {
  const dispatch = useDispatch()
  const bayArray = useSelector(state => state.bays.list || [])
  const allInBayHouses = useSelector(state => state.houses.inbayList || [])

  useEffect(() => {
    dispatch(getAllBaysAsync())
    dispatch(getHousesInbayAsync())
  }, [dispatch])

  return (
    <div>
      <div className='layout-label'>Production Line Status</div>
      <div className='production-line-layout'>
        <div className='production-line-grid'>
          {bayArray.map(bay => {
            return (
              <div className={`grid-item bay-${bay.bay_id}`} key={bay.bay_id}>
                <BayCard bay={bay} houses={allInBayHouses}></BayCard>
              </div>
            )
          })}
          <LengendExample></LengendExample>
          <Walls></Walls>
          <Doors></Doors>
        </div>
      </div>
    </div>
  )
}

export default Productionline
