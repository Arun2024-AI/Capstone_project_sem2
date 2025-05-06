import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import './RecipeCard.css';

function RecipeCard({ recipe, onBookmark, isBookmarked }) {
  const { idMeal, strMeal, strMealThumb, strCategory, strArea } = recipe;

  return (
    <Card className="recipe-card">
      <Link to={`/recipe/${idMeal}`} className="recipe-link">
        <CardMedia
          component="img"
          height="200"
          image={strMealThumb}
          alt={strMeal}
          className="recipe-image"
        />
      </Link>
      <CardContent>
        <Box className="recipe-header">
          <Typography variant="h6" component="h2" className="recipe-title">
            {strMeal}
          </Typography>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              onBookmark(recipe);
            }}
            color="primary"
            className="bookmark-btn"
          >
            {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Box>
        <Box className="recipe-meta">
          <Typography variant="body2" color="text.secondary">
            {strCategory}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {strArea}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RecipeCard; 