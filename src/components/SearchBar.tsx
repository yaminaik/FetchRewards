
import { Dog, ArrowUpDown } from "lucide-react";

interface SearchBarProps {
  breeds: string[];
  selectedBreed: string;
  setSelectedBreed: (value: string) => void;
  ageMin: number | "";
  setAgeMin: (value: number | "") => void;
  ageMax: number | "";
  setAgeMax: (value: number | "") => void;
  zipCode: string;
  setZipCode: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  favoritesCount: number;
  openFavorites: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  breeds,
  selectedBreed,
  setSelectedBreed,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
  zipCode,
  setZipCode,
  sortOrder,
  setSortOrder,
  favoritesCount,
  openFavorites,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-lg rounded-xl p-4 shadow-lg">

      {/* Breed Filter */}
      <select
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
        className="w-full md:w-48 px-4 py-2 rounded-lg border border-muted/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
      >
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {/* Age Min */}
      <input
        type="number"
        placeholder="Min Age"
        value={ageMin}
        onChange={(e) => setAgeMin(e.target.value === "" ? "" : parseInt(e.target.value))}
        className="w-24 px-4 py-2 rounded-lg border border-muted/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
      />

      {/* Age Max */}
      <input
        type="number"
        placeholder="Max Age"
        value={ageMax}
        onChange={(e) => setAgeMax(e.target.value === "" ? "" : parseInt(e.target.value))}
        className="w-24 px-4 py-2 rounded-lg border border-muted/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
      />

      {/* ZIP Code */}
      <input
        type="text"
        placeholder="ZIP Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
        maxLength={5}
        className="w-32 px-4 py-2 rounded-lg border border-muted/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
      />

      {/* Sort Button */}
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all"
      >
        <ArrowUpDown className="h-4 w-4" />
        Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>
            <button
        onClick={() => {
          setSelectedBreed("");
          setAgeMin("");
          setAgeMax("");
          setZipCode("");
          setSortOrder("asc");
        }}
        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all"
      >
        Clear Filters
      </button>

      {/* Favorites Button (Inside Search Bar) */}
      <div className="relative cursor-pointer" onClick={openFavorites}>
      <Dog className="h-10 w-10 text-primary" />
        {favoritesCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
            {favoritesCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
