import React from 'react'
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
} from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  deleteHouseAsync,
  getAllHousesAsync,
} from '../../redux/houses/thunksHouses'
import { houseStatusEnum } from '../../constants/contants'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../styles/colors'

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

const StatusCell = styled(TableCell)(({ status }) => ({
  color: getStatusColor(status),
  fontWeight: 'bold',
}))

const getStatusColor = status => {
  switch (status) {
    case 0:
      return 'red'
    case 1:
      return 'grey'
    case 2:
      return 'orange'
    case 3:
      return 'blue'
    case 4:
      return 'green'
    default:
      return 'black'
  }
}

const HousesTable = ({
  houses,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = async houseId => {
    await dispatch(deleteHouseAsync(houseId))
    dispatch(
      getAllHousesAsync({
        query: '',
        nplQuery: '',
        customerNameQuery: '',
        houseModelQuery: '',
      })
    )
  }

  const handleRowClick = houseId => {
    navigate(`/houses/${houseId}`)
  }

  return (
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
              <Typography variant='h6'>Actions</Typography>
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
                <StatusCell status={house.status}>
                  {houseStatusEnum[house.status]}
                </StatusCell>
                <TableCell>{house.bay_id}</TableCell>
                <TableCell>{house.bay_name}</TableCell>
                <TableCell onClick={e => e.stopPropagation()}>
                  <IconButton onClick={() => handleDelete(house._id)}>
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
  )
}

HousesTable.propTypes = {
  houses: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
}

export default HousesTable
