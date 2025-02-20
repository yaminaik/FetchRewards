import { useState } from "react";
import { Dog as DogIcon, UserRound } from "lucide-react";
import SearchBar from "../components/SearchBar";
import DogCard from "../components/DogCard";
import Pagination from "../components/Pagination";
import FavoritesModal from "../components/FavoritesModal";
import { useDogs } from "../hooks/useDogs";
import { useBreeds } from "../hooks/useBreeds";
import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";
import LocationSearch from "../components/LocationSearch";

interface SearchPageProps {
  onLogout: () => void;
}

function SearchPage({ onLogout }: SearchPageProps) {
  const navigate = useNavigate();
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [zipCode, setZipCode] = useState<string>("");
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch breeds
  const breeds = useBreeds();

  // Fetch dogs based on filters
  const { dogs, totalResults } = useDogs(
    currentPage,
    sortOrder,
    selectedBreed,
    ageMin,
    ageMax,
    zipCode
  );

  // Manage favorites
  const { favorites, toggleFavorite, removeFavorite, clearFavorites, matchedDog, generateMatch } =
    useFavorites();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");

      localStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("userSession");
      localStorage.removeItem("userProfile");
      onLogout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handle ZIP code updates
  const handleZipCodeUpdate = (newZipCodes: string[]) => {
    setLoading(true);
    setZipCode(newZipCodes.length > 0 ? newZipCodes.join(",") : "");
    setCurrentPage(1); // Reset pagination when new location is selected

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-screen bg-background px-4 py-8 md:px-8 flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center max-w-7xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-primary flex items-center gap-3 mb-4">
          <DogIcon className="h-12 w-12 animate-bounce" />
          Find Your Perfect Companion
        </h1>

        {/* Profile & Logout Buttons */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => navigate("/profile")}
            className="bg-orange-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-500 transition-all"
          >
            <UserRound className="h-5 w-5" />
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-orange-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Location Filters */}
      <LocationSearch setLocationZipCodes={handleZipCodeUpdate} setLoading={setLoading} />

      {/* Search Bar */}
      <SearchBar
        breeds={breeds}
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        ageMin={ageMin}
        setAgeMin={setAgeMin}
        ageMax={ageMax}
        setAgeMax={setAgeMax}
        zipCode={zipCode}
        setZipCode={setZipCode}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        favoritesCount={favorites.length}
        openFavorites={() => setModalOpen(true)}
      />

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-lg text-gray-600 mt-4">
          🔍 Searching for dogs in the selected location...
        </p>
      )}

      {/* Dogs Grid or "No Dogs Found" Message */}
      <div className="py-2">
  {loading ? (
    <p className="text-center text-lg text-gray-600">🔍 Searching for dogs...</p>
  ) : dogs.length === 0 && !loading ? (
    <p className="text-center text-lg text-red-500 font-semibold">
      🐶 No dogs found. Try adjusting your filters!
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.some((favDog) => favDog.id === dog.id)}
        />
      ))}
    </div>
  )}
</div>


      {/* Pagination */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalResults={totalResults} />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        favorites={favorites}
        removeFavorite={removeFavorite}
        clearFavorites={clearFavorites}
        generateMatch={generateMatch}
        matchedDog={matchedDog}
      />
    </div>
  );
}

export default SearchPage;
