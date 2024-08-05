import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const DeleteHouseDialog = ({ open, handleClose, handleDeleteHouse }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete House</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this house?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleDeleteHouse} color='primary' variant='contained'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteHouseDialog
