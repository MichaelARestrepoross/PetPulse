import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReminderIndex from './ReminderIndex';

function PetIndex({ handleLogout }) {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/pets');
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

  const handleCreateReminder = () => {
    navigate(`/pets/${petID}/reminders/new`);
  };

  return (
    <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-4">
        <ReminderIndex />
      <div className="md:overflow-y-auto m-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              onClick={() => handlePetClick(pet.id)}
              className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg"
            >
              {/* Image div */}
              <div className="relative overflow-hidden rounded-lg" style={{ paddingTop: '100%' }}>
                {console.log(pet.image_url)}
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
