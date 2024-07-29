import React, { useEffect } from 'react';
import MainRouter from './router/MainRouter'
import { theme } from './styles/theme'
import { ThemeProvider } from '@emotion/react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import './styles/baseStyling.css'
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
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </ThemeProvider>
  )
}

export default App
