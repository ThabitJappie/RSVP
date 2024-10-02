import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Mock data for now, replace with real API call later
        const mockEvents = [
            { id: 1, name: 'Wedding', date: '2024-08-20' },
            { id: 2, name: 'Birthday Party', date: '2024-09-01' },
        ];
        setEvents(mockEvents);

        // Replace the above with an actual API call later:
        // axios.get('/api/events/')
        //     .then(response => setEvents(response.data))
        //     .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className="container">
            <h2>Upcoming Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>
                            {event.name} - {event.date}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
