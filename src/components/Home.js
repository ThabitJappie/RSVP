import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Event Management System</h1>
            <p>This platform allows you to create, manage, and track your events effortlessly.</p>
            <a href="/login">
                <button>Login</button>
            </a>
            <a href="/register" style={{ marginLeft: '10px' }}>
                <button>Sign Up</button>
            </a>
        </div>
    );
};

export default Home;
