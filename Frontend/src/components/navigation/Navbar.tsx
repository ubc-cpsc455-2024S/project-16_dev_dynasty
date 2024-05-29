import React, { ReactNode } from 'react'

interface NavbarProps {
  children: ReactNode | ReactNode[]
}

const Navbar = ({ children }: NavbarProps) => {
  return (
    <div>
      <div style={{ width: '100%', background: 'brown' }}>Navigation Part</div>
      <div>{children}</div>
    </div>
  )
}

export default Navbar
