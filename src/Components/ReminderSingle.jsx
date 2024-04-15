import React from 'react';
import { useNavigate } from 'react-router-dom';

function ReminderSingle({ reminder }) {
  const navigate = useNavigate(); 

  // Function to format reminder time
  const formatReminderTime = (timeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return new Date(timeString).toLocaleString(undefined, options);
  };

  const handleEditReminder = (petId, reminderId) => {
    navigate(`/pets/${petId}/reminders/edit/${reminderId}`);
  };

  return (
    <div className="max-w-xl mx-auto m-2 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Reminder</h2>
        <h2 className="text-gray-700"><strong>Pet Name:</strong> {reminder.pet_name}</h2>
        <p className="text-gray-700"><strong>Pet ID:</strong> {reminder.pet_id}</p>
        <p className="text-gray-700"><strong>Reminder Type:</strong> {reminder.reminder_type}</p>
        <p className="text-gray-700"><strong>Reminder Message:</strong> {reminder.reminder_message}</p>
        <p className="text-gray-700"><strong>Reminder Time:</strong> {formatReminderTime(reminder.reminder_time)}</p>
        <p className="text-gray-700"><strong>Created At:</strong> {formatReminderTime(reminder.created_at)}</p>
        {/* Button to navigate to edit reminder */}
        <button
          onClick={() => handleEditReminder(reminder.pet_id, reminder.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Reminder
        </button>
      </div>
    </div>
  );
}

export default ReminderSingle;
