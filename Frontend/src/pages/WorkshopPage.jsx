import React from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import Productionline from '../components/workshop/Productionline'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { IoLocationSharp } from 'react-icons/io5'
import { ButtonPointerWrapper } from '../components/buttons/ButtonPointerWrapper'

const WorkshopPage = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleOpenLocation = () => {
    const urlLocation =
      'https://www.google.com/maps/dir/11611+Hayes+Crescent,+Acheson,+AB+T7X+6C3//@53.567261,-113.7937394,13z/data=!4m8!4m7!1m5!1m1!1s0x539f898484b86f4f:0xdbccd053a8cae359!2m2!1d-113.7525402!2d53.5672681!1m0?entry=ttu'
    window.open(urlLocation, '_blank').focus()
  }
  return (
    <Navbar>
      <Header1 title={'Workshop'}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography
            variant='subtitle1'
            component='span'
            color='textPrimary'
            sx={{ pr: '7px' }}
          >
            Modsolid Headquarters
          </Typography>
          <ButtonPointerWrapper>
            <IoLocationSharp
              color='#FF4C4C'
              fontSize={'18px'}
              onClick={handleOpenLocation}
            />
          </ButtonPointerWrapper>
        </Box>
        <br />
        <br />
        <Productionline />
      </Header1>
    </Navbar>
  )
}

{
  /* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  
</Box>
<CustomTabPanel value={value} index={0}>
  Item One
</CustomTabPanel>
<CustomTabPanel value={value} index={1}>
  Item Two
</CustomTabPanel>
<CustomTabPanel value={value} index={2}>
  Item Three
</CustomTabPanel> */
}

export default WorkshopPage
