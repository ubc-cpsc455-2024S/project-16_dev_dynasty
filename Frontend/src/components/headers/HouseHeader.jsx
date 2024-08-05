import React from 'react'
import { Box, Typography, Link } from '@mui/material'

const HouseHeader = ({ npl, secondHeader }) => {
  return (
    <Box>
      <Link href='/houses' underline='none'>
        <Typography variant='h4' component='span' color='primary'>
          Houses
        </Typography>
      </Link>
      <Typography variant='h4' component='span' color='textPrimary'>
        {' > House ' + npl}
      </Typography>
      {secondHeader !== undefined && (
        <Typography variant='h4' component='span' color='textPrimary'>
          {' > ' + secondHeader}
        </Typography>
      )}
    </Box>
  )
}

export default HouseHeader
