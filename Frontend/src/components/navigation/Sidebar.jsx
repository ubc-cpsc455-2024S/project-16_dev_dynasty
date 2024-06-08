import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BuildIcon from '@mui/icons-material/Build';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { closeSidebar } from '../../store/sidebarSlice';
import CompanyLogo from '../../assets/logo.png'; 

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const handleClose = () => {
    dispatch(closeSidebar());
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleClose}>
      <div
        role="presentation"
        onClick={handleClose}
        onKeyDown={handleClose}
        style={{ width: '250px', background: 'grey', color: 'white', height: '100%' }}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <img src={CompanyLogo} alt="Company Logo" style={{ height: '40px', marginBottom: '16px' }} />
        </div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <BuildIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Workshop" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HomeWorkIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Houses" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
