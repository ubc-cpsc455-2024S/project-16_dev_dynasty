import React, {useState} from 'react'
import Navbar from '../components/navigation/Navbar.jsx'
import Header1 from '../components/headers/Header1'
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {userSignupAsync} from '../redux/auth/thunkAuth.js'

const UsersAddPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState('');




  const handleSubmit = async e => {
    e.preventDefault()
    const name = e.target.name.value
    const confirmPassword = e.target.confirmPassword.value
    const password = e.target.password.value
    const email = e.target.email.value
    const role = e.target.role.value


    const userSignupForm = {
      name: name,
      email: email,
      password: password,
      confirmPassword:confirmPassword,
      role: role
    }

    try {
      const result = await dispatch(userSignupAsync(userSignupForm)).unwrap();
      if (result) {
        navigate(-1);
      }
    } catch (err) {
      console.log('error when signup async dispatch')
    }
  }

  return (
    <Navbar>
      <Header1 title={'Add User'}>
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Typography sx={{ pt: '50px' }} variant='label'>
              Fill the form below to add a new user
            </Typography>
            <TextField name={'name'} label={'name'} />
            <TextField name={'email'} label={'email'} />
            <TextField name={'password'} label={'password'} />
            <TextField name={'confirmPassword'} label={'confirmPassword'} />
            {/* <TextField name={'role'} label={'role'} /> */}
            <FormControl>
              <InputLabel id="role-label">role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem value="user">user</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
              </Select>
            </FormControl>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </Box>
        </form>
      </Header1>
    </Navbar>
  )
}

export default UsersAddPage
