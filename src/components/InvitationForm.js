import React, { useState } from 'react';

const InvitationForm = ({ design }) => {
  const [eventDetails, setEventDetails] = useState({
    date: '',
    time: '',
    location: '',
    host: '',
    photos: [],
    font: '',
    color: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    setEventDetails({ ...eventDetails, photos: [...eventDetails.photos, ...files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the customized invitation details to the backend or API
    console.log('Customized Invitation:', eventDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customize Invitation</h2>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={eventDetails.date}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={eventDetails.time}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={eventDetails.location}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Host:</label>
        <input
          type="text"
          name="host"
          value={eventDetails.host}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Photos:</label>
        <input
          type="file"
          name="photos"
          multiple
          onChange={handlePhotoUpload}
        />
      </div>
      <div>
        <label>Font:</label>
        <select name="font" value={eventDetails.font} onChange={handleInputChange}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
      <div>
        <label>Color:</label>
        <input
          type="color"
          name="color"
          value={eventDetails.color}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save Invitation</button>
    </form>
  );
};

export default InvitationForm;
