import { Box, Container, Typography } from '@mui/material'
import { ReactNode } from 'react'

const Header1 = ({ children, title }) => {
  return (
    <Container>
      <Typography style={{ marginTop: 15 }} variant='h3'>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Container>
  )
}

export default Header1
