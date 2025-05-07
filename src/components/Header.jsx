import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7, Bookmark, Home, Info, ContactMail } from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
import './Header.css';

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home /> },
    { path: '/bookmarks', label: 'Bookmarks', icon: <Bookmark /> },
    { path: '/about', label: 'About', icon: <Info /> },
    { path: '/contact', label: 'Contact', icon: <ContactMail /> },
  ];

  return (
    <AppBar position="sticky" className="header">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" className="logo">
          SmartKitchen
        </Typography>
        
        <Box className="nav-links">
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box className="auth-buttons">
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="inherit"
            className="login-btn"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            className="register-btn"
          >
            Register
          </Button>
        </Box>

        <IconButton onClick={toggleTheme} color="inherit" className="theme-toggle">
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 