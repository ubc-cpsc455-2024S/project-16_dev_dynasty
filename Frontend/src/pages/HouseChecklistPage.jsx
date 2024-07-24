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
  Typography,
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
  const { id } = useParams()
  const dispatch = useDispatch()
  const houseInfo = useSelector(state => state.houses.findHouse)
  const [checklist, setChecklist] = useState('unitExterior')

  useEffect(() => {
    dispatch(getHouseAsync(id))
  }, [id])

  console.log(id)
  console.log(checklist)

  const handleClick = () => {
    // todo
  }

  return (
    <Navbar>
      <Container>
        {!houseInfo ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <>
            <Header1 title={<HouseHeader npl={houseInfo.npl} />} />
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
                    value={checklist}
                    label='Checklist'
                    onChange={e => setChecklist(e.target.value)}
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
