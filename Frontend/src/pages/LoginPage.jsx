import React, { useState } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { Button, TextField, Container, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { routes } from '../router/routes'
import { useSelector, useDispatch } from 'react-redux'
import { userLoginAsync, userLogoutAsync } from '../redux/auth/thunkAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSignedIn = useSelector(state => state.auth.isSignedIn || false)
  const user = useSelector(state => state.auth.user || null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const password = e.target.password.value   
    const logInData = {
      name: name,
      password: password
    } 
    await dispatch(userLoginAsync(logInData));
    navigate(-1);
  }

  return (
    <Navbar>
      <Header1 title={'Login Page'}>
        <Container maxWidth='sm'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 8,
            }}
          >
            <Typography variant='h4' gutterBottom>
              Log In
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                
                <TextField name={'name'} label={'name'} />
                
                <TextField name={'password'} label={'password'} />
                
                <Button variant='contained' type='submit'>
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Header1>
    </Navbar>
  )
}

export default LoginPage
