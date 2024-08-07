import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'

const CustomerTable = ({ customer }) => {
  return (
    <TableContainer component={Paper} elevation={3} style={{ padding: '16px' }}>
      <Typography variant='h6' gutterBottom>
        Customer Details
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>{customer.customer_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address Line 1</TableCell>
            <TableCell>{customer.address1}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address Line 2</TableCell>
            <TableCell>{customer.address2}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell>{customer.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Province</TableCell>
            <TableCell>{customer.region}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Postal Code</TableCell>
            <TableCell>{customer.postal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phone</TableCell>
            <TableCell>{customer.phone}</TableCell>
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
