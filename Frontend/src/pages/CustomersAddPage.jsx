import React, { useRef } from 'react'
import Header1 from '../components/headers/Header1'
import Navbar from '../components/navigation/Navbar'
import { TextField, Button, Box, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addCustomerAsync } from '../redux/customers/thunksCustomers.js'
import { useNavigate } from 'react-router-dom'
import { regions } from '../constants/contants'
import validator from 'validator'
import { toast } from 'react-toastify'

const CustomersAddPage = () => {
  const navigate = useNavigate()

  const initialValueState = {
    customer_name: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postal: '',
    phone: '',
    customer_email: '',
  }

  const initialErrorState = {
    customer_name: false,
    address1: false,
    address2: false,
    city: false,
    region: false,
    postal: false,
    phone: false,
    customer_email: false,
  }

  const fieldRefs = {
    customer_name: useRef(null),
    address1: useRef(null),
    address2: useRef(null),
    city: useRef(null),
  }

  const [formFields, setFormFields] = useState(initialValueState)
  const [formErrors, setFormErrors] = useState(initialErrorState)

  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    let isError
    setFormFields({ ...formFields, [name]: value.trimStart() })
    if (name === 'region') {
      value ? (isError = false) : (isError = true)
    } else if (name === 'customer_email') {
      validator.isEmail(value) ? (isError = false) : (isError = true)
    } else if (name === 'postal') {
      validator.isPostalCode(value, 'CA') ? (isError = false) : (isError = true)
    } else if (name === 'phone') {
      validator.isMobilePhone(value, ['en-CA', 'en-US'])
        ? (isError = false)
        : (isError = true)
    } else {
      e.target.validity.valid ? (isError = false) : (isError = true)
    }
    setFormErrors({ ...formErrors, [name]: isError })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isFormValid()) {
      toast.success('Customer Added')
      await dispatch(addCustomerAsync(formFields))
      navigate(-1)
    } else {
      toast.error('Unable to Add Customer. Please Try Again')
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

    if (!formFields.region) {
      newErrors.region = true
    }

    if (!validator.isEmail(formFields.customer_email)) {
      newErrors.customer_email = true
    }

    if (!validator.isPostalCode(formFields.postal, 'CA')) {
      newErrors.postal = true
    }

    if (!validator.isMobilePhone(formFields.phone, ['en-CA', 'en-US'])) {
      newErrors.phone = true
    }

    setFormErrors({ ...formErrors, ...newErrors })

    return Object.keys(newErrors).length === 0
  }

  return (
    <Navbar>
      <Header1 title={'Add Customer'}>
        <form onSubmit={handleSubmit} noValidate>
          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={'10px'}
            sx={{ mt: '10px' }}
          >
            <TextField
              required
              inputRef={fieldRefs.customer_name}
              name={'customer_name'}
              label={'Customer Name'}
              value={formFields.customer_name}
              error={formErrors.customer_name}
              onChange={handleChange}
              helperText={
                formErrors.customer_name
                  ? 'Customer Name is a required field'
                  : ''
              }
            />
            <TextField
              required
              inputRef={fieldRefs.address1}
              name={'address1'}
              label={'Address Line 1'}
              value={formFields.address1}
              error={formErrors.address1}
              onChange={handleChange}
              helperText={
                formErrors.address1 ? 'Address Line 1 is a required field' : ''
              }
            />
            <TextField
              inputRef={fieldRefs.address2}
              name={'address2'}
              label={'Address Line 2'}
              value={formFields.address2}
              error={formErrors.address2}
              onChange={handleChange}
              helperText={formErrors.address2 ? 'Address Line 2 error' : ''}
            />
            <TextField
              required
              inputRef={fieldRefs.city}
              name={'city'}
              label={'City'}
              value={formFields.city}
              error={formErrors.city}
              onChange={handleChange}
              helperText={formErrors.city ? 'City is a required field' : ''}
            />
            <TextField
              required
              select
              name={'region'}
              label={'Province/Territory'}
              value={formFields.region}
              error={formErrors.region}
              onChange={handleChange}
              helperText={
                formErrors.region
                  ? 'Province/Territory is a required field'
                  : ''
              }
            >
              {regions.map(region => (
                <MenuItem key={region.id} value={region.label}>
                  {region.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              name={'postal'}
              label={'Postal Code'}
              value={formFields.postal}
              error={formErrors.postal}
              onChange={handleChange}
              helperText={formErrors.postal ? 'Enter a valid postal code' : ''}
            />
            <TextField
              required
              name={'phone'}
              label={'Phone'}
              value={formFields.phone}
              error={formErrors.phone}
              onChange={handleChange}
              helperText={formErrors.phone ? 'Enter a valid phone number' : ''}
            />
            <TextField
              required
              name={'customer_email'}
              label={'Email'}
              value={formFields.customer_email}
              error={formErrors.customer_email}
              onChange={handleChange}
              helperText={
                formErrors.customer_email ? 'Enter a valid email address' : ''
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

export default CustomersAddPage
