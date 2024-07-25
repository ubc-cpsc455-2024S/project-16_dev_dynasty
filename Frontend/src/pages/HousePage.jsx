import React, { useEffect, useLayoutEffect } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Link,
  Chip,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  bayToHouseAsync,
  getHouseAsync,
  updateHouseAsync,
} from '../redux/houses/thunksHouses'
import { houseStatusEnum } from '../constants/contants'
import SelectCustom from '../components/inputs/SelectCustom'
import { getAllBaysAsync } from '../redux/bays/thunksBays'
import { styled } from '@mui/system'
import { colors } from '../styles/colors'

const TableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: colors.tableHeadCellBackground,
})

const HousePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { findHouse: houseInfo, status } = useSelector(state => state.houses)
  const bays = useSelector(state => state.bays.list || [])

  useLayoutEffect(() => {
    dispatch(getHouseAsync(id))
    dispatch(getAllBaysAsync())
  }, [dispatch, id])

  const handleChangeStatus = event => {
    const status = Number(event.target.value)
    const houseData = {
      houseId: houseInfo._id,
      houseData: { ...houseInfo, status: status },
    }
    dispatch(updateHouseAsync(houseData))
  }

  const handleChangeBay = event => {
    let bay_id = event.target.value
    if (bay_id === 'No Bay') {
      bay_id = null
    }
    const houseData = {
      houseId: houseInfo._id,
      bayId: bay_id,
    }
    dispatch(bayToHouseAsync(houseData))
  }

  const houseStatusOptions = Object.keys(houseStatusEnum).map(key => ({
    value: key,
    label: houseStatusEnum[key],
  }))

  const bayOptions = bays.map(({ bay_id }) => ({
    value: bay_id,
    label: bay_id,
  }))
  if (!houseInfo || status.getOne === 'pending')
    return (
      <Navbar>
        <Container>
          <Box
            height={'80vh'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <CircularProgress size={'large'} />
          </Box>
        </Container>
      </Navbar>
    )

  return (
    <Navbar>
      <Container>
        <Header1
          title={
            <Box>
              <Link href='/houses' underline='none'>
                <Typography variant='h6' component='span' color='primary'>
                  Houses
                </Typography>
              </Link>
              <Typography variant='h6' component='span' color='textPrimary'>
                {' > NPL #' + houseInfo.npl}
              </Typography>
            </Box>
          }
          button={
            <Box display={'flex'}>
              <SelectCustom
                style={{ marginRight: '10px' }}
                label={'Status'}
                options={houseStatusOptions}
                value={houseInfo.status}
                onChange={handleChangeStatus}
              />
              <SelectCustom
                label={'Bay #'}
                extraOption={{ value: 'No Bay', label: 'No bay' }}
                options={bayOptions}
                value={houseInfo.bay_id || 'No Bay'}
                onChange={handleChangeBay}
              />
            </Box>
          }
        />
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant='h6' gutterBottom>
                  House Details
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeadCell>Attribute</TableHeadCell>
                        <TableHeadCell>Value</TableHeadCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Project #</TableCell>
                        <TableCell>{houseInfo.npl}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Model #</TableCell>
                        <TableCell>{houseInfo.house_model}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>{houseInfo.customer_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>
                          <Chip
                            className={'status' + houseInfo.status}
                            label={houseStatusEnum[houseInfo.status]}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Square Footage</TableCell>
                        <TableCell>{houseInfo.square_ft} sqft</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Online Date</TableCell>
                        <TableCell>{houseInfo.online_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Created On</TableCell>
                        <TableCell>{houseInfo.created_on}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bay ID</TableCell>
                        <TableCell>{houseInfo.bay_id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bay Name</TableCell>
                        <TableCell>{houseInfo.bay_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width={'100px'}>Bay Description</TableCell>
                        <TableCell>{houseInfo.bay_description}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Navbar>
  )
}

export default HousePage
