import React from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { Button } from '@mui/material'
import Productionline from '../components/workshop/Productionline'

const WorkshopPage = () => {
  return (
    <Navbar>
      <Header1 title={'Workshop Page'}>
        <div>WorkshopPage Information</div>
      </Header1>
      <Productionline />
    </Navbar>
  )
}

export default WorkshopPage
