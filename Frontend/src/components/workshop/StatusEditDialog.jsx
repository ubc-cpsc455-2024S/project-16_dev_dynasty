import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { updateHouseAsync } from '../../redux/houses/thunksHouses'
import { useDispatch } from 'react-redux'
import { houseStatusEnumSelectable } from '../../constants/contants'
import SelectCustom from '../inputs/SelectCustom'
import { colors } from '../../styles/colors'

const StatusEditDialog = ({ isOpen, houseInfo, handleClose }) => {
  const [houseStatus, setHouseStatus] = useState(houseInfo.status)
  const dispatch = useDispatch()

  const handleChangeStatus = event => {
    setHouseStatus(parseInt(event.target.value))
  }

  const handleSubmit = async () => {
    const houseData = {
      houseId: houseInfo._id,
      houseData: { ...houseInfo, status: houseStatus },
    }
    await dispatch(updateHouseAsync(houseData))
    handleClose()
  }

  const houseStatusOptions = Object.keys(houseStatusEnumSelectable).map(
    (key, index) => ({
      value: key,
      label: houseStatusEnumSelectable[key],
      disabled: index > 4,
    })
  )

  return (
    <Dialog maxWidth={'xs'} open={isOpen} onClose={handleClose}>
      <DialogTitle>Modify Project #{houseInfo.npl} status?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Modify the house status according to the current stage of the work.
        </DialogContentText>
        <br />

        <SelectCustom
          style={{ marginRight: '10px' }}
          label={'Status'}
          options={houseStatusOptions}
          value={houseStatus}
          onChange={handleChangeStatus}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Close
        </Button>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StatusEditDialog
