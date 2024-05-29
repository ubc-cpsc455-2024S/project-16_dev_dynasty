import React, { ReactNode } from 'react'

const Navbar = ({ children }) => {
  return (
    <div>
      <div style={{ width: '100%', background: 'brown' }}>Navigation Part</div>
      <div>{children}</div>
    </div>
  )
}

export default Navbar
