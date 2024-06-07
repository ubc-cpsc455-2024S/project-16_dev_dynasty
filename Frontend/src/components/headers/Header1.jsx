import { Box, Container, Typography } from '@mui/material'
import { ReactNode } from 'react'

const Header1 = ({ children, title, button }) => {
  return (
    <Container sx={{ pt: '20px' }}>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
      >
        <Typography variant='h4'>{title}</Typography>
        {button}
      </Box>
      <Box>{children}</Box>
    </Container>
  )
}

export default Header1
