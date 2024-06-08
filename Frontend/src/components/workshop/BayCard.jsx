import React from 'react'
import './bayCard.css'

export default function BayCard(props) {
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const month = monthNames[date.getMonth()]
    const year = String(date.getFullYear()).slice(-2) // Get last two digits of the year
    return `${day}-${month}-${year}`
  }

  return (
    <>
      <p className='bay-card card-bayName'>{props.bay.bayName}</p>
      {props.bay.bayStatus === 'active' && (
        <>
          <p className='bay-card card-onlineDate'>
            {formatDate(props.bay.onlineDate)}
          </p>
          <p className='bay-card card-npl'>{props.bay.npl}</p>
          <p className='bay-card card-modelNumber'>{props.bay.modelNumber}</p>
          <p className='bay-card card-customer'>{props.bay.customer}</p>
          <p className='bay-card card-size'>{props.bay.size}</p>
        </>
      )}
    </>
  )
}
