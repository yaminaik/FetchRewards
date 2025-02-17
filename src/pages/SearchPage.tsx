import { useState } from "react";
import { Dog as DogIcon,UserRound} from "lucide-react";
import SearchBar from "../components/SearchBar";
import DogCard from "../components/DogCard";
import Pagination from "../components/Pagination";
import FavoritesModal from "../components/FavoritesModal";
import { useDogs } from "../hooks/useDogs"; 
import { useBreeds } from "../hooks/useBreeds"; 
import { useFavorites } from "../hooks/useFavorites"; 
import { useNavigate } from "react-router-dom";

interface SearchPageProps {
  onLogout: () => void; 
}

function SearchPage({ onLogout }: SearchPageProps){
  const navigate = useNavigate();
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [zipCode, setZipCode] = useState<string>("");
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [modalOpen, setModalOpen] = useState(false);


  // ✅ Fetch breeds using custom hook
  const breeds = useBreeds();

  // ✅ Fetch dogs using custom hook
  const { dogs, totalResults } = useDogs(currentPage, sortOrder, selectedBreed, ageMin, ageMax, zipCode);

  // ✅ Manage favorites using custom hook
  const { favorites, toggleFavorite, removeFavorite, clearFavorites, matchedDog, generateMatch } = useFavorites();
  const handleLogout = async () => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // ✅ Clear authentication data
      localStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("userSession");
      localStorage.removeItem("userProfile");
      // ✅ Update authentication state in App.tsx
      onLogout();

      // ✅ Redirect to login page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };



  return (
    <div className="w-screen bg-background px-4 py-8 md:px-8 flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center max-w-7xl mx-auto mb-6">
        {/* Tagline - Centered */}
        <h1 className="text-4xl font-bold text-primary flex items-center gap-3 mb-4">
          <DogIcon className="h-12 w-12 animate-bounce" />
          Find Your Perfect Companion
        </h1>

        {/* Profile and Logout Buttons BELOW the tagline */}
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
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>


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
        openFavorites={() => setModalOpen(true)} />

      {/* Dogs Grid */}
      <div className=" py-2">
        {dogs.length === 0 ? (
          <p className="text-center text-gray-600">🐶 No dogs found. Try adjusting your filters!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.some(favDog => favDog.id === dog.id)} />


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
        matchedDog={matchedDog} />
    </div>
  );
}

export default SearchPage;
