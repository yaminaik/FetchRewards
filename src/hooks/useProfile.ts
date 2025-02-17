import { useState, useEffect } from "react";
import { Dog } from "../types";
import toast from "react-hot-toast";

const LOCAL_STORAGE_KEY = "userProfile";

interface UserProfile {
  favorites: Dog[];
  matches: Dog[];
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedProfile ? JSON.parse(savedProfile) : { favorites: [], matches: [] };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  // Save a matched dog
  const saveMatch = (dog: Dog) => {
    setProfile((prev) => {
      if (prev.matches.some((match) => match.id === dog.id)) {
        toast.error("This dog is already saved!");
        return prev;
      }
      toast.success("Dog saved successfully!");
      return { ...prev, matches: [...prev.matches, dog] };
    });
  };

  return { profile, saveMatch };
};
