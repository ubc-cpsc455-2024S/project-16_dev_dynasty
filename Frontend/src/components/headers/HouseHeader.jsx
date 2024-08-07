import React from 'react'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const HouseHeader = ({ npl, secondHeader }) => {
  return (
    <Box>
      <NavLink to='/houses' style={{ textDecoration: 'none' }}>
        <Typography variant='h4' component='span' color='primary'>
          Houses
        </Typography>
      </NavLink>
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
