import React from 'react'
import Navbar from '../components/navigation/Navbar.jsx'
import Header1 from '../components/headers/Header1'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const UsersAddPage = () => {
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault()
    const name = e.target.name.value
    const confirmPassword = e.target.confirmPassword.value
    const password = e.target.password.value
    const email = e.target.email.value
    const role = e.target.role.value


    const userSignupForm = {
      name: name,
      email: email,
      password: password,
      confirmPassword:confirmPassword,
      role: role
    }
    
    console.log(
      'Form submitted',
      userSignupForm
    )
    navigate(-1);
  }

  return (
    <Navbar>
      <Header1 title={'Add User'}>
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Typography sx={{ pt: '50px' }} variant='label'>
              Fill the form below to add a new user
            </Typography>
            <TextField name={'name'} label={'name'} />
            <TextField name={'email'} label={'email'} />
            <TextField name={'password'} label={'password'} />
            <TextField name={'confirmPassword'} label={'confirmPassword'} />
            <TextField name={'role'} label={'role'} />
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </Box>
        </form>
      </Header1>
    </Navbar>
  )
}

export default UsersAddPage
