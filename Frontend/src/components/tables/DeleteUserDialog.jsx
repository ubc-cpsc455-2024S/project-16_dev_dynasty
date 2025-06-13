import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const DeleteUserDialog = ({ open, handleClose, handleDelete, userName }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete user "{userName}"? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleDelete} color='error' variant='contained'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteUserDialog 