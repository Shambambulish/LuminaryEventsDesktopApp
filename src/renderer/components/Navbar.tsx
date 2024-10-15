import { AppBar,Drawer,IconButton,List,ListItem,Toolbar,Typography,useMediaQuery,useTheme } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./img/Logo.png"
import "./css/Navbar.css";
import { Settings } from './pages/Settings';
import { Popup } from './Popup';
import React from 'react';

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  
  const handleClickOpen = () => {
    setOpen(true);
};

  const handleClose = () => {
    setOpen(false);
  };



  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <>
      <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconButton>
          <img className='Logobutton' src={Logo}/>
        </IconButton>
      </NavLink>
    <div className='divideline'/>
      <NavLink
        to="/Calendar"
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconButton>
          <Typography>Kalenteri</Typography>
        </IconButton>
      </NavLink>
    <div className='divideline'/>
      <NavLink
        to="/Inventory"
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconButton>
          <Typography>Varasto</Typography>
        </IconButton>
      </NavLink>
    <div className='divideline'/>
      <NavLink
        to="/Settings"
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconButton>
          <Typography>Asetukset</Typography>
        </IconButton>
      </NavLink>
      <IconButton onClick={handleClickOpen}>
                <GiHamburgerMenu />
            </IconButton>
            <Popup open={open} handleClose={handleClose} />
    <div className='divideline'/>
    </>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton onClick={() => toggleDrawer(true)}>
            <GiHamburgerMenu/>
              </IconButton>
            <Drawer open={drawerOpen} onClick={() => toggleDrawer(false)}>
              <List>
                <ListItem>{menuItems}</ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          menuItems
        )}
      </Toolbar>
    </AppBar>
  );
}
