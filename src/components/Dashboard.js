import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/events/')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div>
            <h2>Your Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
