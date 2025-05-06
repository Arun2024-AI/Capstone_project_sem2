import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { useBookmarks } from '../hooks/useBookmarks';

function Bookmarks() {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Your Bookmarked Recipes
      </Typography>

      {bookmarks.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No bookmarked recipes yet. Start searching and bookmark your favorite recipes!
        </Typography>
      ) : (
        <Grid container spacing={3} className="recipe-grid">
          {bookmarks.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
              <RecipeCard
                recipe={recipe}
                onBookmark={toggleBookmark}
                isBookmarked={isBookmarked(recipe.idMeal)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Bookmarks; 