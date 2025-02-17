import { useProfile } from "../hooks/useProfile";
import DogCard from "../components/DogCard";

const ProfilePage = () => {
  const { profile } = useProfile();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">Your Profile 🐶</h1>

      {/* Saved Matches */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Your Matches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.matches.length > 0 ? (
            profile.matches.map((dog) => <DogCard key={dog.id} dog={dog}  isFavorite={true}   />)
          ) : (
            <p className="text-gray-500">No matches saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
