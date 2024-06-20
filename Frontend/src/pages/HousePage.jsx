import React, { useEffect } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHouseAsync, updateHouseAsync } from '../redux/houses/thunksHouses'
import { houseStatusEnum } from '../constants/contants'
import SelectCustom from '../components/inputs/SelectCustom'
import { getAllBaysAsync } from '../redux/bays/thunksBays'

const HousePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const houseInfo = useSelector(state => state.houses.findHouse || null)
  const bays = useSelector(state => state.bays.list || null)

  useEffect(() => {
    dispatch(getHouseAsync(id))
    dispatch(getAllBaysAsync())
  }, [])

  const handleChangeStatus = event => {
    const status = event.target.value
    const houseData = {
      houseId: houseInfo.house_id,
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
      houseId: houseInfo.house_id,
      houseData: { ...houseInfo, bay_id: bay_id },
    }
    dispatch(updateHouseAsync(houseData))
  }

  const houseStatusOptions = Object.keys(houseStatusEnum).map(key => ({
    value: key,
    label: houseStatusEnum[key],
  }))

  const bayOptions = bays.map(({ bay_id }) => ({
    value: bay_id,
    label: bay_id,
  }))

  if (!houseInfo) return <CircularProgress />

  return (
    <Navbar>
      <Header1
        title={'House Page'}
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
      >
        <div>House Information</div>
        {JSON.stringify(houseInfo)}
      </Header1>
    </Navbar>
  )
}

export default HousePage
