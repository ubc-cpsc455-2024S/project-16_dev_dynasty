import React from 'react'
import MainRouter from './router/MainRouter'
import { theme } from './styles/theme'
import { ThemeProvider } from '@emotion/react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import './styles/baseStyling.css'

function App() {
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
