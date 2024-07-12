import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import Navbar from '../components/navigation/Navbar';
import HouseTabs from '../components/navigation/HouseTabs';

const HouseDocumentsPage = () => {
  return (
    <Navbar>
      <Container>
        <HouseTabs />
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            House Documents
          </Typography>
          {/* Add your documents content here */}
        </Box>
      </Container>
    </Navbar>
  );
};

export default HouseDocumentsPage;
