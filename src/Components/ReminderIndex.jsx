import React, { useState, useEffect } from 'react';
import ReminderSingle from './ReminderSingle';

function ReminderIndex({refresh}) {
  const [reminders, setReminders] = useState([]);
  const [remindersToggle,setRemindersToggle] = useState(false);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/reminders');
        if (!response.ok) {
          throw new Error('Failed to fetch reminders');
        }
        const data = await response.json();
        setReminders(data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };
    fetchReminders();
  }, [remindersToggle, refresh]);

  return (
    
      <div>
      <h2 className='text-3xl text-white text-center my-5 font-semibold border-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-sky-300'>
        My Reminders
      </h2>
    <div className="max-w-4xl mx-auto overflow-y-auto "style={{ maxHeight: '550px' }}>
      {reminders.map((reminder) => (
        <ReminderSingle key={reminder.id} 
        reminder={reminder} 
        remindersToggle={remindersToggle}
        setRemindersToggle={setRemindersToggle}
        />
        ))}
    </div>
        </div>
  );
}

export default ReminderIndex;
