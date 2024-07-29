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
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  deleteCustomerAsync,
  getCustomersAsync,
} from '../../redux/customers/thunksCustomers.js'
import { useNavigate } from 'react-router-dom'

const TableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
})

const TableRowStyled = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9',
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

  const handleDelete = async customerId => {
    await dispatch(deleteCustomerAsync(customerId))
    dispatch(getCustomersAsync({ customerNameQuery }))
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
              <Typography variant='h6'>Email</Typography>
            </TableHeadCell>
            <TableHeadCell>
              <Typography variant='h6'>Actions</Typography>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(customers) && customers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(customer => (
              <TableRowStyled
                key={customer._id}
                onClick={() => handleRowClick(customer._id)}
              >
                <TableCell>{customer.customer_name}</TableCell>
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

      {Array.isArray(customers) && <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
      
    </TableContainer>
  )
}

export default CustomersTable
