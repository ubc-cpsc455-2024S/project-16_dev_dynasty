// src/pages/EditHouseDocumentPage.jsx
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  updateDocumentAsync,
  fetchDocumentsByHouseId,
} from '../redux/documents/thunksDocuments'
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import HouseHeader from '../components/headers/HouseHeader'
import LoadingPage from '../components/housePage/LoadingPage'

const EditHouseDocumentPage = () => {
  const { id, documentId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const documents = useSelector(state => state.documents.list)
  const houseInfo = useSelector(state => state.houses.findHouse)
  const [document, setDocument] = useState(null)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    dispatch(fetchDocumentsByHouseId(id)).then(action => {
      const docToEdit = action.payload.find(doc => doc._id === documentId)
      if (docToEdit) {
        setDocument(docToEdit)
        setTitle(docToEdit.title)
        setType(docToEdit.type)
        setDescription(docToEdit.description)
      }
    })
  }, [dispatch, id, documentId])

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const documentData = {
      title,
      type,
      description,
      file,
    }

    try {
      const response = await dispatch(
        updateDocumentAsync({ houseId: id, documentId, documentData })
      ).unwrap()
      if (!response) throw new Error('Failed to update document.')
      setLoading(false)
      navigate(-1)
    } catch (err) {
      setLoading(false)
      console.error('Error updating document:', err)
      setError('Failed to update document. Please try again.')
    }
  }

  if (!document) {
    return (
      <Navbar>
        <LoadingPage />
      </Navbar>
    )
  }

  return (
    <Navbar>
      <Container>
        <Header1
          title={
            <HouseHeader npl={houseInfo.npl} secondHeader='Edit Document' />
          }
        />
        <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
          <Typography variant='h6' gutterBottom>
            Edit House Document
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Type'
              value={type}
              onChange={e => setType(e.target.value)}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              margin='normal'
              multiline
              rows={4}
            />
            <input
              accept='application/pdf, image/*'
              type='file'
              onChange={handleFileChange}
              style={{ marginTop: '20px' }}
            />
            {loading ? (
              <CircularProgress style={{ marginTop: '20px' }} />
            ) : (
              <Button
                type='submit'
                variant='contained'
                color='primary'
                style={{ marginTop: '20px' }}
              >
                Update Document
              </Button>
            )}
          </form>
          {error && (
            <Snackbar
              open={!!error}
              autoHideDuration={6000}
              onClose={() => setError('')}
            >
              <Alert
                onClose={() => setError('')}
                severity='error'
                sx={{ width: '100%' }}
              >
                {error}
              </Alert>
            </Snackbar>
          )}
        </Paper>
      </Container>
    </Navbar>
  )
}

export default EditHouseDocumentPage
