// src/components/DogCard.tsx
import { Dog } from "lucide-react"
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogProps {
  dog: Dog;
  toggleFavorite: (dog: Dog) => void;
  isFavorite: boolean;
}

const DogCard: React.FC<DogProps> = ({ dog, toggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300">
      <div className="relative">
      <img src={dog.img} alt={dog.name} loading="lazy" className="w-full h-56 object-cover rounded-t-xl" />

        <button
          onClick={() => toggleFavorite(dog)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition"
        >
          <Dog className={`h-6 w-6 ${isFavorite ? "text-primary" : "text-gray-500"}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-bold text-primary">{dog.name}</h3>
        <p className="text-md text-gray-600">{dog.breed}</p>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">Age: {dog.age} years</span>
          <span className="text-sm text-gray-500">📍 {dog.zip_code}</span>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
