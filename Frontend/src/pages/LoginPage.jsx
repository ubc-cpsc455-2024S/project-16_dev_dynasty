import React, { useState } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import {
  FormLabel,
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Paper,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { routes } from '../router/routes'
import { useSelector, useDispatch } from 'react-redux'
import { userLoginAsync, userLogoutAsync } from '../redux/auth/thunkAuth'
import CompanyLogo from '../assets/logo.png'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSignedIn = useSelector(state => state.auth.isSignedIn || false)
  const user = useSelector(state => state.auth.user || null)

  const handleSubmit = async e => {
    e.preventDefault()
    const name = e.target.name.value
    const password = e.target.password.value
    const logInData = {
      name: name,
      password: password,
    }
    await dispatch(userLoginAsync(logInData))
    navigate(routes.workshopRoute)
  }

  return (
    <Paper
      style={{
        height: '100vh',
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img
          src={CompanyLogo}
          alt='Company Logo'
          style={{ height: '80px', marginRight: '20px' }}
        />
        <br />
        <br />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 5,
            pl: 10,
            pr: 10,
            pb: 12,
            boxShadow: 'rgba(158, 134, 134, 0.24) 0px 3px 8px',
          }}
        >
          <Typography variant='h5'>Login</Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
              <FormLabel>Username</FormLabel>
              <TextField size='small' name={'name'} />
              <FormLabel>Password</FormLabel>
              <TextField size='small' name={'password'} />
              <Button variant='contained' type='submit'>
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    </Paper>
  )
}

export default LoginPage
