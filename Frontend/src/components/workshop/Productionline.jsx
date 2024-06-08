import React, { ReactNode } from 'react'
import { Box, Container, Typography } from '@mui/material'
import BayCard from './BayCard.jsx'
import bayData from '../../data/bayData.js'
// import './productionline.css'
import './productionlineVnew.css'

const Productionline = ({ children }) => {
  const bayArray = bayData
  return (
    <div>
      <div className='layout-lable'
        style={{ width: '100%', background: '#ffa726', textAlign: 'center' }}
      >
        Production Line Status
      </div>

      <div className='production-line-layout'>
        <div className='grid-container'>
          {bayArray.map(bay => {
            return (
              <div className={`grid-item bay-${bay.bayName}`} key={bay.bayName}>
                <BayCard bay={bay}></BayCard>
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
