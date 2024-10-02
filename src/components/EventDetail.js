import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Map from './Map';  // Ensure this path is correct
import PhotoGallery from './PhotoGallery';  // Ensure this path is correct
import Comments from './Comments';  // Ensure this path is correct

const EventDetail = () => {
  const { id } = useParams();  // Get event ID from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from the API using the event ID
    fetch(`/api/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error('Error fetching event details:', error));
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>

      {/* Event Schedule */}
      <section>
        <h2>Schedule</h2>
        <ul>
          {event.schedule.map((item, index) => (
            <li key={index}>
              <strong>{item.time}:</strong> {item.activity}
            </li>
          ))}
        </ul>
      </section>

      {/* Event Location */}
      <section>
        <h2>Location</h2>
        <Map location={event.location} />  {/* Pass event location to Map component */}
      </section>

      {/* Accommodation Details */}
      <section>
        <h2>Accommodation</h2>
        <p>{event.accommodation}</p>
      </section>

      {/* Photo Gallery */}
      <section>
        <h2>Photo Gallery</h2>
        <PhotoGallery photos={event.photos} />  {/* Pass event photos to PhotoGallery component */}
      </section>

      {/* Guest Comments */}
      <section>
        <h2>Comments</h2>
        <Comments eventId={id} />  {/* Pass event ID to Comments component */}
      </section>
    </div>
  );
};

export default EventDetail;

