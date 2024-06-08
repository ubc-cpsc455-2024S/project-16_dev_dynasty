import React from 'react'
import MainRouter from './router/MainRouter'
import { theme } from './styles/theme'
import { ThemeProvider } from '@emotion/react'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  )
}

export default App
