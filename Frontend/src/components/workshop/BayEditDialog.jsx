import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { bayToHouseAsync, updateHouseAsync } from '../../redux/houses/thunksHouses';
import { useDispatch, useSelector } from 'react-redux';
import SelectCustom from '../inputs/SelectCustom';
import { colors } from '../../styles/colors';

const BayEditDialog = ({ isOpen, houseInfo, handleClose }) => {
  const emptyBays = useSelector((state) => state.bays.emptyBays || []);
  const [bayId, setBayId] = useState(houseInfo.status);
  const dispatch = useDispatch();

  const handleChangeStatus = (event) => {
    console.log('event.target.value', event.target.value);
    setBayId(event.target.value);
  };

  const handleSubmit = async () => {
    const updatedBayId = bayId === 'No Bay' ? null : bayId;

    const houseData = {
      houseId: houseInfo._id,
      houseData: houseInfo,
    };

    try {
      const data = await dispatch(bayToHouseAsync({ houseId: houseInfo._id, bayId: updatedBayId }));
      handleClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  const bayOptions = emptyBays.map(({ bay_id }) => ({
    value: bay_id,
    label: bay_id,
  }));

  return (
    <Dialog maxWidth={'md'} open={isOpen} onClose={handleClose}>
      <DialogTitle>Modify Project #{houseInfo.npl} Bay?</DialogTitle>
      <DialogContent sx={{ pt: '20px', width: '250px' }}>
        <DialogContentText>Modify the house's current bay</DialogContentText>
        <br />
        <br />

        <SelectCustom
          label={'Bay #'}
          extraOption={{ value: 'No Bay', label: 'No bay' }}
          options={bayOptions}
          value={bayId || 'No Bay'}
          onChange={handleChangeStatus}
        />
      </DialogContent>
      <DialogActions sx={{ p: '20px' }}>
        <Button onClick={handleClose} sx={{ color: colors.dialogSecondaryButtonColor }}>
          Close
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BayEditDialog;
