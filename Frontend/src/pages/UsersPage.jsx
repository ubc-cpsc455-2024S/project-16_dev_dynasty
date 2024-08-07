import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { routes } from '../router/routes'
import { toast } from 'react-toastify'
import { styled } from '@mui/system'
import { colors } from '../styles/colors'
import UsersTable from '../components/tables/UsersTable'
import { getUsersAsync } from '../redux/auth/thunkAuth'

const UsersPage = () => {
  const currentUser = useSelector(state => state.auth.user)
  const allUsers = useSelector(state => state.auth.allUsers)
  const status = useSelector(state => state.auth.status)
  const error = useSelector(state => state.auth.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage])

  const fetchData = () => {
    dispatch(getUsersAsync())
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const ErrorText = styled(Typography)({
    color: colors.errorTextColor,
    textAlign: 'center',
  })
  const LoadingContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
  })

  const handleAddUserButtonClick = () => {
    if (currentUser.role !== 'admin') {
      toast.error('Only admin user authorized for this action')
    } else {
      navigate(routes.usersAddRoute)
    }
  }

  return (
    <Navbar>
      <Header1
        title={'Users'}
        button={
          <Button variant='contained' onClick={handleAddUserButtonClick}>
            <MdAdd />
            Add User
          </Button>
        }
      />
      <Container>
        <Box mt={3}>
          <Box mb={3} display='flex' justifyContent='flex-start'>
            {/* <TextField
              label='Customer Name'
              value={customerNameQuery}
              onChange={e => setCustomerNameQuery(e.target.value)}
              variant='outlined'
              size='small'
            /> */}
          </Box>
          {status.getAllUsers === 'pending' ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : error ? (
            <ErrorText>Error: {error}</ErrorText>
          ) : (
            <div>
              <UsersTable
                users={allUsers}
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

export default UsersPage
