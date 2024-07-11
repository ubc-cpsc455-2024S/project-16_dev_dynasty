import React from 'react'
import { styled } from '@mui/system'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

const TableRowStyled = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9',
  },
  cursor: 'pointer',
})

const CustomerTable = ({ customer }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>{customer.customer_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{customer.customer_email}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomerTable
