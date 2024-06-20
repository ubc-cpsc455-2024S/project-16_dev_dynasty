import React, { useEffect } from 'react'
import BayCard from './BayCard.jsx'
import './styles/productionlineVnew.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBaysAsync } from '../../redux/bays/thunksBays'
import { getHousesInbayAsync } from '../../redux/houses/thunksHouses'

const Productionline = () => {
  const dispatch = useDispatch();
  const bayArray = useSelector(state => state.bays.list || []);
  const allInBayHouses = useSelector(state => state.houses.inbayList || []);

  useEffect(() => {
    dispatch(getAllBaysAsync());
    dispatch(getHousesInbayAsync());
  }, [dispatch])



  return (
    <div>
      <div className='layout-label'>Production Line Status</div>
      <div className='production-line-layout'>
        <div className='production-line-grid'>
          {bayArray.map(bay => {
            return (
              <div className={`grid-item bay-${bay.bay_id}`} key={bay.bay_id}>
                <BayCard bay={bay} houses = {allInBayHouses} ></BayCard>
              </div>
            )
          })}

          <div className='topwall'></div>
          <div className='botwall'></div>
          <div className='rightwall1'></div>
          <div className='rightwall2'></div>
          <div className='leftwall1'></div>
          <div className='leftwall2'></div>
          <div className='middlewall1'></div>
          <div className='middlewall2'></div>

          <div className='door1 vdoor'>DOOR 1</div>
          <div className='door2'>DOOR 2</div>
          <div className='door3'>DOOR 3</div>
          <div className='door4'>DOOR 4</div>
          <div className='door5 vdoor'>DOOR 5</div>
          <div className='door12 vdoor'>DOOR 12</div>
          <div className='door14'>DOOR 14</div>
          <div className='door14a'>DOOR</div>
          <div className='door14b'>DOOR</div>
        </div>
      </div>
    </div>
  )
}

export default Productionline
