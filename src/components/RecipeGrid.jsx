import { Link } from 'react-router-dom';
import '../styles/RecipeGrid.css';

const RecipeGrid = ({ recipes }) => {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal} className="recipe-card">
          <div className="recipe-image">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </div>
          <div className="recipe-info">
            <h3>{recipe.strMeal}</h3>
            <div className="recipe-meta">
              <span className="category">{recipe.strCategory}</span>
              <span className="area">{recipe.strArea}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeGrid; 