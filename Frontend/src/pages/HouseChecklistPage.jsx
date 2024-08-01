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
import ChecklistTable from '../components/tables/ChecklistTable.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getHouseAsync } from '../redux/houses/thunksHouses.js'
import { styled } from '@mui/system'
import {
  getChecklistAsync,
  putChecklistAsync,
} from '../redux/checklists/thunksChecklists.js'
import ChecklistDownloadButton from '../components/buttons/ChecklistDownloadButton.jsx'
import { MdFileDownload, MdSave } from 'react-icons/md'

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
})

const checklists = [
  { label: 'Unit Exterior', value: 'unit_exterior' },
  { label: 'Kitchen / Dining Room', value: 'kitchen_dining' },
  { label: 'Living Room', value: 'living_room' },
]

const HouseChecklistPage = () => {
  const { id: houseId } = useParams()
  const dispatch = useDispatch()
  const houseState = useSelector(state => state.houses.findHouse)
  const checklistState = useSelector(state => state.checklists.data)
  const [checklistName, setChecklistName] = useState('unit_exterior')
  const [checklistData, setChecklistData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [houseId, checklistName])

  const fetchData = async () => {
    await dispatch(getHouseAsync(houseId))
    await dispatch(getChecklistAsync(houseId))
  }

  useEffect(() => {
    setChecklistData(checklistState)
  }, [checklistState])

  const handleRecordChange = (e, id) => {
    const { name, value, type, checked } = e.target
    setChecklistData(prevChecklistData => {
      const newRecords = prevChecklistData[checklistName].records.map(
        record => {
          if (record._id === id && type === 'text') {
            return { ...record, [name]: value }
          }
          if (record._id === id && type === 'checkbox') {
            return { ...record, [name]: checked }
          }
          return record
        }
      )
      return {
        ...prevChecklistData,
        [checklistName]: {
          ...prevChecklistData[checklistName],
          records: newRecords,
        },
      }
    })
  }

  const handleClick = e => {
    e.preventDefault()
    dispatch(putChecklistAsync({ houseId, checklistData }))
  }

  return (
    <Navbar>
      {!houseState || !checklistData ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <Container>
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
              <Box display='flex' justifyContent='space-between' gap={1}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleClick}
                  startIcon={<MdSave />}
                >
                  Save
                </Button>
                <ChecklistDownloadButton houseId={houseId} />
              </Box>
            </Box>
            <ChecklistTable
              records={checklistData[checklistName].records}
              handleRecordChange={handleRecordChange}
            />
          </Box>
        </Container>
      )}
      {/*</Container>*/}
    </Navbar>
  )
}

export default HouseChecklistPage
