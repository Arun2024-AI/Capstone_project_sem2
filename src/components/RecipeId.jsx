import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import TrendingSlider from './TrendingSlider';

const RecipeId = () => {
  const [recipe, setRecipe] = useState(null);
  const { idMeal } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        setRecipe(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [idMeal]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="recipe-detail">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>{recipe.strMeal}</h1>
        <div className="recipe-content">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <div className="recipe-info">
            <h2>Ingredients</h2>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .filter(i => recipe[`strIngredient${i}`])
                .map(i => (
                  <li key={i}>
                    {recipe[`strIngredient${i}`]} - {recipe[`strMeasure${i}`]}
                  </li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <p>{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
      <div style={{marginTop:'1rem'}}>
        <TrendingSlider />
      </div>
    </>
  );
};

export default RecipeId;