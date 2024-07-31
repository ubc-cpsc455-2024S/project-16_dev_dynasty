import React from 'react'
import Header1 from '../components/headers/Header1'
import Navbar from '../components/navigation/Navbar'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addCustomerAsync } from '../redux/customers/thunksCustomers.js'
import { useNavigate } from 'react-router-dom'

const CustomersAddPage = () => {
  const navigate = useNavigate()
  const initialState = {
    customer_name: '',
    customer_email: '',
  }

  const [formFields, setFormFields] = useState(initialState)

  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addCustomerAsync(formFields))
    navigate(-1)
  }

  return (
    <Navbar>
      <Header1 title={'Add Customer'}>
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Typography sx={{ pt: '50px' }} variant='label'>
              Fill in the form below to add a new customer
            </Typography>
            <TextField
              name={'customer_name'}
              label={'Customer Name'}
              value={formFields.customer_name}
              onChange={handleChange}
            />
            <TextField
              name={'customer_email'}
              label={'Email'}
              type={'email'}
              value={formFields.customer_email}
              onChange={handleChange}
            />
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
