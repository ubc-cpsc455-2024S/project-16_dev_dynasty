import React, { useEffect } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addHouseAsync } from '../redux/houses/thunksHouses.js'
import { getCustomersAsync } from '../redux/customers/thunksCustomers.js'
import { useNavigate } from 'react-router-dom'

const HousesAddPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialState = {
    npl: '',
    customer_id: '',
    house_model: '',
    square_ft: '',
  }
  const [formFields, setFormFields] = useState(initialState)

  const customers = useSelector(state => state.customers.list)

  useEffect(() => {
    dispatch(getCustomersAsync())
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addHouseAsync(formFields))
    // clearFormFields()
    navigate(-1)
  }

  return (
    <Navbar>
      <Header1 title={'Add House'}>
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Typography sx={{ pt: '50px' }} variant='label'>
              Fill in the form below to add a new house
            </Typography>
            <TextField
              name={'npl'}
              label={'Project #'}
              type={'number'}
              value={formFields.npl}
              onChange={handleChange}
            />
            <TextField
              select={true}
              name={'customer_id'}
              label={'Customer Name'}
              value={formFields.customer_id}
              onChange={handleChange}
            >
              {customers.map(customer => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.customer_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name={'house_model'}
              label={'Model #'}
              value={formFields.house_model}
              onChange={handleChange}
            />
            <TextField
              name={'square_ft'}
              label={
                <span>
                  Floor area (ft<sup>2</sup>)
                </span>
              }
              type={'number'}
              value={formFields.square_ft}
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

export default HousesAddPage
