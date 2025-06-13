import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
  Chip,
} from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  deleteHouseAsync,
  getAllHousesAsync,
} from '../../redux/houses/thunksHouses'
import { houseStatusEnumAll } from '../../constants/contants'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../styles/colors'
import { deleteChecklistAsync } from '../../redux/checklists/thunksChecklists.js'
import { toast } from 'react-toastify'
import DeleteHouseTableDialog from './DeleteHouseTableDialog'

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

const HousesTable = ({
  houses,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.auth.user)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedHouseId, setSelectedHouseId] = useState(null)

  const handleDelete = async () => {
    if (currentUser.role !== 'admin') {
      toast.error('Only admin user authorized for this action')
      return
    }
    
    try {
      await dispatch(deleteHouseAsync(selectedHouseId))
      await dispatch(deleteChecklistAsync(selectedHouseId))
      dispatch(
        getAllHousesAsync({
          query: '',
          nplQuery: '',
          customerNameQuery: '',
          houseModelQuery: '',
        })
      )
      toast.success('House deleted successfully')
    } catch (error) {
      toast.error('Failed to delete house')
    }
    setDeleteDialogOpen(false)
    setSelectedHouseId(null)
  }

  const handleOpenDeleteDialog = (houseId) => {
    setSelectedHouseId(houseId)
    setDeleteDialogOpen(true)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setSelectedHouseId(null)
  }

  const handleRowClick = houseId => {
    navigate(`/houses/${houseId}`)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>
                <Typography variant='h6'>NPL</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'>Customer Name</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'>House Model</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'>Square Feet</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'>Status</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'>Bay ID</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'>Bay Name</Typography>
              </TableHeadCell>
              <TableHeadCell>
                <Typography variant='h6'></Typography>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {houses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(house => (
                <TableRowStyled
                  key={house._id}
                  onClick={() => handleRowClick(house._id)}
                >
                  <TableCell>{house.npl}</TableCell>
                  <TableCell>{house.customer_name}</TableCell>
                  <TableCell>{house.house_model}</TableCell>
                  <TableCell>{house.square_ft}</TableCell>
                  <TableCell>
                    <Chip
                      sx={{ width: '180px' }}
                      className={'status' + house.status}
                      label={houseStatusEnumAll[house.status]}
                    />
                  </TableCell>
                  <TableCell>{house.bay_id}</TableCell>
                  <TableCell>{house.bay_name}</TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <IconButton onClick={() => handleOpenDeleteDialog(house._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRowStyled>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={houses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <DeleteHouseTableDialog
        open={deleteDialogOpen}
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDelete}
      />
    </>
  )
}

HousesTable.propTypes = {
  houses: PropTypes.array,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
}

export default HousesTable
