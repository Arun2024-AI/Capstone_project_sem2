import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Menu, Close } from '@mui/icons-material';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">SmartKitchen</span>
        </Link>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <Close /> : <Menu />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/recipes" className="nav-link" onClick={() => setIsMenuOpen(false)}>Recipes</Link>
          <Link to="/bookmarks" className="nav-link" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>

        <div className={`nav-actions ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <button className="btn btn-primary">Start Searching</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 