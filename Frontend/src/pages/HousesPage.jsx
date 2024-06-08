import React from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { routes } from '../router/routes'

const HousePage = () => {
  const navigate = useNavigate()
  return (
    <Navbar>
      <Header1
        title={'House Page'}
        button={
          <Button
            variant='contained'
            onClick={() => navigate(routes.housesAddRoute)}
          >
            <MdAdd />
            Add User
          </Button>
        }
      >
        <div>HousePage Information</div>
        Large Table
      </Header1>
    </Navbar>
  )
}

export default HousePage
