import React from 'react';
import { Modal, Box, Typography, IconButton, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Close, Bookmark, BookmarkBorder } from '@mui/icons-material';
import './RecipeModal.css';

function RecipeModal({ recipe, open, onClose, onBookmark, isBookmarked }) {
  if (!recipe) return null;

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
  } = recipe;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="recipe-modal-title"
      className="recipe-modal"
    >
      <Box className="modal-content">
        <IconButton onClick={onClose} className="close-btn">
          <Close />
        </IconButton>
        <IconButton
          onClick={() => onBookmark(recipe)}
          color="primary"
          className="bookmark-btn"
        >
          {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
        <img src={strMealThumb} alt={strMeal} className="recipe-image" />
        <Box className="recipe-details">
          <Typography variant="h4" component="h2" id="recipe-modal-title">
            {strMeal}
          </Typography>
          <Box className="recipe-meta">
            <Typography variant="subtitle1" color="text.secondary">
              {strCategory}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {strArea}
            </Typography>
          </Box>
          <Divider />
          <Typography variant="h6" component="h3" className="section-title">
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
          <Typography variant="h6" component="h3" className="section-title">
            Instructions
          </Typography>
          <Typography variant="body1" className="instructions">
            {strInstructions}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default RecipeModal; 