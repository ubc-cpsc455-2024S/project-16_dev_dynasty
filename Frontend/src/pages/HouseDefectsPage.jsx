import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Button,
  IconButton,
  Modal,
  Fade,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Chip,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MailIcon from '@mui/icons-material/Mail'
import { colors } from '../styles/colors'
import LoadingPage from '../components/housePage/LoadingPage'
import MailModal from '../components/prop/MailModal'
import {
  fetchDefectsByHouseId,
  deleteDefectAsync,
} from '../redux/defects/thunksDefects'

const TableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: colors.tableHeadCellBackground,
})

const TableRowStyled = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: colors.tableRowOddBackground,
  },
})

const HouseDefectsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const defects = useSelector(state => state.defects.list)
  const loading = useSelector(state => state.defects.loading)
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedDefectId, setSelectedDefectId] = useState(null)
  const [mailModalOpen, setMailModalOpen] = useState(false)
  const [selectedDefect, setSelectedDefect] = useState(null)

  useEffect(() => {
    dispatch(fetchDefectsByHouseId(id))
  }, [dispatch, id])

  const handleDelete = async () => {
    await dispatch(
      deleteDefectAsync({ houseId: id, defectId: selectedDefectId })
    )
    setDeleteDialogOpen(false)
    setSelectedDefectId(null)
    dispatch(fetchDefectsByHouseId(id))
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setSelectedDefectId(null)
  }

  const handleCloseImageModal = () => {
    setOpen(false)
    setSelectedImage(null)
  }

  const handleOpenDeleteDialog = defectId => {
    setSelectedDefectId(defectId)
    setDeleteDialogOpen(true)
  }

  const handleOpenImageModal = url => {
    setSelectedImage(url)
    setOpen(true)
  }

  const handleOpenMailModal = defect => {
    setSelectedDefect(defect)
    setMailModalOpen(true)
  }

  const handleCloseMailModal = () => {
    setMailModalOpen(false)
    setSelectedDefect(null)
  }

  if (loading) return <LoadingPage />

  return (
    <>
      <Box mt={3} display={'flex'} justifyContent={'space-between'}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate(`/houses/${id}/add-defect`)}
        >
          Add Defect
        </Button>
      </Box>
      {defects.length === 0 ? (
        <Box
          height={'200px'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography>No Defects Created</Typography>
        </Box>
      ) : (
        <HouseDefectTable
          defects={defects}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleOpenImageModal={handleOpenImageModal}
          handleOpenMailModal={handleOpenMailModal}
        />
      )}
      <Modal open={open} onClose={handleCloseImageModal} closeAfterTransition>
        <Fade in={open}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              border: '2px solid #000',
              boxShadow: 24,
              padding: '16px',
            }}
          >
            <img
              src={selectedImage}
              alt='Selected'
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </Fade>
      </Modal>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this defect? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='secondary'>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='primary'
            variant={'contained'}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {selectedDefect && (
        <MailModal
          open={mailModalOpen}
          handleClose={handleCloseMailModal}
          title={`Defect Report: ${selectedDefect.title}`}
          type='defect'
          images={selectedDefect.images}
          data={selectedDefect}
        />
      )}
    </>
  )
}

const HouseDefectTable = ({
  defects,
  handleOpenDeleteDialog,
  handleOpenImageModal,
  handleOpenMailModal,
}) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const getStatusColor = status => {
    switch (status) {
      case 'Incomplete':
        return 'red'
      case 'In progress':
        return 'rgb(117, 59, 8)'
      case 'Resolved':
        return 'green'
      default:
        return 'black'
    }
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Bay ID</TableHeadCell>
              <TableHeadCell>Images</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defects.map(defect => (
              <TableRowStyled key={defect._id}>
                <TableCell>
                  <Tooltip title={defect.title} arrow>
                    <span>{truncateText(defect.title, 20)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={defect.description} arrow>
                    <span>{truncateText(defect.description, 40)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    label={defect.status}
                    style={{
                      backgroundColor: getStatusColor(defect.status),
                    }}
                  />
                </TableCell>
                <TableCell>{defect.bay_id}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(80px, 1fr))',
                      gap: '8px',
                      maxHeight: '150px',
                      overflowY: 'auto',
                    }}
                  >
                    {defect.images.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`defect-${index}`}
                        width={70}
                        style={{
                          cursor: 'pointer',
                          margin: '4px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        onClick={() => handleOpenImageModal(url)}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      navigate(`/houses/${id}/edit-defect/${defect._id}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDeleteDialog(defect._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenMailModal(defect)}>
                    <MailIcon />
                  </IconButton>
                </TableCell>
              </TableRowStyled>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default HouseDefectsPage
