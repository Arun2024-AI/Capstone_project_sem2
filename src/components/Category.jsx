import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'
import TrendingSlider from './TredingSlider'


const Category = () => {
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        setCategoryRecipes(response.data.meals || []);
      } catch (error) {
        console.error('Error fetching category recipes:', error);
      }
    };

    fetchCategoryRecipes();
  }, [name]);

  return (
    <>
    <Navbar />
    <div className="container">
      <Link to="/" className="back-button">← Back to Home</Link>
      <h1>{name} Recipes</h1>
      
      <div className="recipes-grid" style={{
    width:'90%',
    margin:'auto',
    display:'grid',
    gridTemplateColumns:'repeat(auto-fit, minmax(15rem, 1fr))',
    gridGap:'1rem',
    marginTop:'2rem'

}}>
        {categoryRecipes.map((recipe) => (
          <Link to={`/${recipe.idMeal}`} key={recipe.idMeal} className="recipe-card link">
            <div className="img">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{width:'13rem'}} />
            </div>
            <h3>{recipe.strMeal}</h3>
          </Link>
        ))}
      </div>
      <TrendingSlider />
    </div>
    </>
  );
};

export default Category