import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  CircularProgress,
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormLabel,
  InputAdornment,
} from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { routes } from '../router/routes'
import { getAllHousesAsync } from '../redux/houses/thunksHouses'
import HousesTable from '../components/tables/HousesTable'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { houseStatusEnumAll } from '../constants/contants'
import { colors } from '../styles/colors'
import { toast } from 'react-toastify'
import TextFieldLabelWrapper from '../components/labels/TextFieldLabelWrapper'
import AdornmentSearch from '../components/inputs/adornments/AdornmentSearch'

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
})

const ErrorText = styled(Typography)({
  color: colors.errorTextColor,
  textAlign: 'center',
  marginTop: '50px',
})

const commonQueries = [
  { label: 'None', value: '' },
  { label: 'In-Bay Houses', value: 'inBay' },
  ...Object.keys(houseStatusEnumAll).map(key => ({
    label: houseStatusEnumAll[key],
    value: key,
  })),
]

const HousesPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const houses = useSelector(state => state.houses.list)
  const status = useSelector(state => state.houses.status)
  const error = useSelector(state => state.houses.error)
  const currentUser = useSelector(state => state.auth.user)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [query, setQuery] = useState('')
  const [nplQuery, setNplQuery] = useState('')
  const [customerNameQuery, setCustomerNameQuery] = useState('')
  const [houseModelQuery, setHouseModelQuery] = useState('')

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, query, nplQuery, customerNameQuery, houseModelQuery])

  const fetchData = () => {
    dispatch(
      getAllHousesAsync({ query, nplQuery, customerNameQuery, houseModelQuery })
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClear = () => {
    setQuery('')
    setNplQuery('')
    setCustomerNameQuery('')
    setHouseModelQuery('')
    setPage(0)
    fetchData()
  }

  const handleAddHouseButtonClick = () => {
    if (currentUser.role !== 'admin') {
      toast.error('Only admin user authorized for this action')
    } else {
      navigate(routes.housesAddRoute)
    }
  }

  return (
    <Navbar>
      <Header1
        title={'Houses'}
        button={
          <Button
            variant='contained'
            onClick={handleAddHouseButtonClick}
            startIcon={<MdAdd />}
          >
            Add House
          </Button>
        }
      />
      <Container>
        <Box mt={3}>
          <Box mb={3} display='flex' gap={'20px'}>
            <TextFieldLabelWrapper label={'Common Queries'}>
              <Select
                sx={{ width: '100%' }}
                value={query}
                size='small'
                onChange={e => setQuery(e.target.value)}
              >
                {commonQueries.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </TextFieldLabelWrapper>
            <TextFieldLabelWrapper label={'House NPL #'}>
              <TextField
                value={nplQuery}
                onChange={e => setNplQuery(e.target.value)}
                variant='outlined'
                size='small'
                InputProps={AdornmentSearch}
              />
            </TextFieldLabelWrapper>
            <TextFieldLabelWrapper label={'Customer Name'}>
              <TextField
                value={customerNameQuery}
                onChange={e => setCustomerNameQuery(e.target.value)}
                variant='outlined'
                size='small'
                InputProps={AdornmentSearch}
              />
            </TextFieldLabelWrapper>
            <TextFieldLabelWrapper label={'House Model'}>
              <TextField
                value={houseModelQuery}
                onChange={e => setHouseModelQuery(e.target.value)}
                variant='outlined'
                size='small'
                InputProps={AdornmentSearch}
              />
            </TextFieldLabelWrapper>
            <Button
              sx={{ height: '40px', alignSelf: 'flex-end' }}
              variant='outlined'
              onClick={handleClear}
              color='secondary'
            >
              Clear
            </Button>
          </Box>
          {status.getAll === 'pending' ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : error ? (
            <ErrorText>Error: {error}</ErrorText>
          ) : (
            <div>
              <HousesTable
                houses={houses}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          )}
        </Box>
      </Container>
      <br />
      <br />
    </Navbar>
  )
}

export default HousesPage
