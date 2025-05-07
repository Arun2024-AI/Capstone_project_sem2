import { useState, useCallback } from 'react';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export function useRecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiError = (err) => {
    console.error('API Error:', err);
    if (err.name === 'AbortError') {
      return 'Request timed out. Please try again.';
    }
    if (err.status === 429) {
      return 'Too many requests. Please try again later.';
    }
    if (err.status === 404) {
      return 'No recipes found.';
    }
    return 'Failed to fetch recipes. Please try again later.';
  };

  const fetchWithRetry = async (url, options, retries = MAX_RETRIES) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw { status: response.status, message: response.statusText };
      }
      return await response.json();
    } catch (err) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw err;
    }
  };

  const searchRecipes = useCallback(async (query) => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const data = await fetchWithRetry(
        `${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
        {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError('No recipes found. Try different ingredients.');
      }
    } catch (err) {
      setError(handleApiError(err));
      setRecipes([]);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  const getRecipeById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const data = await fetchWithRetry(
        `${API_BASE_URL}/lookup.php?i=${id}`,
        {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (data.meals && data.meals[0]) {
        return data.meals[0];
      }
      throw { status: 404, message: 'Recipe not found' };
    } catch (err) {
      setError(handleApiError(err));
      return null;
    } finally {
      clearTimeout(timeoutId);
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