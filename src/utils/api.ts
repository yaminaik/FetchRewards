export const API_BASE = "https://frontend-take-home-service.fetch.com";

/** Fetch all breeds */
export const fetchBreeds = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE}/dogs/breeds`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch breeds.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/** Fetch dogs based on filters */
export const fetchDogs = async (queryParams: string): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE}/dogs/search?${queryParams}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch dogs.");
    const { resultIds, total } = await response.json();
    return { resultIds, total };
  } catch (error) {
    console.error(error);
    return { resultIds: [], total: 0 };
  }
};

/** Fetch details of specific dogs */
export const fetchDogDetails = async (dogIds: string[]): Promise<Dog[]> => {
  try {
    const response = await fetch(`${API_BASE}/dogs`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dogIds),
    });

    if (!response.ok) throw new Error("Failed to fetch dog details.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
