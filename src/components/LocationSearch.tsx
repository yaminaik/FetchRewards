import { useEffect, useState } from "react";
import { useLocations } from "../hooks/useLocations";

interface LocationSearchProps {
  setLocationZipCodes: (zipCodes: string[]) => void;
  setLoading: (loading: boolean) => void;
}

const LocationSearch = ({ setLocationZipCodes, setLoading }: LocationSearchProps) => {
  const {
    states,
    cities,
    zipCodes,
    setSelectedState,
    setSelectedCity,
    selectedState,
    selectedCity,
  } = useLocations();

  const [selectedZip, setSelectedZip] = useState<string>("");

  // Ensure `selectedZip` is updated when a single ZIP is available
  useEffect(() => {
    if (zipCodes.length === 1 && zipCodes[0] !== selectedZip) {
      setSelectedZip(zipCodes[0]);
      setLocationZipCodes([zipCodes[0]]);
      setLoading(false);
    }
  }, [zipCodes, selectedZip, setLocationZipCodes, setLoading]);

  const handleZipSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newZip = event.target.value;
    if (newZip !== selectedZip) {
      setSelectedZip(newZip);
      setLocationZipCodes([newZip]);
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const clearFilters = () => {
    setLocationZipCodes([]);
    setSelectedState("");
    setSelectedCity("");
    setSelectedZip("");
   
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 bg-white/50 backdrop-blur-lg rounded-xl p-4 shadow-lg">
      {/* State Dropdown */}
      <select 
        value={selectedState} 
        onChange={(e) => setSelectedState(e.target.value)}  
        className="w-40 md:w-48 px-3 py-2 rounded-lg border border-muted/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
  
      {/* City Dropdown */}
      <select 
        value={selectedCity} 
        onChange={(e) => setSelectedCity(e.target.value)} 
        disabled={!selectedState}  
        className="w-40 md:w-48 px-3 py-2 rounded-lg border border-muted/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
  
      {/* ZIP Code Dropdown (Only Shows If Multiple ZIPs Exist) */}
      {zipCodes.length > 1 && (
        <select 
          value={selectedZip} 
          onChange={handleZipSelection}  
          className="w-40 md:w-48 px-3 py-2 rounded-lg border border-muted/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
        >
          <option value="">Select ZIP Code</option>
          {zipCodes.map((zip) => (
            <option key={zip} value={zip}>{zip}</option>
          ))}
        </select>
      )}


      <button
        onClick={clearFilters}
        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all"
      >
        Clear Location Filters
      </button>
    </div>
  );
};

export default LocationSearch;
