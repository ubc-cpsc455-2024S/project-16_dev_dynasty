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
import CustomerPage from '../pages/CustomerPage'
import HousePage from '../pages/HousePage.jsx'
import AddHouseDefectPage from '../pages/AddHouseDefectPage'
import EditDefectPage from '../pages/EditDefectsPage'
import AddHouseDocumentPage from '../pages/AddHouseDocumentPage'
import EditHouseDocumentPage from '../pages/EditDocumentsPage'
import EventLogPage from '../pages/EventLogPage.jsx'
import { routes } from './routes'
import PrivateRoute from '../components/auth/PrivateRoute.jsx'

// prettier-ignore
const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute element={WorkshopPage} />} />
        <Route path={routes.loginRoute} element={<LoginPage />} />
        <Route path={routes.workshopRoute} element={<PrivateRoute element={WorkshopPage} />} />
        <Route path={routes.customersRoute} element={<PrivateRoute element={CustomersPage} />} />
        <Route path={routes.customersAddRoute} element={<PrivateRoute element={CustomersAddPage} />} />
        <Route path={routes.usersRoute} element={<PrivateRoute element={UsersPage} />} />
        <Route path={routes.usersAddRoute} element={<PrivateRoute element={UsersAddPage} />} />
        <Route path={routes.housesRoute} element={<PrivateRoute element={HousesPage} />} />
        <Route path={routes.houseRoute} element={<PrivateRoute element={HousePage} />} />
        <Route path={routes.housesAddRoute} element={<PrivateRoute requiredRole= 'admin' element={HousesAddPage} />} />
        <Route path={routes.houseAddDefectRoute} element={<PrivateRoute element={AddHouseDefectPage} />} />
        <Route path={routes.houseEditDefectRoute} element={<PrivateRoute element={EditDefectPage} />} />
        <Route path={routes.houseAddDocumentRoute} element={<PrivateRoute element={AddHouseDocumentPage} />} />
        <Route path={routes.houseEditDocumentRoute} element={<PrivateRoute element={EditHouseDocumentPage} />} />
        <Route path={routes.customerRoute} element={<PrivateRoute element={CustomerPage} />} />
        <Route path={routes.eventLogsRoute} element={<PrivateRoute element={EventLogPage} />} />
        <Route path="/webviewer/*" element={<Navigate to="/webviewer" />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default MainRouter
