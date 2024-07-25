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
import { styled } from '@mui/system'

const TableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
})

const TightTableCell = styled(TableCell)({
  paddingTop: 0,
  paddingBottom: 0,
  borderBottom: 'none',
})

const ChecklistTable = ({ records, handleRecordChange }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeadCell></TableHeadCell>
              <TableHeadCell align='center'>Accept</TableHeadCell>
              <TableHeadCell align='center'>Deficient</TableHeadCell>
              <TableHeadCell align='center'>Repaired By</TableHeadCell>
              <TableHeadCell align='center'>QC Checked</TableHeadCell>
              <TableHeadCell align='right'>Remarks</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map(record => (
              <TableRow key={record._id}>
                {record.level === 'header' ? (
                  <TightTableCell style={{ fontWeight: 'bold' }}>
                    {record.name}
                  </TightTableCell>
                ) : (
                  <TightTableCell style={{ paddingLeft: '40px' }}>
                    {record.name}
                  </TightTableCell>
                )}
                <TightTableCell align='center'>
                  {record.fillable && (
                    <Checkbox
                      name='accepted'
                      checked={record.accepted}
                      onClick={e => handleRecordChange(e, record._id)}
                    />
                  )}
                </TightTableCell>
                <TightTableCell align='center'>
                  {record.fillable && (
                    <Checkbox
                      name='deficient'
                      checked={record.deficient}
                      onClick={e => handleRecordChange(e, record._id)}
                    />
                  )}
                </TightTableCell>
                <TightTableCell align='center'>
                  {record.fillable && (
                    <TextField
                      name='repaired_by'
                      variant='outlined'
                      size='small'
                      value={record.repaired_by}
                      onChange={e => handleRecordChange(e, record._id)}
                    />
                  )}
                </TightTableCell>
                <TightTableCell align='center'>
                  {record.fillable && (
                    <Checkbox
                      name='checked'
                      checked={record.checked}
                      onClick={e => handleRecordChange(e, record._id)}
                    />
                  )}
                </TightTableCell>
                <TightTableCell align='right'>
                  {record.fillable && (
                    <TextField
                      name='remarks'
                      variant='outlined'
                      size='small'
                      value={record.remarks}
                      onChange={e => handleRecordChange(e, record._id)}
                    />
                  )}
                </TightTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default ChecklistTable
