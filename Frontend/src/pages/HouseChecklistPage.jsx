import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import Navbar from '../components/navigation/Navbar'
import HouseTabs from '../components/navigation/HouseTabs'
import HouseHeader from '../components/headers/HouseHeader'
import Header1 from '../components/headers/Header1'
import UnitExteriorChecklistTable from '../components/tables/checklists/UnitExteriorChecklistTable'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getHouseAsync } from '../redux/houses/thunksHouses.js'
import { styled } from '@mui/system'
import { getChecklistAsync } from '../redux/checklists/thunksChecklists.js'

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
})

const checklists = [
  { label: 'Unit Exterior', value: 'unitExterior' },
  { label: 'Kitchen / Dining Room', value: 'kitchenDining' },
]

const HouseChecklistPage = () => {
  const { id: houseId } = useParams()
  const dispatch = useDispatch()
  const houseState = useSelector(state => state.houses.findHouse)
  const checklistState = useSelector(state => state.checklists.checklistData)
  const [checklistName, setChecklistName] = useState('unitExterior')
  const [checklistData, setChecklistData] = useState(checklistState)

  useEffect(() => {
    fetchData()
  }, [houseId, checklistName, checklistData])

  const fetchData = async () => {
    await dispatch(getHouseAsync(houseId)).unwrap()
    await dispatch(getChecklistAsync({ houseId, checklistName }))
  }

  const handleClick = () => {
    // todo
  }

  return (
    <Navbar>
      <Container>
        {!houseState ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <>
            <Header1 title={<HouseHeader npl={houseState.npl} />} />
            <HouseTabs />
            <Box mt={3}>
              <Box mb={3} display='flex' justifyContent='space-between'>
                <FormControl
                  variant='outlined'
                  size='small'
                  style={{ minWidth: 200 }}
                >
                  <InputLabel id='checklist-select-label'>Checklist</InputLabel>
                  <Select
                    labelId='checklist-select-label'
                    id='checklist-select'
                    value={checklistName}
                    label='Checklist'
                    onChange={e => setChecklistName(e.target.value)}
                  >
                    {checklists.map(checklist => (
                      <MenuItem key={checklist.value} value={checklist.value}>
                        {checklist.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleClick}
                >
                  Save
                </Button>
              </Box>

              <UnitExteriorChecklistTable />
            </Box>
          </>
        )}
      </Container>
    </Navbar>
  )
}

export default HouseChecklistPage
