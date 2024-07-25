import React from 'react'
import { useDispatch } from 'react-redux'
import { AppBar, Toolbar, Typography, IconButton, Paper } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CompanyLogo from '../../assets/logo.png'
import { toggleSidebar } from '../../redux/sidebar/sidebarSlice'
import Sidebar from './Sidebar'
import { colors } from '../../styles/colors'

const Navbar = ({ children }) => {
  const dispatch = useDispatch()

  const handleMenuClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <>
      <AppBar position='static' sx={{ minWidth: 1050 }}>
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
      <Paper
        sx={{
          borderRadius: 0,
          minHeight: '100vh',
          minWidth: 1050,
          zIndex: -5,
        }}
      >
        {children}
      </Paper>
    </>
  )
}

export default Navbar
