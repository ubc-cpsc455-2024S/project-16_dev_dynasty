import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  fetchDocumentsByHouseId,
  deleteDocumentAsync,
} from '../redux/documents/thunksDocuments'

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
              onView={() => handleViewDocument(document)}
            />
          </Grid>
        ))}
      </Grid>
      {selectedDocument && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              maxWidth: '75%',
              maxHeight: '90vh',
              margin: 'auto',
              mt: 5,
              p: 2,
              bgcolor: '#555555',
              borderRadius: 2,
              boxShadow: 5,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              color: 'white',
            }}
          >
            <Box
              sx={{
                flex: '1 1 75%',
                overflow: 'auto',
                maxHeight: '85vh',
                width: '100%',
                mr: 2,
              }}
            >
              <PdfViewer url={selectedDocument.fileUrl} />
            </Box>

            <Box
              sx={{
                flex: '1 1 30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                maxHeight: '85vh',
                overflow: 'auto',
                p: 2,
              }}
            >
              <Typography
                variant='h4'
                gutterBottom
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {selectedDocument.title}
              </Typography>
              <Typography
                variant='body1'
                gutterBottom
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {selectedDocument.description}
              </Typography>
              <Typography variant='body2' color='inherit'>
                Type: {selectedDocument.type}
              </Typography>
              <Typography variant='body2' color='inherit'>
                Uploaded:{' '}
                {new Date(selectedDocument.uploadDate).toLocaleDateString()}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 2 }}
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
