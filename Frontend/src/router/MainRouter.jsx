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
import HousePage from '../pages/HousePage';
import CustomerPage from '../pages/CustomerPage.jsx';
import HouseDetails from '../pages/HouseDetailsPage.jsx';
import HouseDefects from '../pages/HouseDefectsPage.jsx';
import HouseDocuments from '../pages/HouseDocumentsPage.jsx';
import HouseChecklist from '../pages/HouseCheckListPage.jsx';
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
        <Route path={routes.houseRoutes} element={<HousePage />}>
          <Route path="details" element={<HouseDetails />} />
          <Route path="defects" element={<HouseDefects />} />
          <Route path="documents" element={<HouseDocuments />} />
          <Route path="checklist" element={<HouseChecklist />} />
          <Route index element={<Navigate to="details" />} />
        </Route>
        <Route path={routes.customerRoute} element={<CustomerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
