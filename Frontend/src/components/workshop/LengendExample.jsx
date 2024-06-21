import React from 'react'
import './styles/legendExample.css'

const LengendExample = () => {
  return (
    <div className='legend-example'>
      <div className='legend'>Legend</div>
      <div className='example'>Example</div>
      <div className='legend-card'>
        <p className='bay-card card-bayName'>Bay #</p>
        <p className='bay-card card-onlineDate'>Online Date</p>
        <p className='bay-card card-npl'>NPL #</p>
        <p className='bay-card card-modelNumber'>Model #</p>
        <p className='bay-card card-customer'>Client Name</p>
        <p className='bay-card card-size'>Square Ft.</p>
      </div>

      <div className='example-card'>
        <p className='bay-card card-bayName'>10</p>
        <p className='bay-card card-onlineDate'>18-Jan-24</p>
        <p className='bay-card card-npl'>1453</p>
        <p className='bay-card card-modelNumber'>023-002</p>
        <p className='bay-card card-customer'>Conklin</p>
        <p className='bay-card card-size'>999</p>
      </div>
      <div className='color-legend'>
        House Card Color Status 
        <div className='white-status'>White: Not Started </div>
        <div className='red-status'>Red: In Progress </div>
        <div className='yellow-status'>Yellow: QA Reqiured</div>
        <div className='white-status'>Green: 'Completed</div>
      </div>
    </div>
  )
}

export default LengendExample
