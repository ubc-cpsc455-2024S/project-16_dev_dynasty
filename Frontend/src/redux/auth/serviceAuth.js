import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import { toast } from 'react-toastify'

const addUser = async userData => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/signup`, userData, {
      withCredentials: true,
    })
    return response.data.result
  } catch (error) {
    console.error('Error signing up new user:', error.response.data.signUpError)
    const singUpErr = error.response.data.signUpError
    toast.error(singUpErr)
    throw error
  }
}

const login = async signInData => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/signin`,
      signInData,
      {
        withCredentials: true,
      }
    )
    return response.data.result
  } catch (error) {
    console.error('Error loging in:', error)
    if (error.response.status === 401) {
      toast.error('Incorrect password')
    }
    if (error.response.status === 404) {
      toast.error('Incorrect username')
    }
    throw error
  }
}

const verifyAuth = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/verify-token`, {
      withCredentials: true,
    })
    return response.data.user
  } catch (error) {
    console.error('error verifying user auth: ', error)
    throw error
  }
}

const logout = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/logout`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching bays:', error)
    throw error
  }
}

const getUsers = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/all`, {
      withCredentials: true,
    })
    return response.data.result
  } catch (error) {
    console.error('Error fetching bays:', error)
    throw error
  }
}
const deleteUser = async userId => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/users/${userId}`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error(`Error deleting user with id  ${userId} :`, error)
  }
}

export default {
  addUser,
  login,
  verifyAuth,
  getUsers,
  deleteUser,
  logout,
}
