import React, { useEffect, useRef } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addHouseAsync } from '../redux/houses/thunksHouses.js'
import { getCustomersAsync } from '../redux/customers/thunksCustomers.js'
import { useNavigate } from 'react-router-dom'
import { putChecklistAsync } from '../redux/checklists/thunksChecklists.js'
import { toast } from 'react-toastify'

const HousesAddPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValueState = {
    npl: '',
    customer_id: '',
    house_model: '',
    square_ft: '',
  }
  const initialErrorState = {
    npl: false,
    customer_id: false,
    house_model: false,
    square_ft: false,
  }

  const fieldRefs = {
    npl: useRef(null),
    house_model: useRef(null),
    square_ft: useRef(null),
  }

  const [formFields, setFormFields] = useState(initialValueState)
  const [formErrors, setFormErrors] = useState(initialErrorState)

  const customers = useSelector(state => state.customers.list)

  useEffect(() => {
    dispatch(getCustomersAsync())
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    let isError
    setFormFields({ ...formFields, [name]: value.trim() })
    if (name === 'customer_id') {
      value ? (isError = false) : (isError = true)
    } else {
      e.target.validity.valid ? (isError = false) : (isError = true)
    }
    setFormErrors({ ...formErrors, [name]: isError })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isFormValid()) {
      toast.success('Form is valid! Submitting the form...')
      const result = await dispatch(addHouseAsync(formFields)).unwrap()
      await dispatch(putChecklistAsync({ houseId: result._id }))
      navigate(-1)
    } else {
      toast.error('Form is invalid! Please check the fields...')
    }
  }

  const isFormValid = () => {
    let newErrors = {}

    Object.keys(fieldRefs).forEach(key => {
      const ref = fieldRefs[key].current
      if (!ref.validity.valid) {
        newErrors[ref.name] = true
      }
    })

    if (!formFields.customer_id) {
      newErrors.customer_id = true
    }
    setFormErrors({ ...formErrors, ...newErrors })

    return Object.keys(newErrors).length === 0
  }

  return (
    <Navbar>
      <Header1 title={'Add House'}>
        <form onSubmit={handleSubmit} noValidate>
          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={'10px'}
            sx={{ mt: '10px' }}
          >
            {/*<Typography sx={{ pt: '50px' }} variant='label'>*/}
            {/*  Fill in the form below to add a new house*/}
            {/*</Typography>*/}
            <TextField
              required
              inputRef={fieldRefs.npl}
              name={'npl'}
              label={'NPL #'}
              type={'number'}
              value={formFields.npl}
              error={formErrors.npl}
              onChange={handleChange}
              helperText={formErrors.npl ? 'NPL # is a required field' : ''}
            />
            <TextField
              required
              select
              name={'customer_id'}
              label={'Customer Name'}
              value={formFields.customer_id}
              error={formErrors.customer_id}
              onChange={handleChange}
              helperText={
                formErrors.customer_id
                  ? 'Customer Name is a required field'
                  : ''
              }
            >
              {customers.map(customer => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.customer_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              inputRef={fieldRefs.house_model}
              name={'house_model'}
              label={'Model #'}
              value={formFields.house_model}
              error={formErrors.house_model}
              onChange={handleChange}
              helperText={
                formErrors.house_model ? 'Model # is a required field' : ''
              }
            />
            <TextField
              required
              inputRef={fieldRefs.square_ft}
              name={'square_ft'}
              label={'Floor area (sq ft)'}
              type={'number'}
              value={formFields.square_ft}
              error={formErrors.square_ft}
              onChange={handleChange}
              helperText={
                formErrors.square_ft ? 'Floor area is a required field' : ''
              }
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
