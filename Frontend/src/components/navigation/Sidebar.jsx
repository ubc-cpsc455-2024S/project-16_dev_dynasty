import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import BuildIcon from '@mui/icons-material/Build'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import { closeSidebar } from '../../redux/sidebar/sidebarSlice'
import CompanyLogo from '../../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { routes } from '../../router/routes'
import { colors } from '../../styles/colors'

const Sidebar = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.sidebar.isOpen)

  const handleClose = () => {
    dispatch(closeSidebar())
  }

  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive
      ? colors.sideBarLinkActiveColor
      : colors.sideBarLinkInactiveColor,
    background: isActive
      ? colors.sideBarLinkActiveBackground
      : colors.sideBarLinkInactiveBackground,
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
  })

  return (
    <Drawer anchor='left' open={isOpen} onClose={handleClose}>
      <div
        role='presentation'
        onClick={handleClose}
        onKeyDown={handleClose}
        style={{
          width: '250px',
          background: colors.sideBarBackground,
          color: colors.sideBarColor,
          height: '100%',
        }}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <img
            src={CompanyLogo}
            alt='Company Logo'
            style={{ height: '40px', marginBottom: '16px' }}
          />
        </div>
        <List>
          <NavLink to={routes.workshopRoute} style={linkStyle}>
            <ListItemIcon>
              <BuildIcon style={{ color: colors.sideBarActiveIconColor }} />
            </ListItemIcon>
            <ListItemText primary='Workshop' />
          </NavLink>
          <NavLink to={routes.housesRoute} style={linkStyle}>
            <ListItemIcon>
              <HomeWorkIcon style={{ color: colors.sideBarActiveIconColor }} />
            </ListItemIcon>
            <ListItemText primary='Houses' />
          </NavLink>
          <NavLink to={routes.usersRoute} style={linkStyle}>
            <ListItemIcon>
              <PersonIcon style={{ color: colors.sideBarActiveIconColor }} />
            </ListItemIcon>
            <ListItemText primary='Users' />
          </NavLink>
          <NavLink to={routes.customersRoute} style={linkStyle}>
            <ListItemIcon>
              <GroupIcon style={{ color: colors.sideBarActiveIconColor }} />
            </ListItemIcon>
            <ListItemText primary='Customers' />
          </NavLink>
        </List>
      </div>
    </Drawer>
  )
}

export default Sidebar
