import { Box, Container, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Header1Props {
  children: ReactNode | ReactNode[]
  title: string
}

const Header1 = ({ children, title }: Header1Props) => {
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
