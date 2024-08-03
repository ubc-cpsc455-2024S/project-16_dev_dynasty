import React, { useEffect } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Chip,
} from '@mui/material'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHouseAsync, updateHouseAsync } from '../redux/houses/thunksHouses'
import { houseStatusEnum } from '../constants/contants'
import SelectCustom from '../components/inputs/SelectCustom'
import { getAvailableBaysAsync } from '../redux/bays/thunksBays'
import HouseTabs from '../components/navigation/HouseTabs'
import { styled } from '@mui/system'
import HouseDefects from '../components/HouseDefects'
import HouseDocuments from '../components/HouseDocuments'
import HouseChecklist from '../components/HouseChecklist'
import { colors } from '../styles/colors'

const TableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: colors.tableHeadCellBackground,
})


const HousePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const location = useLocation()
  const houseInfo = useSelector(state => state.houses.findHouse || null)
  // const bays = useSelector(state => state.bays.list || [])
  const emptyBays = useSelector(state => state.bays.emptyBays || [])

  useEffect(() => {
    dispatch(getHouseAsync(id))
    dispatch(getAvailableBaysAsync())
    console.log('empty', emptyBays);
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
      houseData: { ...houseInfo, bay_id: bay_id },
    }
    dispatch(updateHouseAsync(houseData))
  }

  const houseStatusOptions = Object.keys(houseStatusEnum).map(key => ({
    value: key,
    label: houseStatusEnum[key],
  }))

  const bayOptions = emptyBays.map(({ bay_id }) => ({
    value: bay_id,
    label: bay_id,
  }))

  const renderContent = () => {
    switch (location.pathname) {
      case `/houses/${id}/details`:
        return <HouseDetails houseInfo={houseInfo} />
      case `/houses/${id}/defects`:
        return <HouseDefects houseInfo={houseInfo} />
      case `/houses/${id}/documents`:
        return <HouseDocuments houseInfo={houseInfo} />
      case `/houses/${id}/checklist`:
        return <HouseChecklist houseInfo={houseInfo} />
      default:
        return <HouseDetails houseInfo={houseInfo} />
    }
  }

  if (!houseInfo) return <CircularProgress />
  console.log(houseInfo)

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
                {' > House ' + houseInfo.npl}
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
                extraOption={{ value: 'No Bayyy', label: 'No bayyy' }}
                options={bayOptions}
                value={houseInfo.bay_id || 'No Bay'}
                onChange={handleChangeBay}
              />
            </Box>
          }
        />
        <Box mt={3}>
          <HouseTabs />
          <Box mt={3}>{renderContent()}</Box>
        </Box>
      </Container>
    </Navbar>
  )
}

export default HousePage
