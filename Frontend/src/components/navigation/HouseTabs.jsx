import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const HouseTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  const validPaths = [
    `/houses/${id}/details`,
    `/houses/${id}/defects`,
    `/houses/${id}/documents`,
    `/houses/${id}/checklist`,
  ];

  const currentPath = location.pathname;
  const defaultPath = `/houses/${id}/details`;

  const tabValue = validPaths.includes(currentPath) ? currentPath : defaultPath;

  return (
    <Tabs
      value={tabValue}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
    >
      <Tab label="Details" value={`/houses/${id}/details`} />
      <Tab label="Defects" value={`/houses/${id}/defects`} />
      <Tab label="Documents" value={`/houses/${id}/documents`} />
      <Tab label="Checklist" value={`/houses/${id}/checklist`} />
    </Tabs>
  );
};

export default HouseTabs;
