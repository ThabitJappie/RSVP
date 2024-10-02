import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Mock data for now, replace with real API call later
        const mockProfile = {
            username: 'john_doe',
            email: 'john@example.com',
        };
        setProfile(mockProfile);

        // Replace the above with an actual API call later:
        // axios.get('/api/accounts/profile/')
        //     .then(response => setProfile(response.data))
        //     .catch(error => console.error('Error fetching profile:', error));
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{profile.username}'s Profile</h2>
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default UserProfile;
