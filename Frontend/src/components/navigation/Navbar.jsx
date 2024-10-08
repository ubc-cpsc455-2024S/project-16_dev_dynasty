import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import CompanyLogo from '../../assets/logo.png'
import { toggleSidebar } from '../../redux/sidebar/sidebarSlice'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../router/routes'
import { useSelector, useDispatch } from 'react-redux'
import { userLogoutAsync } from '../../redux/auth/thunkAuth'
import { BsFillPersonFill } from 'react-icons/bs'

const Navbar = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSignedIn = useSelector(state => state.auth.isSignedIn || false)
  const user = useSelector(state => state.auth.user || null)

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
          <IconButton onClick={() => navigate(routes.workshopRoute)}>
            <img
              src={CompanyLogo}
              alt='Company Logo'
              style={{ height: '40px', marginRight: '20px' }}
            />
          </IconButton>

          <Typography variant='h6' style={{ flexGrow: 1 }}></Typography>

          {isSignedIn ? (
            <>
              <BsFillPersonFill size={'20px'} />
              <Typography variant='body1' sx={{ ml: '10px', mr: '30px' }}>
                {user.name}
              </Typography>
              <Button
                color='inherit'
                onClick={() => {
                  dispatch(userLogoutAsync())
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button color='inherit' onClick={() => navigate(routes.loginRoute)}>
              Log In
            </Button>
          )}
        </Toolbar>
        <Sidebar />
      </AppBar>
      <Paper
        sx={{
          borderRadius: 0,
          minHeight: '100vh',
          minWidth: 1050,
        }}
      >
        {children}
      </Paper>
    </>
  )
}

export default Navbar
