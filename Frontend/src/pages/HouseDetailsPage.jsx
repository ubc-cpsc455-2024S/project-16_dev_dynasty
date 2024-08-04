import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getHouseAsync,
  updateHouseAsync,
  deleteHouseAsync,
  bayToHouseAsync,
} from '../redux/houses/thunksHouses'
import {
  getAllBaysAsync,
  getAvailableBaysAsync,
} from '../redux/bays/thunksBays'
import StatusEditDialog from '../components/workshop/StatusEditDialog'
import BayEditDialog from '../components/workshop/BayEditDialog'
import {
  houseStatusEnumSelectable,
  houseStatusEnumAll,
} from '../constants/contants'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import SelectCustom from '../components/inputs/SelectCustom'
import HouseTabs from '../components/navigation/HouseTabs'
import HouseHeader from '../components/headers/HouseHeader'
import { MdEdit } from 'react-icons/md'
import {
  Chip,
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { styled } from '@mui/system'
import { routes } from '../router/routes'
import { deleteChecklistAsync } from '../redux/checklists/thunksChecklists.js'
import { toast } from 'react-toastify'

styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
})

styled(TableCell)(({ status }) => ({
  color: getStatusColor(status),
  fontWeight: 'bold',
}))

const getStatusColor = status => {
  switch (status) {
    case 0:
      return 'red'
    case 1:
      return 'grey'
    case 2:
      return 'orange'
    case 3:
      return 'blue'
    case 4:
      return 'green'
    default:
      return 'black'
  }
}

const HouseDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const houseInfo = useSelector(state => state.houses.findHouse || null)
  // const bays = useSelector(state => state.bays.list || [])
  const emptyBays = useSelector(state => state.bays.emptyBays || [])
  const currentUser = useSelector(state => state.auth.user)
  const [open, setOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [bayDialogOpen, setBayDialogOpen] = useState(false)

  useEffect(() => {
    dispatch(getHouseAsync(id))
    dispatch(getAvailableBaysAsync())
  }, [dispatch, id])

  const handleChangeStatus = async status => {
    console.log('status: ', status)
    const updatedHouseInfo = { ...houseInfo, status: status }
    const houseData = {
      houseId: houseInfo._id,
      houseData: updatedHouseInfo,
    }
    await dispatch(updateHouseAsync(houseData))
  }

  const handleDeleteHouse = async () => {
    await dispatch(deleteHouseAsync(houseInfo._id))
    await dispatch(deleteChecklistAsync(houseInfo._id))
    navigate(routes.housesRoute)
  }

  const handleClickOpen = () => {
    console.log('the current user is: ', currentUser)
    if (currentUser.role !== 'admin') {
      toast.error('Only admin user authorized for this action')
    } else {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const houseStatusOptions = Object.keys(houseStatusEnumSelectable).map(
    key => ({
      value: key,
      label: houseStatusEnumSelectable[key],
    })
  )

  if (!houseInfo) return <CircularProgress />

  const isReadyForShipping = houseInfo.status === 4
  const isDeliveredToCustomer = houseInfo.status === 5
  console.log({ isReadyForShipping, isDeliveredToCustomer })
  return (
    <Navbar>
      <Header1
        title={<HouseHeader npl={houseInfo.npl} />}
        button={
          <Box display={'flex'}>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleClickOpen}
              style={{ marginLeft: '10px' }}
            >
              Delete House
            </Button>
          </Box>
        }
      />
      <br />
      <Container>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete House</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this house? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleDeleteHouse} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <HouseTabs />
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display={'flex'} gap={'10px'}>
                <Button
                  disabled={!isReadyForShipping}
                  onClick={() => handleChangeStatus(5)}
                  variant='contained'
                >
                  Ready For Shipping
                </Button>

                <Button
                  disabled={!isDeliveredToCustomer}
                  onClick={() => handleChangeStatus(6)}
                  variant='contained'
                >
                  Received By Customer
                </Button>
              </Box>
              <br />
              <br />
              <Box display={'flex'} gap={'20px'}>
                <Paper elevation={3} style={{ padding: '16px', width: '45%' }}>
                  <Typography variant='h6' gutterBottom>
                    House Details
                  </Typography>
                  <TableContainer>
                    <Table>
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
                            <Box display={'flex'}>
                              <Chip
                                sx={{ width: '180px' }}
                                className={'status' + houseInfo.status}
                                label={houseStatusEnumAll[houseInfo.status]}
                                onDelete={() => setStatusDialogOpen(true)}
                                deleteIcon={
                                  <MdEdit
                                    size={'18px'}
                                    style={{
                                      color: 'inherit',
                                      paddingBottom: 4,
                                    }}
                                  />
                                }
                              />
                            </Box>
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
                          <TableCell>Bay Name</TableCell>
                          <TableCell>
                            <Chip
                              sx={{ width: '170px' }}
                              label={houseInfo.bay_name}
                              onDelete={() => setBayDialogOpen(true)}
                              deleteIcon={
                                <MdEdit
                                  size={'18px'}
                                  style={{
                                    color: 'inherit',
                                    paddingBottom: 4,
                                  }}
                                />
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Bay Description</TableCell>
                          <TableCell>{houseInfo.bay_description}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Paper elevation={3} style={{ padding: '16px', width: '45%' }}>
                  <Typography variant='h6' gutterBottom>
                    Recent Events
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <BayEditDialog
        isOpen={bayDialogOpen}
        houseInfo={houseInfo}
        handleClose={() => setBayDialogOpen(false)}
      />
      <StatusEditDialog
        isOpen={statusDialogOpen}
        houseInfo={houseInfo}
        handleClose={() => setStatusDialogOpen(false)}
      />
    </Navbar>
  )
}

export default HouseDetailsPage
