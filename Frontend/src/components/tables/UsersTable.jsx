import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../styles/colors'
import { toast } from 'react-toastify'
import { deleteUserAsync, getUsersAsync } from '../../redux/auth/thunkAuth'
import DeleteUserDialog from './DeleteUserDialog'

const TableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: colors.tableHeadCellBackground,
})

const TableRowStyled = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: colors.tableRowOddBackground,
  },
  cursor: 'pointer',
})

const UsersTable = ({
  users,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.auth.user)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const handleDeleteClick = (user) => {
    if (currentUser.role !== 'admin') {
      toast.error('Only admin user authorized for this action')
      return
    }
    if (user.role === 'admin') {
      toast.error('Cannot delete admin user')
      return
    }
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteUserAsync(userToDelete._id))
      await dispatch(getUsersAsync())
      toast.success('User deleted successfully')
      handleCloseDialog()
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  return (
    <>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>
                <Typography variant='h6'>User Name</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'>Email</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'>Role</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'></Typography>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) &&
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => (
                  <TableRowStyled key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <IconButton 
                        onClick={() => handleDeleteClick(user)}
                        disabled={user.role === 'admin'}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRowStyled>
                ))}
          </TableBody>
        </Table>

        {Array.isArray(users) && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>

      <DeleteUserDialog
        open={deleteDialogOpen}
        handleClose={handleCloseDialog}
        handleDelete={handleDeleteConfirm}
        userName={userToDelete?.name}
      />
    </>
  )
}

export default UsersTable
