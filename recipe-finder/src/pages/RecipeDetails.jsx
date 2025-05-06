import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Divider, List, ListItem, ListItemText, IconButton, CircularProgress } from '@mui/material';
import { ArrowBack, Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useRecipeSearch } from '../hooks/useRecipeSearch';
import { useBookmarks } from '../hooks/useBookmarks';
import '../styles/RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, loading, error } = useRecipeSearch();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await getRecipeById(id);
      if (recipeData) {
        setRecipe(recipeData);
      }
    };
    fetchRecipe();
  }, [id, getRecipeById]);

  if (loading) {
    return (
      <Container>
        <div className="loading">
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" className="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container>
        <Typography align="center" color="text.secondary">
          Recipe not found.
        </Typography>
      </Container>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <Container>
      <Box className="recipe-details-page">
        <IconButton onClick={() => navigate(-1)} className="back-btn">
          <ArrowBack />
        </IconButton>

        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />

        <Box className="recipe-header">
          <Typography variant="h4" component="h1">
            {recipe.strMeal}
          </Typography>
          <IconButton
            onClick={() => toggleBookmark(recipe)}
            color="primary"
            className="bookmark-btn"
          >
            {isBookmarked(recipe.idMeal) ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Box>

        <Box className="recipe-meta">
          <Typography variant="subtitle1" color="text.secondary">
            {recipe.strCategory}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {recipe.strArea}
          </Typography>
        </Box>

        <Divider />

        <Typography variant="h6" component="h2" className="section-title">
          Ingredients
        </Typography>
        <List>
          {ingredients.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.ingredient}
                secondary={item.measure}
              />
            </ListItem>
          ))}
        </List>

        <Divider />

        <Typography variant="h6" component="h2" className="section-title">
          Instructions
        </Typography>
        <Typography variant="body1" className="instructions">
          {recipe.strInstructions}
        </Typography>
      </Box>
    </Container>
  );
}

export default RecipeDetails; 