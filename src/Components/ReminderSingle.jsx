import React from 'react';

function ReminderSingle({ reminder }) {

  // Function to format reminder time
  const formatReminderTime = (timeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return new Date(timeString).toLocaleString(undefined, options);
  };

  return (
    <div className="max-w-xl mx-auto m-2 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Reminder Details</h2>
        <p className="text-gray-700"><strong>Pet Name:</strong> {reminder.pet_id}</p>
        <p className="text-gray-700"><strong>Pet ID:</strong> {reminder.pet_id}</p>
        <p className="text-gray-700"><strong>Reminder Type:</strong> {reminder.reminder_type}</p>
        <p className="text-gray-700"><strong>Reminder Message:</strong> {reminder.reminder_message}</p>
        <p className="text-gray-700"><strong>Reminder Time:</strong> {formatReminderTime(reminder.reminder_time)}</p>
        <p className="text-gray-700"><strong>Created At:</strong> {formatReminderTime(reminder.created_at)}</p>
      </div>
    </div>
  );
}

export default ReminderSingle;