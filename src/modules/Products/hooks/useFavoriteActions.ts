import { useState, useCallback } from "react";

/**
 * Hook for managing product favorites state and actions
 * Separates favorites business logic from UI components
 */
export const useFavoriteActions = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (productId: string): boolean => {
      return favorites.has(productId);
    },
    [favorites],
  );

  const addFavorite = useCallback((productId: string) => {
    setFavorites((prev) => new Set(prev).add(productId));
  }, []);

  const removeFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(productId);
      return newFavorites;
    });
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
};