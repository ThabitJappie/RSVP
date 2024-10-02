import React, { useState } from 'react';

const EventForm = ({ onEventTypeSelect }) => {
  const [eventType, setEventType] = useState('');

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    onEventTypeSelect(e.target.value); // Pass selected event type to the parent component or backend
  };

  return (
    <div>
      <h2>Choose Event Type</h2>
      <select value={eventType} onChange={handleEventTypeChange}>
        <option value="">Select an event type</option>
        <option value="wedding">Wedding</option>
        <option value="birthday">Birthday</option>
        <option value="corporate">Corporate Event</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default EventForm;
