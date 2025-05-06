import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About SmartKitchen</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            SmartKitchen helps you discover delicious recipes using ingredients you already have at home.
            We believe that cooking should be accessible, fun, and waste-free.
          </p>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <ul className="features-list">
            <li>
              <span className="feature-icon">🔍</span>
              <div className="feature-content">
                <h3>Smart Search</h3>
                <p>Find recipes based on ingredients you have</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">🎥</span>
              <div className="feature-content">
                <h3>Video Tutorials</h3>
                <p>Step-by-step video guides for perfect results</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">⭐</span>
              <div className="feature-content">
                <h3>Save Favorites</h3>
                <p>Bookmark your favorite recipes for later</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">🌙</span>
              <div className="feature-content">
                <h3>Dark Mode</h3>
                <p>Comfortable viewing in any lighting</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>API Credits</h2>
          <p>
            This application uses TheMealDB API to provide recipe data.
            Visit <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer">TheMealDB</a> to learn more.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 