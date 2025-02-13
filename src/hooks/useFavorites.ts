import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const API_BASE = "https://frontend-take-home-service.fetch.com";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  // Favorite Toggle
  const toggleFavorite = useCallback((dog: Dog) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === dog.id);
      return isFavorite ? prev.filter((fav) => fav.id !== dog.id) : [...prev, dog];
    });
  
    // ✅ Move toast outside the state update function
    setTimeout(() => {
      toast.success(favorites.some((fav) => fav.id === dog.id) ? "Removed from favorites!" : "Added to favorites!");
    }, 0);
  }, [favorites]);

  // Remove a single favorite
  const removeFavorite = useCallback((dogId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== dogId));
    setMatchedDog(null);
    toast.success("Removed from favorites.");
  }, []);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
    setMatchedDog(null);
    toast.success("All favorites cleared!");
  }, []);

  // Generate match
  const generateMatch = useCallback(async () => {
    if (favorites.length === 0) {
      toast.error("Please add some favorites first.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/dogs/match`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favorites.map((dog) => dog.id)),
      });

      if (!response.ok) throw new Error("Failed to generate match.");
      const { match } = await response.json();

      const matchResponse = await fetch(`${API_BASE}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([match]),
      });

      if (!matchResponse.ok) throw new Error("Failed to fetch matched dog details.");
      const [matchedDogDetails] = await matchResponse.json();
      setMatchedDog(matchedDogDetails);
      toast.success("Match found!");
    } catch (error) {
      toast.error("Error generating match.");
    }
  }, [favorites]);

  return {
    favorites,
    setFavorites,
    matchedDog,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    generateMatch,
  };
};
