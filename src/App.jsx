import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Bookmarks from './pages/Bookmarks';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';

function App() {
  const { isDarkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#4CAF50',
        dark: '#388E3C',
        light: '#81C784',
      },
      background: {
        default: isDarkMode ? '#121212' : '#FFFFFF',
        paper: isDarkMode ? '#1E1E1E' : '#F5F5F5',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
