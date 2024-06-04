import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import WorkshopPage from '../pages/WorkshopPage'
import CustomersPage from '../pages/CustomersPage'
import CustomersAddPage from '../pages/CustomersAddPage'
import UsersPage from '../pages/UsersPage'
import UsersAddPage from '../pages/UsersAddPage'
import HousesPage from '../pages/HousesPage'
import HousesAddPage from '../pages/HousesAddPage'
import NotFoundPage from '../pages/NotFoundPage'
import { routes } from './routes'
// import TestPage from '../pages/TestPage'

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<WorkshopPage />} />
        <Route path={routes.loginRoute} element={<LoginPage />} />
        <Route path={routes.workshopRoute} element={<WorkshopPage />} />
        <Route path={routes.customersRoute} element={<CustomersPage />} />
        <Route path={routes.customersAddRoute} element={<CustomersAddPage />} />
        <Route path={routes.usersRoute} element={<UsersPage />} />
        <Route path={routes.usersAddRoute} element={<UsersAddPage />} />
        <Route path={routes.housesRoute} element={<HousesPage />} />
        <Route path={routes.housesAddRoute} element={<HousesAddPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default MainRouter
