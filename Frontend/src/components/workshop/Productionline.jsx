import React, { ReactNode } from 'react'

const Productionline = ({ children }) => {
  return (
    <div>
      <div style={{ width: '100%', background: 'brown' }}>Production Line</div>
      <div>{children}</div>
    </div>
  )
}

export default Productionline