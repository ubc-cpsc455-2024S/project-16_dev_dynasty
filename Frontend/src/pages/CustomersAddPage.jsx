import React from 'react'
import Navbar from '../components/headers/Header1'
import Header1 from '../components/navigation/Navbar'
import { TextField, Button, Box, Typography } from '@mui/material'

const CustomersAddPage = () => {
  const handleSubmit = e => {
    e.preventDefault()
    const customer_name = e.target.customer_name.value
    const email = e.target.email.value
    console.log('Form submitted', customer_name, email)
  }

  return (
    <Navbar>
      <Header1 title={'Add Customer'}>
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Typography sx={{ pt: '50px' }} variant='label'>
              Fill the form below to add a new customer
            </Typography>
            <TextField name={'customer_name'} label={'Customer Name'} />
            <TextField name={'email'} label={'Email'} />
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </Box>
        </form>
      </Header1>
    </Navbar>
  )
}

export default CustomersAddPage
