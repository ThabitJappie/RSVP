// src/components/RSVPList.js

import React from 'react';
import { useSelector } from 'react-redux'; // Adjust if you're using Redux to manage state

// Example RSVP List component
const RSVPList = () => {
  // Example of using Redux store to get RSVP data
  // const rsvps = useSelector((state) => state.rsvps);

  // Static example data
  const rsvps = [
    { id: 1, name: 'John Doe', status: 'Attending' },
    { id: 2, name: 'Jane Smith', status: 'Not Attending' },
    { id: 3, name: 'Michael Johnson', status: 'Attending' },
  ];

  return (
    <div>
      <h1>RSVP List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map((rsvp) => (
            <tr key={rsvp.id}>
              <td>{rsvp.id}</td>
              <td>{rsvp.name}</td>
              <td>{rsvp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RSVPList;
