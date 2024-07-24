import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import Navbar from '../components/navigation/Navbar'
import HouseTabs from '../components/navigation/HouseTabs'
import HouseHeader from '../components/headers/HouseHeader'
import Header1 from '../components/headers/Header1'
import UnitExteriorChecklistTable from '../components/tables/checklists/UnitExteriorChecklistTable'
import { useSelector } from 'react-redux'

const HouseChecklistPage = () => {
  const houseInfo = useSelector(state => state.houses.findHouse)

  return (
    <Navbar>
      <Container>
        <Header1 title={<HouseHeader npl={houseInfo?.npl} />} />
        <HouseTabs />
        <Box mt={3}>
          <UnitExteriorChecklistTable />
        </Box>
      </Container>
    </Navbar>
  )
}

export default HouseChecklistPage
