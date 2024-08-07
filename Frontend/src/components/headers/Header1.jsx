import { Box, Container, Typography } from '@mui/material'

const Header1 = ({ children, title, button }) => {
  return (
    <Container sx={{ pt: '20px' }}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant='h4'>{title}</Typography>
        {button == null ? <div /> : button}
      </Box>
      <Box>{children}</Box>
    </Container>
  )
}

export default Header1
