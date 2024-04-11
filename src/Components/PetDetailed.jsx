import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import ReminderSingle from './ReminderSingle';

function PetDetailed() {
  const [pet, setPet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPetDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`http://localhost:3003/api/pets/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setPet(data);
        } catch (error) {
          console.error("Error fetching pet:", error);
        }
      }
    };
    fetchPetDetails();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      {pet && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Pet Details</h2>
            <p className="text-gray-700"><strong>Name:</strong> {pet.name}</p>
            <p className="text-gray-700"><strong>Species:</strong> {pet.species}</p>
            <p className="text-gray-700"><strong>Breed:</strong> {pet.breed || "Unknown"}</p>
            <p className="text-gray-700"><strong>Age:</strong> {pet.age || "Unknown"}</p>
            <p className="text-gray-700"><strong>Created At:</strong> {new Date(pet.created_at).toLocaleString()}</p>
            <p className="text-gray-700"><strong>Updated At:</strong> {new Date(pet.updated_at).toLocaleString()}</p>
          </div>
          <div className="px-4 py-2 ">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Filtered Reminders</h2>
            {pet.filterdReminders.map((reminder) => (
              <ReminderSingle key={reminder.id} reminder={reminder} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PetDetailed;
