import React, { useEffect, useState } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { routes } from '../router/routes'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/system'
import CustomersTable from '../components/tables/CustomersTable'
import { getCustomersAsync } from '../redux/customers/thunksCustomers.js'
import { colors } from '../styles/colors'
import { toast } from 'react-toastify'
import TextFieldLabelWrapper from '../components/labels/TextFieldLabelWrapper'
import AdornmentSearch from '../components/inputs/adornments/AdornmentSearch'

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
})

const ErrorText = styled(Typography)({
  color: colors.errorTextColor,
  textAlign: 'center',
})

const CustomersPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const customers = useSelector(state => state.customers.list)
  const status = useSelector(state => state.customers.status)
  const error = useSelector(state => state.customers.error)
  const currentUser = useSelector(state => state.auth.user)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [customerNameQuery, setCustomerNameQuery] = useState('')

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, customerNameQuery])

  const fetchData = () => {
    dispatch(getCustomersAsync({ customerNameQuery }))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleAddCustomerButtonClick = () => {
    console.log('the current user is: ', currentUser)
    if (currentUser.role !== 'admin') {
      toast.error('Only admin user authorized for this action')
    } else {
      navigate(routes.customersAddRoute)
    }
  }

  return (
    <Navbar>
      <Header1
        title={'Customers'}
        button={
          <Button
            variant='contained'
            onClick={handleAddCustomerButtonClick}
            startIcon={<MdAdd />}
          >
            Add Customer
          </Button>
        }
      />
      <Container>
        <Box mt={3}>
          <Box mb={3} display='flex' justifyContent='flex-start'>
            <TextFieldLabelWrapper label='Customer Name'>
              <TextField
                value={customerNameQuery}
                onChange={e => setCustomerNameQuery(e.target.value)}
                variant='outlined'
                size='small'
                InputProps={AdornmentSearch}
              />
            </TextFieldLabelWrapper>
          </Box>
          {status.getAll === 'pending' ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : error ? (
            <ErrorText>Error: {error}</ErrorText>
          ) : (
            <div>
              <CustomersTable
                customers={customers}
                customerNameQuery={customerNameQuery}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          )}
        </Box>
      </Container>
    </Navbar>
  )
}

export default CustomersPage
