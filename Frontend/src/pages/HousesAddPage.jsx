import React from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addHouseAsync } from '../redux/houses/thunksHouses.js'

const HousesAddPage = () => {
  const initialState = {
    npl: '',
    customer_name: '',
    house_model: '',
    square_ft: '',
  }

  const [formFields, setFormFields] = useState(initialState)

  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addHouseAsync(formFields))
    clearFormFields()
  }

  const clearFormFields = () => {
    setFormFields(initialState)
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
              name={'customer_name'}
              label={'Customer name'}
              value={formFields.customer_name}
              onChange={handleChange}
            />
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
