import React, { useEffect, useState } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { Box, Container, TableCell, Tabs, Tab, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHouseAsync, getHouseAsync } from '../redux/houses/thunksHouses'
import { deleteChecklistAsync } from '../redux/checklists/thunksChecklists'
import { getAvailableBaysAsync } from '../redux/bays/thunksBays'
import { styled } from '@mui/system'
import { colors } from '../styles/colors'
import HouseDetailsPage from './HouseDetailsPage'
import HouseDefectsPage from './HouseDefectsPage'
import HouseDocumentsPage from './HouseDocumentsPage'
import HouseChecklistPage from './HouseChecklistPage'
import DeleteHouseDialog from '../components/housePage/DeleteHouseDialog'
import HouseHeader from '../components/headers/HouseHeader'
import LoadingPage from '../components/housePage/LoadingPage'
import { routes } from '../router/routes'
import { toast } from 'react-toastify'

const TableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: colors.tableHeadCellBackground,
})

const HousePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState('Details')
  const [deleteHouseDialogOpen, setDeleteHouseDialogOpen] = useState(false)
  const dispatch = useDispatch()
  const houseInfo = useSelector(state => state.houses.findHouse || null)
  const currentUser = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(getHouseAsync(id))
    dispatch(getAvailableBaysAsync())
  }, [dispatch, id])

  const handleDeleteHouse = async () => {
    try {
      await dispatch(deleteHouseAsync(houseInfo._id))
      await dispatch(deleteChecklistAsync(houseInfo._id))
      toast.success('House deleted successfully')
      navigate(routes.housesRoute)
    } catch (error) {
      toast.error('Failed to delete house')
    }
  }

  const handleClickOpenDeleteHouseDialog = () => {
    if (!currentUser) {
      toast.error('Please log in to perform this action')
      return
    }

    if (currentUser.role !== 'admin') {
      toast.error('Only admin user authorized for this action')
      return
    }

    setDeleteHouseDialogOpen(true)
  }

  const handleCloseDeleteHouseDialog = () => {
    setDeleteHouseDialogOpen(false)
  }

  if (!houseInfo)
    return (
      <Navbar>
        <LoadingPage />
      </Navbar>
    )

  return (
    <Navbar>
      <Header1
        title={<HouseHeader npl={houseInfo?.npl} />}
        button={
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleClickOpenDeleteHouseDialog}
            style={{ marginLeft: '10px' }}
          >
            Delete House
          </Button>
        }
      />
      <Container>
        <Box mt={3}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => {
              setTabValue(newValue)
            }}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label='Details' value={'Details'} />
            <Tab label='Defects' value={'Defects'} />
            <Tab label='Documents' value={'Documents'} />
            <Tab label='Checklist' value={'Checklist'} />
          </Tabs>
        </Box>
        {tabValue === 'Details' && <HouseDetailsPage />}
        {tabValue === 'Defects' && <HouseDefectsPage />}
        {tabValue === 'Documents' && <HouseDocumentsPage />}
        {tabValue === 'Checklist' && <HouseChecklistPage />}
      </Container>
      <DeleteHouseDialog
        open={deleteHouseDialogOpen}
        handleClose={handleCloseDeleteHouseDialog}
        handleDeleteHouse={handleDeleteHouse}
      />
    </Navbar>
  )
}

export default HousePage
