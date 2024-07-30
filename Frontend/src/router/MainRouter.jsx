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
import HouseDetailsPage from '../pages/HouseDetailsPage'
import HouseDefectsPage from '../pages/HouseDefectsPage'
import HouseDocumentsPage from '../pages/HouseDocumentsPage'
import HouseChecklistPage from '../pages/HouseChecklistPage.jsx'
import AddHouseDefectPage from '../pages/AddHouseDefectPage'
import EditDefectPage from '../pages/EditDefectsPage'
import AddHouseDocumentPage from '../pages/AddHouseDocumentPage'
import EditHouseDocumentPage from '../pages/EditDocumentsPage'
import { routes } from './routes'
import PrivateRoute from '../components/auth/PrivateRoute.jsx';

const MainRouter = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path='/' element={<WorkshopPage />} />
    //     <Route path={routes.loginRoute} element={<LoginPage />} />
    //     <Route path={routes.workshopRoute} element={<WorkshopPage />} />
    //     <Route path={routes.customersRoute} element={<CustomersPage />} />
    //     <Route path={routes.customersAddRoute} element={<CustomersAddPage />} />
    //     <Route path={routes.usersRoute} element={<UsersPage />} />
    //     <Route path={routes.usersAddRoute} element={<UsersAddPage />} />
    //     <Route path={routes.housesRoute} element={<HousesPage />} />
    //     <Route path={routes.housesAddRoute} element={<HousesAddPage />} />
    //     <Route path={routes.houseDetailsRoute} element={<HouseDetailsPage />} />
    //     <Route path={routes.houseDefectsRoute} element={<HouseDefectsPage />} />
    //     <Route path={routes.houseAddDefectRoute} element={<AddHouseDefectPage />} />
    //     <Route path={routes.houseEditDefectRoute} element={<EditDefectPage />} />
    //     <Route path={routes.houseDocumentsRoute} element={<HouseDocumentsPage />} />
    //     <Route path={routes.houseAddDocumentRoute} element={<AddHouseDocumentPage />} />
    //     <Route path={routes.houseEditDocumentRoute} element={<EditHouseDocumentPage />} />
    //     <Route path={routes.houseChecklistRoute} element={<HouseChecklistPage />} />
    //     <Route path={routes.customerRoute} element={<CustomerPage />} />
    //     <Route path='*' element={<NotFoundPage />} />
    //   </Routes>
    // </Router>
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
        <Route path={routes.housesAddRoute} element={<PrivateRoute element={HousesAddPage} />} />
        <Route path={routes.houseDetailsRoute} element={<PrivateRoute element={HouseDetailsPage} />} />
        <Route path={routes.houseDefectsRoute} element={<PrivateRoute element={HouseDefectsPage} />} />
        <Route path={routes.houseAddDefectRoute} element={<PrivateRoute element={AddHouseDefectPage} />} />
        <Route path={routes.houseEditDefectRoute} element={<PrivateRoute element={EditDefectPage} />} />
        <Route path={routes.houseDocumentsRoute} element={<PrivateRoute element={HouseDocumentsPage} />} />
        <Route path={routes.houseAddDocumentRoute} element={<PrivateRoute element={AddHouseDocumentPage} />} />
        <Route path={routes.houseEditDocumentRoute} element={<PrivateRoute element={EditHouseDocumentPage} />} />
        <Route path={routes.houseChecklistRoute} element={<PrivateRoute element={HouseChecklistPage} />} />
        <Route path={routes.customerRoute} element={<PrivateRoute element={CustomerPage} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default MainRouter
