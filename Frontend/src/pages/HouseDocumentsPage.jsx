import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Modal,
  IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchDocumentsByHouseId, deleteDocumentAsync } from '../redux/documents/thunksDocuments';
import Navbar from '../components/navigation/Navbar';
import HouseTabs from '../components/navigation/HouseTabs';
import Header1 from '../components/headers/Header1';
import HouseHeader from '../components/headers/HouseHeader';
import PdfViewer from '../components/pdf/PdfViewer';


const HouseDocumentsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const houseInfo = useSelector((state) => state.houses.findHouse);
  const documents = useSelector((state) => state.documents.list);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchDocumentsByHouseId(id));
  }, [dispatch, id]);

  const handleAddDocument = () => {
    navigate(`/houses/${id}/documents/add`);
  };

  const handleEditDocument = (documentId) => {
    navigate(`/houses/${id}/documents/${documentId}/edit`);
  };

  const handleDeleteDocument = async (documentId) => {
    await dispatch(deleteDocumentAsync({ houseId: id, documentId }));
    dispatch(fetchDocumentsByHouseId(id));
  };

  const handleOpen = (document) => {
    setSelectedDocument(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDocument(null);
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'blueprint':
        return 'blue';
      case 'contract':
        return 'green';
      case 'inspection report':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <Navbar>
      <Container>
        <Header1 title={<HouseHeader npl={houseInfo?.npl} />} />
        <HouseTabs />
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleAddDocument}>
            Add Document
          </Button>
        </Box>
        <Grid container spacing={3} mt={3}>
          {documents.map((document) => (
            <Grid item xs={12} sm={6} md={4} key={document._id}>
              <Card>
                <CardContent onClick={() => handleOpen(document)} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" gutterBottom>
                    {document.title}
                  </Typography>
                  <Typography variant="body2" style={{ color: getTypeColor(document.type) }} gutterBottom>
                    {document.type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {document.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton size="small" onClick={() => handleEditDocument(document._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteDocument(document._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                  <IconButton onClick={() => window.open(document.fileUrl, '_blank')}>
                    <DownloadIcon style={{ color: 'blue' }} />
                  </IconButton>
                </CardActions>
              </Card>
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
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom>
                {selectedDocument.title}
              </Typography>
              <Box sx={{ overflow: 'auto', maxHeight: '70vh' }}>
                <PdfViewer url={selectedDocument.fileUrl} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={() => window.open(selectedDocument.fileUrl, '_blank')}>
                  Download
                </Button>
              </Box>
            </Box>
          </Modal>
        )}
      </Container>
    </Navbar>
  );
};

export default HouseDocumentsPage;
