import { AppBar,Drawer,IconButton,List,ListItem,Toolbar,Typography,useMediaQuery,useTheme } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <>
    <div className='divideline'/>
      <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconButton>
          <Typography>Kotisivu</Typography>
        </IconButton>
      </NavLink>
    <div className='divideline'/>
      <NavLink
        to="/Kalenteri"
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconButton>
          <Typography>Kalenteri</Typography>
        </IconButton>
      </NavLink>
    <div className='divideline'/>
      <NavLink
        to="/Varasto"
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconButton>
          <Typography>Varasto</Typography>
        </IconButton>
      </NavLink>
    <div className='divideline'/>
      <NavLink
        to="/Asetukset"
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconButton>
          <Typography>Asetukset</Typography>
        </IconButton>
      </NavLink>
    <div className='divideline'/>
    </>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography>Lumeventslogohere</Typography>
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
