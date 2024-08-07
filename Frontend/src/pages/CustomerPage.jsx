import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomerAsync } from '../redux/customers/thunksCustomers.js'
import Navbar from '../components/navigation/Navbar.jsx'
import Header1 from '../components/headers/Header1.jsx'
import {
  Box,
  CircularProgress,
  Container,
  Link,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import CustomerTable from '../components/tables/CustomerTable.jsx'

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
})

const CustomerPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const customer = useSelector(state => state.customers.findCustomer)

  useEffect(() => {
    dispatch(getCustomerAsync(id))
  }, [id])

  return (
    <Navbar>
      <Container>
        {!customer ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <>
            <Header1
              title={
                <Box>
                  <Link href='/customers' underline='none'>
                    <Typography variant='h6' component='span' color='primary'>
                      Customers
                    </Typography>
                  </Link>
                  <Typography variant='h6' component='span' color='textPrimary'>
                    {' > ' + customer.customer_name}
                  </Typography>
                </Box>
              }
            ></Header1>
            <Box mt={3}>
              <CustomerTable customer={customer} />
            </Box>
          </>
        )}
      </Container>
    </Navbar>
  )
}

export default CustomerPage
