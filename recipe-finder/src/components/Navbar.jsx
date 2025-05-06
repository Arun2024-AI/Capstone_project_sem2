import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">SmartKitchen</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/recipes" className="nav-link">Recipes</Link>
          <Link to="/bookmarks" className="nav-link">Favorites</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-actions">
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