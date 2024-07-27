import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import HouseTabs from '../components/navigation/HouseTabs';
import Header1 from '../components/headers/Header1';
import HouseHeader from '../components/headers/HouseHeader';
import { fetchDocumentsByHouseId } from '../redux/documents/thunksDocuments';

const HouseDocumentsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const houseInfo = useSelector(state => state.houses.findHouse);
  const documents = useSelector(state => state.documents.list);

  useEffect(() => {
    dispatch(fetchDocumentsByHouseId(id));
  }, [dispatch, id]);

  const handleAddDocument = () => {
    navigate(`/houses/${id}/documents/add`);
  };

  const handleEditDocument = (documentId) => {
    navigate(`/houses/${id}/documents/edit/${documentId}`);
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
        <Grid container spacing={2} mt={3}>
          {documents.map(document => (
            <Grid item xs={12} sm={6} md={4} key={document._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{document.title}</Typography>
                  <Typography variant="body2">{document.type}</Typography>
                  <Typography variant="body2">{document.description}</Typography>
                  <Typography variant="body2">{new Date(document.uploadDate).toLocaleDateString()}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleEditDocument(document._id)}>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Navbar>
  );
};

export default HouseDocumentsPage;
