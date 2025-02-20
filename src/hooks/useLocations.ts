import { useState, useEffect, useCallback } from "react";

// Define the location type
interface Location {
  zip_code: string;
  city: string;
  state: string;
}

// Custom hook to fetch locations
export const useLocations = () => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  //Load states once (No need for API call, as US states are static)
  useEffect(() => {
    setStates([
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
      "DC"
    ]);
  }, []);

  // Fetch cities only when `selectedState` changes
  const fetchCities = useCallback(async () => {
    if (!selectedState) return;

    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/locations/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ states: [selectedState], size: 100 }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch cities");

      const data = await response.json();

      //Remove duplicates efficiently
      const uniqueCities: string[] = data.results
      .map((loc: Location) => loc.city)
      .filter((city: string, index: number, arr: string[]) => arr.indexOf(city) === index);

    setCities(uniqueCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  }, [selectedState]);

  // Fetch ZIP codes only when `selectedCity` changes
  const fetchZipCodes = useCallback(async () => {
    if (!selectedCity || !selectedState) return;

    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/locations/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: selectedCity, states: [selectedState], size: 100 }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch ZIP codes");

      const data = await response.json();
      setZipCodes(data.results.map((loc: Location) => loc.zip_code));
    } catch (error) {
      console.error("Error fetching ZIP codes:", error);
      setZipCodes([]);
    }
  }, [selectedCity, selectedState]);

  //Use `useEffect` to fetch data when dependencies change
  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    fetchZipCodes();
  }, [fetchZipCodes]);

  return { states, cities, zipCodes, setSelectedState, setSelectedCity, selectedState, selectedCity };
};
