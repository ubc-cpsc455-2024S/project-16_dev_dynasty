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
      <div style={{ width: '100%', background: 'brown' }}>Production Line</div>
      <div>{children}</div>

      <div className='production-line-layout'>
        <div className='grid-container'>
          {/* <div className='grid-item name-date'>Production Line Status  Date</div> */}
          {/* <div className='grid-item bay-20'>
            <div className='bayNum'>Bay20</div>
            <div className='bayCard'></div>
          </div> */}

          {bayArray.map(bay => {
            return (
              <div className={`grid-item bay-${bay.bayName}`} key={bay.bayName}>
                <BayCard bay={bay}></BayCard>
              </div>
            )
          })}

          {/*<div className='grid-item bay-20'>Bay20</div>*/}
          {/*<div className='grid-item bay-19'>Bay19</div>*/}
          {/*<div className='grid-item bay-18'>Bay18</div>*/}
          {/*<div className='grid-item bay-17'>Bay17</div>*/}
          {/*<div className='grid-item bay-16'>Bay16</div>*/}
          {/*<div className='grid-item bay-15'>Bay15</div>*/}
          {/*<div className='grid-item bay-14'>Bay14</div>*/}
          {/*<div className='grid-item bay-13'>Bay13</div>*/}
          {/*<div className='grid-item bay-12'>Bay12</div>*/}
          {/*<div className='grid-item bay-11'>Bay11</div>*/}
          {/*<div className='grid-item bay-10'>Bay10</div>*/}
          {/*<div className='grid-item bay-9'>Bay9</div>*/}
          {/*<div className='grid-item bay-8'>Bay8</div>*/}
          {/*<div className='grid-item bay-7'>Bay7</div>*/}
          {/*<div className='grid-item bay-6'>Bay6</div>*/}
          {/*<div className='grid-item bay-5'>Bay5</div>*/}
          {/*<div className='grid-item bay-4'>Bay4</div>*/}
          {/*<div className='grid-item bay-3'>Bay3</div>*/}
          {/*<div className='grid-item bay-2'>Bay2</div>*/}
          {/*<div className='grid-item bay-1'>*/}
          {/*  <BayCard className='grid-item bay-1' bay={bayData.bay1}></BayCard>*/}
          {/*</div>*/}

          {/*<div className='grid-item bay-20h half-bay'>Bay20.5</div>*/}
          {/*<div className='grid-item bay-19h half-bay'>Bay19.5</div>*/}
          {/*<div className='grid-item bay-18h half-bay'>Bay18.5</div>*/}
          {/*<div className='grid-item bay-17h half-bay'>Bay17.5</div>*/}
          {/*<div className='grid-item bay-16h half-bay'>Bay16.5</div>*/}
          {/*<div className='grid-item bay-15h half-bay'>Bay15.5</div>*/}
          {/*<div className='grid-item bay-14h half-bay'>Bay14.5</div>*/}
          {/*<div className='grid-item bay-8h half-bay'>Bay8.5</div>*/}

          {/*<div className='grid-item bay-13A plus13'>Bay13A</div>*/}
          {/*<div className='grid-item bay-13B plus13'>Bay13B</div>*/}

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
