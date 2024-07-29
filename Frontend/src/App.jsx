import React, { useEffect } from 'react';
import MainRouter from './router/MainRouter'
import { theme } from './styles/theme'
import { ThemeProvider } from '@emotion/react'
import { useDispatch } from 'react-redux';
// import {jwtDecode} from 'jwt-decode';
import { verifyTokenAsync } from './redux/auth/thunkAuth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyTokenAsync());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  )
}

export default App
