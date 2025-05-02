import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import TrendingSlider from './TrendingSlider';

const SearchElement = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        setSearchResults(response.data.meals || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>Search Results for "{searchTerm}"</h1>
        
        {searchResults.length === 0 ? (
          <p>No recipes found for "{searchTerm}"</p>
        ) : (
          <div className="recipes-grid" style={{
            width:'90%',
            margin:'auto',
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(15rem, 1fr))',
            gridGap:'1rem',
            marginTop:'2rem'
          }}>
            {searchResults.map((recipe) => (
              <Link to={`/${recipe.idMeal}`} key={recipe.idMeal} className="recipe-card link">
                <div style={{textAlign:'center'}}>
                  <div className="img">
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{width:'13rem'}} />
                  </div>
                  <h3>{recipe.strMeal}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <TrendingSlider />
    </>
  );
};

export default SearchElement;