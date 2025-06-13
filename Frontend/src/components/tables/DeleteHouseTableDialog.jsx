import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const DeleteHouseTableDialog = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete House</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this house? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleDelete} color='primary' variant='contained'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteHouseTableDialog 