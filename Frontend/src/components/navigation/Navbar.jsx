import React from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CompanyLogo from '../../assets/logo.png'
import { toggleSidebar } from '../../redux/sidebar/sidebarSlice'
import Sidebar from './Sidebar'

const Navbar = ({ children }) => {
  const dispatch = useDispatch()

  const handleMenuClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <>
      <AppBar position='static' style={{ background: 'white', color: 'black' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={CompanyLogo}
            alt='Company Logo'
            style={{ height: '40px', marginRight: '20px' }}
          />
          <Typography variant='h6' style={{ flexGrow: 1 }}></Typography>
        </Toolbar>
        <Sidebar />
      </AppBar>
      {children}
    </>
  )
}

export default Navbar
