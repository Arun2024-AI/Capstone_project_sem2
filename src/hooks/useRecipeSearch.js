import { useState, useCallback } from 'react';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export function useRecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = useCallback(async (query) => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecipeById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();

      if (data.meals && data.meals[0]) {
        return data.meals[0];
      }
      throw new Error('Recipe not found');
    } catch (err) {
      setError('Failed to fetch recipe details. Please try again later.');
      console.error('Error fetching recipe details:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    recipes,
    loading,
    error,
    searchRecipes,
    getRecipeById,
  };
} 