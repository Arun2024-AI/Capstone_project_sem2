import { useState, useEffect } from 'react';

const BOOKMARKS_KEY = 'recipe-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (recipe) => {
    setBookmarks((prev) => {
      if (!prev.find((r) => r.idMeal === recipe.idMeal)) {
        return [...prev, recipe];
      }
      return prev;
    });
  };

  const removeBookmark = (recipeId) => {
    setBookmarks((prev) => prev.filter((recipe) => recipe.idMeal !== recipeId));
  };

  const toggleBookmark = (recipe) => {
    if (isBookmarked(recipe.idMeal)) {
      removeBookmark(recipe.idMeal);
    } else {
      addBookmark(recipe);
    }
  };

  const isBookmarked = (recipeId) => {
    return bookmarks.some((recipe) => recipe.idMeal === recipeId);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
  };
} 