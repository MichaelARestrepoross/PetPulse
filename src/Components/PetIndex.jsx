import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReminderIndex from './ReminderIndex';

function PetIndex({ handleLogout,refresh}) {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${URL}/api/pets`);
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);

  const handlePetClick = (petID) => {
    // Navigate to the details page of the pet
    navigate(`/pets/${petID}`);
  };

  const handleCreatePetProfile = () => {
    navigate("/pets/new");
  };

  return (
    <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-24 mt-20 mb-20">
        <ReminderIndex refresh = {refresh}/>
      <div className="md:overflow-y-auto m-0">
        <h2 className='text-3xl text-white text-center my-5 font-semibold border-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-sky-300'> My Pets</h2>
        <div className='flex justify-center mb-2'>
          <button
            onClick={handleCreatePetProfile}
            className="bg-blue-500 w-96 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            Create Pet Profile
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
          {pets.map((pet) => (
            <div
            key={pet.id}
            onClick={() => handlePetClick(pet.id)}
            className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg"
            >
              {/* Image div */}
              <div className="relative overflow-hidden rounded-lg mt-6" style={{ paddingTop: '100%' }}>
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={pet.image_url}
                  alt={pet.name}
                  />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2"><strong>Pet:</strong> {pet.name}</h2>
                <p className="text-gray-700"><strong>Species:</strong> {pet.species}</p>
                <p className="text-gray-700"><strong>Breed:</strong> {pet.breed || "Unknown"}</p>
                <p className="text-gray-700"><strong>Age:</strong> {pet.age || "Unknown"}</p>
                {/* <p className="text-gray-700"><strong>Created At:</strong> {new Date(pet.created_at).toLocaleString()}</p> */}
                {/* <p className="text-gray-700"><strong>Updated At:</strong> {new Date(pet.updated_at).toLocaleString()}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default PetIndex;
