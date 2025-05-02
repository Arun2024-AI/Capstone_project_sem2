import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRandomRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search/${searchTerm}`;
    }
  };

  return (
    <div className="container">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for recipes..."
        />
        <button type="submit">Search</button>
      </form>
      
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <Link to={`/${recipe.idMeal}`} key={recipe.idMeal} className="recipe-card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;