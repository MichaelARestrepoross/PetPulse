import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PetForm = () => {
  const API_URL = "http://localhost:3003";
  const navigate = useNavigate();
  const { id } = useParams();
  // Retrieve user data from local storage
  const storedUserData = localStorage.getItem('userData');
  // Parse the stored user data into an object
  const userData = storedUserData ? JSON.parse(storedUserData) : null;

  const [formData, setFormData] = useState({
    user_id:userData ? userData.id : "",
    name: "",
    species: "",
    breed: "",
    age: 0,
    updated_at:new Date().toISOString(),
  });
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  

  useEffect(() => {
    console.log(new Date().toISOString())
    const fetchUserDataForm = async () => {
      try {

        
        // Fetch pet details if editing
        if (id) {
          const response = await fetch(`${API_URL}/api/pets/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch pet details');
          }
          const data = await response.json();
          setFormData({
            user_id: userData ? userData.id : "", // Access user ID from parsed user data
            name: data.name,
            species: data.species,
            breed: data.breed || "",
            age: data.age || 0,
            updated_at:new Date().toISOString(),
          });
          setCreatedAt(new Date(data.created_at).toLocaleString());
          setUpdatedAt(new Date(data.updated_at).toLocaleString());
        }
      } catch (error) {
        console.error("Error fetching pet details:", error.message);
      }
    };
  
    // Call the fetchUserData function
    fetchUserDataForm();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    try {
      console.log(id)
      const url = `${API_URL}/api/pets${id ? `/${id}` : ""}`;
      console.log(url);
      const response = await fetch(url, requestOptions);
      
      if (response.ok) {
        console.log(id ? "Pet updated successfully" : "Pet created successfully");
        navigate(id ? `/pets/${id}`:"/pets"); 
      } else {
        console.error(id ? "Failed to update pet" : "Failed to create pet");
        console.error("Response status:", response.status);
        const responseBody = await response.json();
        console.error("Response body:", responseBody);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="species" className="block text-sm font-medium text-gray-700">
            Species
          </label>
          <input
            type="text"
            id="species"
            name="species"
            value={formData.species}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
            Breed
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          {id ? "Update Pet" : "Create Pet"}
        </button>
      </form>
      {/* Display created and updated dates */}
      {id && (
        <div className="mt-4 text-gray-700">
          <p>Created At: {createdAt}</p>
          <p>Updated At: {updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default PetForm;
