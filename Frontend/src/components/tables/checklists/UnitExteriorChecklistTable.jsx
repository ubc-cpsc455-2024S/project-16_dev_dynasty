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

const UnitExteriorChecklistTable = props => {
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
          <TableRow>
            <TableCell>Belly Bag / Typar / OSB</TableCell>
            <TableCell align='center'>
              <Checkbox defaultChecked />
            </TableCell>
            <TableCell align='center'>
              <Checkbox defaultChecked />
            </TableCell>
            <TableCell align='center'>
              <TextField id='repaired-by' variant='outlined' />
            </TableCell>
            <TableCell align='center'>
              <Checkbox defaultChecked />
            </TableCell>
            <TableCell align='right'>
              <TextField id='remarks' variant='outlined' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UnitExteriorChecklistTable
