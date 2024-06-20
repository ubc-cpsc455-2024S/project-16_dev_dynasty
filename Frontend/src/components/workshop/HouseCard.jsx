import React from 'react'

const HouseCard = ({ house }) => {
  return (
    <div className='house-card'>
      <p className='bay-card card-onlineDate'>{house.online_date}</p>
      <p className='bay-card card-npl'>{house.npl}</p>
      <p className='bay-card card-modelNumber'>{house.house_model}</p>
      <p className='bay-card card-customer'>{house.customer_name}</p>
      <p className='bay-card card-size'>{house.square_ft}</p>
    </div>
  )
}

export default HouseCard
