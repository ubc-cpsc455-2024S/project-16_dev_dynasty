import React from 'react'
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'

const ChecklistTable = ({ records, handleRecordChange }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align='center'>Accept</TableCell>
            <TableCell align='center'>Deficient</TableCell>
            <TableCell align='center'>Repaired By</TableCell>
            <TableCell align='center'>QC Checked</TableCell>
            <TableCell align='right'>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map(record => (
            <TableRow key={record._id}>
              <TableCell>{record.name}</TableCell>
              <TableCell align='center'>
                <Checkbox
                  name='accepted'
                  checked={record.accepted}
                  onClick={e => handleRecordChange(e, record._id)}
                />
              </TableCell>
              <TableCell align='center'>
                <Checkbox
                  name='deficient'
                  checked={record.deficient}
                  onClick={e => handleRecordChange(e, record._id)}
                />
              </TableCell>
              <TableCell align='center'>
                <TextField
                  name='repaired_by'
                  variant='outlined'
                  size='small'
                  value={record.repaired_by}
                  onChange={e => handleRecordChange(e, record._id)}
                />
              </TableCell>
              <TableCell align='center'>
                <Checkbox
                  name='checked'
                  checked={record.checked}
                  onClick={e => handleRecordChange(e, record._id)}
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  name='remarks'
                  variant='outlined'
                  size='small'
                  value={record.remarks}
                  onChange={e => handleRecordChange(e, record._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ChecklistTable
