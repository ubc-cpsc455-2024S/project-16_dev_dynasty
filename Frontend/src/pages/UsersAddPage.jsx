import React from 'react'
import Navbar from '../components/headers/Header1'
import Header1 from '../components/navigation/Navbar'
import { TextField, Button, Box, Typography } from '@mui/material'

const UsersAddPage = () => {
  const handleSubmit = e => {
    e.preventDefault()
    const user_id = e.target.user_id.value
    const first_name = e.target.first_name.value
    const last_name = e.target.last_name.value
    const password = e.target.password.value
    const email = e.target.email.value
    // const permission = e.target.permission.value
    console.log(
      'Form submitted',
      user_id,
      first_name,
      last_name,
      password,
      email
    )
  }

  return (
    <Navbar>
      <Header1 title={'Add Customer'}>
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Typography sx={{ pt: '50px' }} variant='label'>
              Fill the form below to add a new user
            </Typography>
            <TextField name={'first_name'} label={'first_name'} />
            <TextField name={'last_name'} label={'last_name'} />
            <TextField name={'email'} label={'email'} />
            <TextField name={'password'} label={'password'} />
            {/* <TextField name={'permission'} label={'permission'} /> */}
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
