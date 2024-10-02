import React, { useState, useEffect } from 'react';

const InvitationTemplate = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    // Mocked data for demonstration purposes
    const mockDesigns = [
      {
        id: 1,
        name: 'Elegant Wedding',
        imageUrl: 'https://via.placeholder.com/150',
        type: 'wedding',
      },
      {
        id: 2,
        name: 'Birthday Bash',
        imageUrl: 'https://via.placeholder.com/150',
        type: 'birthday',
      },
      {
        id: 3,
        name: 'Corporate Gala',
        imageUrl: 'https://via.placeholder.com/150',
        type: 'corporate',
      },
    ];

    setDesigns(mockDesigns); // Set the mocked data as the component state
  }, []);

  return (
    <div>
      <h2>Select Invitation Design</h2>
      <div className="design-list">
        {designs.length > 0 ? (
          designs.map((design) => (
            <div key={design.id} className="design-item">
              <img src={design.imageUrl} alt={design.name} />
              <p>{design.name}</p>
            </div>
          ))
        ) : (
          <p>No designs available</p>
        )}
      </div>
    </div>
  );
};

export default InvitationTemplate;
