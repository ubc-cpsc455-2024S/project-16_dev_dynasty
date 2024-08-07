import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import {
  updateDefectAsync,
  fetchDefectsByHouseId,
} from '../redux/defects/thunksDefects'
import { getAllBaysAsync } from '../redux/bays/thunksBays'
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import HouseHeader from '../components/headers/HouseHeader'
import '../styles/addHousePage.css' // Ensure both components use the same styles
import LoadingPage from '../components/housePage/LoadingPage'

const EditDefectPage = () => {
  const { id, defectId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const house = useSelector(state => state.houses.findHouse)
  const defects = useSelector(state => state.defects.list)
  const bays = useSelector(state => state.bays.list)
  const [defect, setDefect] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [bayId, setBayId] = useState('')
  const [images, setImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [deletedImages, setDeletedImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    dispatch(getAllBaysAsync())
    dispatch(fetchDefectsByHouseId(id)).then(action => {
      const defectToEdit = action.payload.find(def => def._id === defectId)
      if (defectToEdit) {
        setDefect(defectToEdit)
        setTitle(defectToEdit.title)
        setDescription(defectToEdit.description)
        setStatus(defectToEdit.status)
        setBayId(defectToEdit.bay_id)
        setImages(defectToEdit.images || [])
      }
    })
  }, [dispatch, id, defectId])

  useEffect(() => {
    const handleDragEnter = () => setDragging(true)
    const handleDragLeave = () => setDragging(false)
    const handleDrop = () => setDragging(false)

    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('drop', handleDrop)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('drop', handleDrop)
    }
  }, [])

  const handleFileChange = e => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length !== files.length) {
      setError('Some files were not valid images and were not added.')
    }
    setNewImages(prevImages => [...prevImages, ...validFiles])
  }

  const onDrop = useCallback(acceptedFiles => {
    const validFiles = acceptedFiles.filter(file =>
      file.type.startsWith('image/')
    )
    if (validFiles.length !== acceptedFiles.length) {
      setError('Some files were not valid images and were not added.')
    }
    setNewImages(prevImages => [...prevImages, ...validFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
      'image/webp': ['.webp'],
    },
    multiple: true,
  })

  const handleDeleteImage = (index, isExisting) => {
    if (isExisting) {
      setDeletedImages(prev => [...prev, images[index]])
      setImages(prevImages => prevImages.filter((_, i) => i !== index))
    } else {
      setNewImages(prevImages => prevImages.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Kept images that remain after deletion
    const keptImages = images

    const defectData = {
      title,
      description,
      status,
      bay_id: bayId,
      deleted: deletedImages, // Images to delete
      kept: keptImages, // Images to keep
      images: newImages, // Adding newImages here
    }

    try {
      // Now the defectData itself contains all image info
      const response = await dispatch(
        updateDefectAsync({ houseId: id, defectId, defectData })
      ).unwrap()
      if (!response) throw new Error('Failed to update defect.')
      setLoading(false)
      dispatch(fetchDefectsByHouseId(id)) // Update the defects list
      navigate(-1)
    } catch (err) {
      setLoading(false)
      console.error('Error updating defect:', err)
      if (err.response && err.response.status === 400) {
        setError('Bad request. Please check the input data.')
      } else if (err.response && err.response.status === 500) {
        setError('Server error. Please try again later.')
      } else {
        setError('Failed to update defect. Please try again.')
      }
    }
  }

  if (!defect) {
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
          title={<HouseHeader npl={house.npl} secondHeader={'Edit Defect'} />}
        />
        <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
          <Typography variant='h6' gutterBottom>
            Edit House Defect
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
              label='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              margin='normal'
              multiline
              rows={4}
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={e => setStatus(e.target.value)}
                label='Status'
              >
                <MenuItem value='Incomplete'>Incomplete</MenuItem>
                <MenuItem value='In progress'>In Progress</MenuItem>
                <MenuItem value='Resolved'>Resolved</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin='normal'>
              <InputLabel>Bay ID</InputLabel>
              <Select
                value={bayId}
                onChange={e => setBayId(e.target.value)}
                label='Bay ID'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {bays.map(bay => (
                  <MenuItem key={bay._id} value={bay.bay_id}>
                    {bay.bay_id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive || dragging ? 'active' : ''}`}
            >
              <input {...getInputProps()} />
              <Typography align='center' className='dropzone-text'>
                {isDragActive
                  ? 'Drop the files here ...'
                  : 'Drag & drop files here, or click to select files'}
              </Typography>
            </div>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              {images.map((image, index) => (
                <Grid item xs={4} key={`existing-${index}`}>
                  <Card style={{ position: 'relative' }}>
                    <CardMedia
                      component='img'
                      height='140'
                      image={image}
                      alt={`existing-defect-image-${index}`}
                    />
                    <IconButton
                      style={{ position: 'absolute', top: '5px', right: '5px' }}
                      onClick={() => handleDeleteImage(index, true)}
                    >
                      <DeleteIcon color='error' />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
              {newImages.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card style={{ position: 'relative' }}>
                    <CardMedia
                      component='img'
                      height='140'
                      image={URL.createObjectURL(image)}
                      alt={`new-defect-image-${index}`}
                    />
                    <IconButton
                      style={{ position: 'absolute', top: '5px', right: '5px' }}
                      onClick={() => handleDeleteImage(index, false)}
                    >
                      <DeleteIcon color='error' />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {loading ? (
              <CircularProgress style={{ marginTop: '20px' }} />
            ) : (
              <Button
                type='submit'
                variant='contained'
                color='primary'
                style={{ marginTop: '20px' }}
              >
                Update Defect
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

export default EditDefectPage
