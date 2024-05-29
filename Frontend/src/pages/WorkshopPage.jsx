import React from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { Button } from '@mui/material'

const WorkshopPage = () => {
  return (
    <Navbar>
      <Header1 title={'Workshop Page'}>
        <div>WorkshopPage Information</div>
        <Button variant={'contained'} color='success'>
          Sample Button
        </Button>
      </Header1>
    </Navbar>
  )
}

export default WorkshopPage
