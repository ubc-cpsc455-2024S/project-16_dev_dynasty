import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import Navbar from '../components/navigation/Navbar'
import HouseTabs from '../components/navigation/HouseTabs'
import Header1 from '../components/headers/Header1.jsx'
import HouseHeader from '../components/headers/HouseHeader.jsx'
import { useSelector } from 'react-redux'

const HouseDocumentsPage = () => {
  const houseInfo = useSelector(state => state.houses.findHouse)

  return (
    <Navbar>
      <Container>
        <Header1 title={<HouseHeader npl={houseInfo?.npl} />} />

        <HouseTabs />
      </Container>
    </Navbar>
  )
}

export default HouseDocumentsPage
