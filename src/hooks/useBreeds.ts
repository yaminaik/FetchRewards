import { useState, useEffect } from "react";
import { fetchBreeds } from "../utils/api";
import { toast } from "react-hot-toast";

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const breedsData = await fetchBreeds();
        if (!Array.isArray(breedsData)) throw new Error("Invalid breed data");

        setBreeds(breedsData);
      } catch (err) {

        toast.error("Error fetching breeds.");
        setBreeds([]); // Ensure breeds is always an array
      }
    };

    loadBreeds();
  }, []);

  return breeds;
};
