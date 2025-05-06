import React, { useState } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { useRecipeSearch } from '../hooks/useRecipeSearch';
import { useBookmarks } from '../hooks/useBookmarks';

function Home() {
  const { recipes, loading, error, searchRecipes } = useRecipeSearch();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (query) => {
    searchRecipes(query);
    setSearchPerformed(true);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Find Your Perfect Recipe
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        Search for recipes using ingredients you have at home
      </Typography>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}

      {error && (
        <Typography color="error" align="center" className="error">
          {error}
        </Typography>
      )}

      {searchPerformed && !loading && !error && recipes.length === 0 && (
        <Typography align="center" color="text.secondary">
          No recipes found. Try different ingredients.
        </Typography>
      )}

      <Grid container spacing={3} className="recipe-grid">
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
            <RecipeCard
              recipe={recipe}
              onBookmark={toggleBookmark}
              isBookmarked={isBookmarked(recipe.idMeal)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home; 