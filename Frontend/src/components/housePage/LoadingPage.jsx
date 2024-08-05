import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingPage = () => {
  return (
    <Box
      display='flex'
      height={'600px'}
      justifyContent='center'
      alignItems='center'
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingPage
