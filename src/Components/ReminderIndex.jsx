import React, { useState, useEffect } from 'react';
import ReminderSingle from './ReminderSingle';

function ReminderIndex() {
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
  }, [remindersToggle]);

  return (
    <div className="max-w-4xl mx-auto overflow-y-auto "style={{ maxHeight: '500px' }}>
      {reminders.map((reminder) => (
        <ReminderSingle key={reminder.id} 
          reminder={reminder} 
          remindersToggle={remindersToggle}
          setRemindersToggle={setRemindersToggle}
        />
      ))}
    </div>
  );
}

export default ReminderIndex;
