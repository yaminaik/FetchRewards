import { useProfile } from "../hooks/useProfile";
import { Dog } from "../types";

interface FavoritesModalProps {
  isOpen: boolean;
  closeModal: () => void;
  favorites: Dog[];
  removeFavorite: (dogId: string) => void;
  clearFavorites: () => void;
  generateMatch: () => void;
  matchedDog: Dog | null;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  closeModal,
  favorites,
  removeFavorite,
  clearFavorites,
  generateMatch,
  matchedDog,
}) => {
  const { saveMatch, profile } = useProfile();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-white/30 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✖
        </button>

        <h2 className="text-2xl font-semibold text-primary mb-4">Your Favorite Dogs</h2>

        {favorites.length > 0 && (
          <button onClick={clearFavorites} className="mb-4 bg-primary text-white py-1 px-3 rounded-md hover:bg-primary/90 transition-all">
            Remove All
          </button>
        )}

        {favorites.length === 0 ? (
          <p className="text-gray-600 text-center">No favorites added yet.</p>
        ) : (
          <ul className="max-h-60 overflow-y-auto">
            {favorites.map((dog) => (
              <li key={dog.id} className="flex items-center justify-between p-2 border-b">
                <img src={dog.img} alt={dog.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="flex flex-col flex-grow ml-3">
                  <span className="text-lg font-semibold">{dog.name}</span>
                  <span className="text-sm text-gray-600">Breed: {dog.breed}</span>
                  <span className="text-sm text-gray-600">Age: {dog.age} years</span>
                  <span className="text-sm text-gray-600">Location: {dog.zip_code}</span>
                </div>
                <button
                  onClick={() => removeFavorite(dog.id)}
                  className="bg-primary text-white py-1 px-3 rounded-md hover:bg-primary/90 transition-all"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}

        {favorites.length > 0 && (
          <button onClick={generateMatch} className="w-full bg-primary text-white py-2 rounded-lg mt-4 hover:bg-primary/90 transition-all">
            Find Your Perfect Match
          </button>
        )}

        {/* Save Matched Dog to Profile */}
        {matchedDog && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <h3 className="text-xl font-semibold text-primary">Your Match:</h3>
            <div className="flex items-center gap-4 mt-2">
              <img src={matchedDog.img} alt={matchedDog.name} className="h-16 w-16 rounded-full object-cover" />
              <div>
                <p className="text-lg font-semibold">{matchedDog.name}</p>
                <p className="text-sm text-gray-600">Breed: {matchedDog.breed}</p>
                <p className="text-sm text-gray-600">Age: {matchedDog.age} years</p>
              </div>
            </div>
            <button
              onClick={() => saveMatch(matchedDog)}
              className="w-full bg-primary/90    text-white py-2 rounded-lg mt-4 hover:bg-orange-800 transition-all"
              disabled={profile.matches.some((match) => match.id === matchedDog.id)}
            >
              {profile.matches.some((match) => match.id === matchedDog.id) ? "Already Saved" : "Save Match"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;
