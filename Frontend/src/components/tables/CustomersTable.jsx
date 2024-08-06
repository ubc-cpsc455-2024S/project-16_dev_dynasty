import React from 'react'
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
import {
  deleteCustomerAsync,
  getCustomersAsync,
} from '../../redux/customers/thunksCustomers.js'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../styles/colors'
import { toast } from 'react-toastify'

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

const CustomersTable = ({
  customers,
  customerNameQuery,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.auth.user)

  const handleDelete = async customerId => {
    if (currentUser.role !== 'admin') {
      toast.error('Only admin user authorized for this action')
    } else {
      await dispatch(deleteCustomerAsync(customerId))
      dispatch(getCustomersAsync({ customerNameQuery }))
    }
    
  }

  const handleRowClick = customerId => {
    navigate(`/customers/${customerId}`)
  }

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>
              <Typography variant='h6'>Customer Name</Typography>
            </TableHeadCell>
            <TableHeadCell>
              <Typography variant='h6'>City</Typography>
            </TableHeadCell>
            <TableHeadCell>
              <Typography variant='h6'>Province</Typography>
            </TableHeadCell>
            <TableHeadCell>
              <Typography variant='h6'>Phone</Typography>
            </TableHeadCell>
            <TableHeadCell>
              <Typography variant='h6'>Email</Typography>
            </TableHeadCell>
            <TableHeadCell>
              <Typography variant='h6'></Typography>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(customers) &&
            customers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(customer => (
                <TableRowStyled
                  key={customer._id}
                  onClick={() => handleRowClick(customer._id)}
                >
                  <TableCell>{customer.customer_name}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>{customer.region}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.customer_email}</TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <IconButton onClick={() => handleDelete(customer._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRowStyled>
              ))}
        </TableBody>
      </Table>

      {Array.isArray(customers) && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  )
}

export default CustomersTable
