import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import Navbar from '../components/navigation/Navbar';
import HouseTabs from '../components/navigation/HouseTabs';

const HouseChecklistPage = () => {
  return (
    <Navbar>
      <Container>
        <HouseTabs />
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            House Checklist
          </Typography>
          {/* Add your checklist content here */}
        </Box>
      </Container>
    </Navbar>
  );
};

export default HouseChecklistPage;
