import React, { useEffect } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Autocomplete,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addHouseAsync } from '../redux/houses/thunksHouses.js'
import { getCustomersAsync } from '../redux/customers/thunksCustomers.js'
import { useNavigate } from 'react-router-dom'
import { putChecklistAsync } from '../redux/checklists/thunksChecklists.js'
import { createFilterOptions } from '@mui/material/Autocomplete'

const customerFilterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.customer_name,
})

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
  const [customerValue, setCustomerValue] = useState(null)
  const [customerInputValue, setCustomerInputValue] = useState('')

  const customers = useSelector(state => state.customers.list)

  useEffect(() => {
    dispatch(getCustomersAsync())
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const result = await dispatch(addHouseAsync(formFields)).unwrap()
    await dispatch(putChecklistAsync({ houseId: result._id }))
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
              required
              name={'npl'}
              label={'NPL #'}
              type={'number'}
              value={formFields.npl}
              onChange={handleChange}
            />
            <Autocomplete
              value={customerValue}
              onChange={(event, newValue) => {
                setCustomerValue(newValue)
                setFormFields({ ...formFields, customer_id: newValue._id })
              }}
              inputValue={customerInputValue}
              onInputChange={(event, newInputValue) => {
                setCustomerInputValue(newInputValue)
              }}
              options={customers}
              filterOptions={customerFilterOptions}
              getOptionLabel={option => option.customer_name}
              renderInput={params => (
                <TextField {...params} label='Customer Name' required />
              )}
            />
            <TextField
              required
              name={'house_model'}
              label={'Model #'}
              value={formFields.house_model}
              onChange={handleChange}
            />
            <TextField
              required
              name={'square_ft'}
              label={'Floor area (sq ft)'}
              type={'number'}
              value={formFields.square_ft}
              onChange={handleChange}
              helperText='* Indicates required field'
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
