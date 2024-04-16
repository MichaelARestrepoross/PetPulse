import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReminderForm = () => {
  const API_URL = "http://localhost:3003";
  const navigate = useNavigate();
  const { id, reminderId, action } = useParams(); // action will be "new" or "edit"

  // Log the action parameter to debug
  console.log("Action parameter:", action);

  const isNewReminder = action === "new";

  console.log("isNewReminder:", isNewReminder);

  const [formData, setFormData] = useState({
    pet_id: id, // Pet ID will be received from the route params
    reminder_type: "",
    reminder_message: "",
    reminder_time: isNewReminder ? "" : new Date().toISOString(), // Default to current date and time if editing
    updated_at: new Date().toISOString(),
  });
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

    // Function to format reminder time
    const formatReminderTime = (timeString) => {
      const date = new Date(timeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const convertToBackendFormat = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    };

  useEffect(() => {
    if (!isNewReminder && reminderId) {
      // Fetch reminder details if editing and reminderId is defined
      const fetchReminderDataForm = async () => {
        try {
          const response = await fetch(`${API_URL}/api/reminders/${reminderId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch reminder details");
          }
          const data = await response.json();
          
          // Extract date and time portion and remove milliseconds
          // const formattedReminderTime = data.reminder_time.slice(0, 16);
          console.log("unEdited:",data.reminder_time);
          const formattedReminderTime = formatReminderTime(data.reminder_time);
          console.log("Edited:",formattedReminderTime);

          setFormData({
            ...data,
            reminder_time: formattedReminderTime,
            updated_at: new Date().toISOString(),
          });
          setCreatedAt(new Date(data.created_at).toLocaleString());
          setUpdatedAt(new Date(data.updated_at).toLocaleString());
        } catch (error) {
          console.error("Error fetching reminder details:", error.message);
        }
      };
      fetchReminderDataForm();
    }
  }, [isNewReminder, reminderId]);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
  
    // Construct UTC timestamp from individual date and time components
    const year = parseInt(formData.reminder_time.substring(0, 4));
    const month = parseInt(formData.reminder_time.substring(5, 7)) - 1; // Months are zero-based
    const day = parseInt(formData.reminder_time.substring(8, 10));
    const hour = parseInt(formData.reminder_time.substring(11, 13));
    const minute = parseInt(formData.reminder_time.substring(14, 16));
  
    const reminderTimeUTC = new Date(Date.UTC(year, month, day, hour, minute));
  
    const formattedFormData = {
      ...formData,
      reminder_time: reminderTimeUTC.toISOString(), // Convert to ISO string
    };
  
    const requestOptions = {
      method: isNewReminder ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formattedFormData),
    };
  
    try {
      // Construct the URL differently for new reminders
      const url = isNewReminder ? `${API_URL}/api/reminders` : `${API_URL}/api/reminders/${reminderId}`;
      const response = await fetch(url, requestOptions);
  
      if (response.ok) {
        console.log(isNewReminder ? "Reminder created successfully" : "Reminder updated successfully");
        navigate(`/pets/${id}`); // Navigate back to the pet details page
      } else {
        console.error(isNewReminder ? "Failed to create reminder" : "Failed to update reminder");
        console.error("Response status:", response.status);
        const responseBody = await response.json();
        console.error("Response body:", responseBody);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
  

  return (
    <div className="container mx-auto border p-2">
      <form onSubmit={handleSubmit} 
        className="max-w-md mx-auto border "
      >
        <div className="flex items-center justify-center border h-10 bg-blue-700 bg-gradient-to-tr from-blue-400 to-transparent">
          <p className="text-white">Reminder's Form</p>
        </div>
      <div className="flex flex-col items-center justify-center p-2">

        <div className="mb-4">
          <label htmlFor="pet_id" className="block text-sm font-medium text-gray-700 text-center w-full">
            Pet ID
          </label>
          <input
            type="text"
            id="pet_id"
            name="pet_id"
            value={formData.pet_id}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-60"
            />
        </div>
        <div className="mb-4">
        <label htmlFor="reminder_type" className="block text-sm font-medium text-gray-700 text-center w-full">
          Reminder Type
        </label>
          <input
            type="text"
            id="reminder_type"
            name="reminder_type"
            value={formData.reminder_type}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-60"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="reminder_message" className="block text-sm font-medium text-gray-700 text-center w-full">
            Reminder Message
          </label>
          <textarea
            id="reminder_message"
            name="reminder_message"
            value={formData.reminder_message}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-60"
            rows="4" 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reminder_time" className="block text-sm font-medium text-gray-700 text-center w-full">
            Reminder Time
          </label>
          <input
            type="datetime-local"
            id="reminder_time"
            name="reminder_time"
            value={formData.reminder_time}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          {isNewReminder ? "Create Reminder" : "Update Reminder"}
        </button>
      </div>
      </form>
      {/* Display created and updated dates */}
      {!isNewReminder && (
        <div className="mt-4 text-gray-700">
          <p>Created At: {createdAt}</p>
        </div>
      )}
    </div>
  );
};

export default ReminderForm;
