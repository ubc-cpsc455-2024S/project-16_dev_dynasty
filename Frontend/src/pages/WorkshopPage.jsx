import React from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { Button } from '@mui/material'
import Productionline from '../components/workshop/Productionline'

const WorkshopPage = () => {
  return (
    <div>
      <Navbar>
        <Header1 title={'Workshop Page'}>
          <div>WorkshopPage Information</div>
          <Button variant={'contained'} color='success'>
            Sample Button
          </Button>
        </Header1>
      </Navbar>
      <Productionline />
    </div>
  )
}

export default WorkshopPage
