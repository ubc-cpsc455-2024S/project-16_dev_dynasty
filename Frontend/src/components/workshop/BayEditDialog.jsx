import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { bayToHouseAsync } from '../../redux/houses/thunksHouses'
import { useDispatch, useSelector } from 'react-redux'
import SelectCustom from '../inputs/SelectCustom'

const BayEditDialog = ({ isOpen, houseInfo, handleClose }) => {
  const emptyBays = useSelector(state => state.bays.emptyBays || [])
  const intialBayId = houseInfo.bay_id === null ? '0' : houseInfo.bay_id
  const [bayId, setBayId] = useState(intialBayId)
  const dispatch = useDispatch()

  const handleChangeStatus = event => {
    setBayId(event.target.value)
  }

  const handleSubmit = async () => {
    const updatedBayId = bayId === '0' ? null : bayId

    const houseData = {
      houseId: houseInfo._id,
      houseData: houseInfo,
    }

    try {
      const data = await dispatch(
        bayToHouseAsync({ houseId: houseInfo._id, bayId: updatedBayId })
      )
      handleClose()
    } catch (error) {
      console.log('error', error)
    }
  }

  let bayOptions = emptyBays.map(({ bay_id, bay_name }) => ({
    value: bay_id,
    label: bay_name,
  }))
  bayOptions.push({ value: intialBayId, label: houseInfo.bay_name })
  bayOptions.sort((a, b) => {
    // Try to parse the values as floats for comparison
    const aValue = parseFloat(a.value)
    const bValue = parseFloat(b.value)

    // If both values are numbers, compare them directly
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return aValue - bValue
    }

    // If one value is not a number, handle alphanumeric sorting
    return a.value.localeCompare(b.value, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  })

  return (
    <Dialog maxWidth={'md'} open={isOpen} onClose={handleClose}>
      <DialogTitle>Modify Project #{houseInfo.npl} Bay?</DialogTitle>
      <DialogContent sx={{ pt: '20px', width: '250px' }}>
        <DialogContentText>Modify the house's current bay</DialogContentText>
        <br />
        <br />

        <SelectCustom
          label={'Bay #'}
          // extraOption={{ value: null, label: 'No bay' }}
          options={bayOptions}
          value={bayId}
          onChange={handleChangeStatus}
        />
      </DialogContent>
      <DialogActions sx={{ p: '20px' }}>
        <Button onClick={handleClose} variant='secondary'>
          Close
        </Button>
        <Button variant='contained' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BayEditDialog
