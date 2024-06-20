import React from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const HousesAddPage = () => {
  const [formFields, setFormFields] = useState({
    project: '',
    customer: '',
    model: '',
    area: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
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
              name={'project'}
              label={'Project #'}
              type={'number'}
              value={formFields.project}
              onChange={handleChange}
            />
            <TextField
              name={'customer'}
              label={'Customer name'}
              value={formFields.customer}
              onChange={handleChange}
            />
            <TextField
              name={'model'}
              label={'Model #'}
              value={formFields.model}
              onChange={handleChange}
            />
            <TextField
              name={'area'}
              label={
                <span>
                  Floor area (ft<sup>2</sup>)
                </span>
              }
              type={'number'}
              value={formFields.area}
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
