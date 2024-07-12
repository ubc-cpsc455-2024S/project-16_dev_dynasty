import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import WorkshopPage from '../pages/WorkshopPage';
import CustomersPage from '../pages/CustomersPage';
import CustomersAddPage from '../pages/CustomersAddPage';
import UsersPage from '../pages/UsersPage';
import UsersAddPage from '../pages/UsersAddPage';
import HousesPage from '../pages/HousesPage';
import HousesAddPage from '../pages/HousesAddPage';
import NotFoundPage from '../pages/NotFoundPage';
import CustomerPage from '../pages/CustomerPage';
import HouseDetailsPage from '../pages/HouseDetailsPage';
import HouseDefectsPage from '../pages/HouseDefectsPage';
import HouseDocumentsPage from '../pages/HouseDocumentsPage';
import HouseChecklistPage from '../pages/HouseCheckListPage';
import { routes } from './routes';

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
        <Route path={`${routes.houseRoutes}/details`} element={<HouseDetailsPage />} />
        <Route path={`${routes.houseRoutes}/defects`} element={<HouseDefectsPage />} />
        <Route path={`${routes.houseRoutes}/documents`} element={<HouseDocumentsPage />} />
        <Route path={`${routes.houseRoutes}/checklist`} element={<HouseChecklistPage />} />
        <Route path={routes.customerRoute} element={<CustomerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
