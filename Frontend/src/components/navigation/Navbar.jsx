import React from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import CompanyLogo from '../../assets/logo.png'
import { toggleSidebar } from '../../redux/sidebar/sidebarSlice'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../router/routes'

const Navbar = ({ children }) => {
  const navigate = useNavigate()
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
          <IconButton onClick={() => navigate(routes.workshopRoute)}>
          <img
            src={CompanyLogo}
            alt='Company Logo'
            style={{ height: '40px', marginRight: '20px' }}
          />
          </IconButton>
          
          <Typography variant='h6' style={{ flexGrow: 1 }}></Typography>


          <Button
            color='inherit'
            onClick={() => navigate(routes.loginRoute)}
          >
            Log In
          </Button>
        </Toolbar>
        <Sidebar />
      </AppBar>
      {children}
    </>
  )
}

export default Navbar
