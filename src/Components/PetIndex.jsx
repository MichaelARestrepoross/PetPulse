import React, { useState, useEffect } from 'react';

function PetIndex({ handleLogout }) {
  const [pets, setPets] = useState([]);

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Pet Details</h2>
              <p className="text-gray-700"><strong>Name:</strong> {pet.name}</p>
              <p className="text-gray-700"><strong>Species:</strong> {pet.species}</p>
              <p className="text-gray-700"><strong>Breed:</strong> {pet.breed || "Unknown"}</p>
              <p className="text-gray-700"><strong>Age:</strong> {pet.age || "Unknown"}</p>
              <p className="text-gray-700"><strong>Created At:</strong> {new Date(pet.created_at).toLocaleString()}</p>
              <p className="text-gray-700"><strong>Updated At:</strong> {new Date(pet.updated_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetIndex;
