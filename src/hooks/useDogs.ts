import { useState, useEffect, useCallback } from "react";
import { fetchDogs, fetchDogDetails } from "../utils/api";
import { toast } from "react-hot-toast";

export const useDogs = (
  currentPage: number,
  sortOrder: "asc" | "desc",
  selectedBreed: string,
  ageMin: number | "",
  ageMax: number | "",
  zipCode: string
) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = `size=10&from=${(currentPage - 1) * 10}&sort=breed:${sortOrder}`;
      if (selectedBreed) query += `&breeds=${encodeURIComponent(selectedBreed)}`;
      if (ageMin !== "") query += `&ageMin=${ageMin}`;
      if (ageMax !== "") query += `&ageMax=${ageMax}`;
      if (zipCode.trim().length === 5) query += `&zipCodes=${zipCode}`;

      const { resultIds, total } = await fetchDogs(query);
      setTotalResults(total);

      if (resultIds.length === 0) return;

      const dogDetails = await fetchDogDetails(resultIds);
      setDogs(dogDetails);
    } catch (error) {
      setError("Failed to fetch dogs. Please try again.");
      toast.error("Error fetching dogs.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOrder, selectedBreed, ageMin, ageMax, zipCode]);

  useEffect(() => {
    loadDogs();
  }, [loadDogs]);

  return { dogs, totalResults, loading, error };
};
