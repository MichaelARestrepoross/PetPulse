import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import ReminderSingle from './ReminderSingle';

function PetDetailed() {
  const [pet, setPet] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
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
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`http://localhost:3003/api/pets/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          // Pet deleted successfully, navigate to pets / petsindex
          navigate('/pets');
        } else {
          // Error if delete request fails
          console.error("Failed to delete pet");
        }
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/pets/${id}/edit`);
  };

  const handleCreateReminder = () => {
    navigate(`/pets/${id}/reminders/new`);
  };

  return (
    <div className="max-w-xl mx-auto">
      {pet && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-2">
              {/* Image div */}
              <div className="relative overflow-hidden rounded-lg" style={{ paddingTop: '100%' }}>
                {console.log(pet.image_url)}
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={pet.image_url}
                  alt={pet.name}
                />
              </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Pet Details</h2>
            <p className="text-gray-700"><strong>Name:</strong> {pet.name}</p>
            <p className="text-gray-700"><strong>Species:</strong> {pet.species}</p>
            <p className="text-gray-700"><strong>Breed:</strong> {pet.breed || "Unknown"}</p>
            <p className="text-gray-700"><strong>Age:</strong> {pet.age || "Unknown"}</p>
            <p className="text-gray-700"><strong>Created At:</strong> {new Date(pet.created_at).toLocaleString()}</p>
            <p className="text-gray-700"><strong>Updated At:</strong> {new Date(pet.updated_at).toLocaleString()}</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleDelete}>Delete</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>Edit</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleCreateReminder}>Create Reminder</button>
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
