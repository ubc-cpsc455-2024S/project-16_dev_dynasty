import React, { useEffect, useState } from 'react'
import { Box, Container, Button, Grid, Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  fetchDocumentsByHouseId,
  deleteDocumentAsync,
} from '../redux/documents/thunksDocuments'
import Navbar from '../components/navigation/Navbar'
import HouseTabs from '../components/navigation/HouseTabs'
import Header1 from '../components/headers/Header1'
import HouseHeader from '../components/headers/HouseHeader'
import PdfViewer from '../components/pdf/PdfViewer'
import DocumentCard from '../components/card/DocumentCard'

const HouseDocumentsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const houseInfo = useSelector(state => state.houses.findHouse)
  const documents = useSelector(state => state.documents.list)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchDocumentsByHouseId(id))
  }, [dispatch, id])

  const handleAddDocument = () => {
    navigate(`/houses/${id}/add-documents`)
  }

  const handleEditDocument = documentId => {
    navigate(`/houses/${id}/edit-documents/${documentId}`)
  }

  const handleDeleteDocument = async documentId => {
    await dispatch(deleteDocumentAsync({ houseId: id, documentId }))
    dispatch(fetchDocumentsByHouseId(id))
  }

  const handleViewDocument = document => {
    setSelectedDocument(document)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedDocument(null)
  }

  return (
    <>
      <Box mt={3} display={'flex'} justifyContent={'space-between'}>
        <div />
        <Button variant='contained' color='primary' onClick={handleAddDocument}>
          Add Document
        </Button>
      </Box>
      {documents.length === 0 && (
        <Box
          height={'200px'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography>No Documents Created</Typography>
        </Box>
      )}
      <Grid container spacing={3}>
        {documents.map(document => (
          <Grid item xs={12} sm={6} md={4} key={document._id}>
            <DocumentCard
              document={document}
              leftSideValue={document.type}
              rightSideValue={new Date(
                document.uploadDate
              ).toLocaleDateString()}
              onEdit={() => handleEditDocument(document._id)}
              onDelete={() => handleDeleteDocument(document._id)}
              onDownload={() => window.open(document.fileUrl, '_blank')}
              onView={() => handleViewDocument(document)} // Pass view handler
            />
          </Grid>
        ))}
      </Grid>
      {selectedDocument && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              maxWidth: '80%',
              maxHeight: '80%',
              margin: 'auto',
              mt: 5,
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 5,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h6' gutterBottom>
              {selectedDocument.title}
            </Typography>
            <Box
              sx={{
                overflow: 'auto',
                maxHeight: '70vh',
                width: '100%',
                mt: 1,
              }}
            >
              <PdfViewer url={selectedDocument.fileUrl} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => window.open(selectedDocument.fileUrl, '_blank')}
              >
                Download
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default HouseDocumentsPage
