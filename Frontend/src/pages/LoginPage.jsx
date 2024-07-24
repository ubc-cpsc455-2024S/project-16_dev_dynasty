import React, { useState } from 'react';
import Navbar from '../components/navigation/Navbar';
import Header1 from '../components/headers/Header1';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../router/routes';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement login logic here
    // For example: call an API to authenticate the user
    console.log('Logging in with:', username, password);
    navigate(routes.dashboardRoute); // Redirect to dashboard or appropriate route on success
  };

  return (
    <Navbar>
      <Header1 title={'Login Page'}>
        <Container maxWidth='sm'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 8
            }}
          >
            <Typography variant='h4' gutterBottom>
              Log In
            </Typography>
            <TextField
              label='Username'
              variant='outlined'
              fullWidth
              margin='normal'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label='Password'
              type='password'
              variant='outlined'
              fullWidth
              margin='normal'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Container>
      </Header1>
    </Navbar>
  );
};

export default LoginPage;
