import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventCreation from './components/EventCreation';
import EventPreview from './components/EventPreview';
import MainComponent from './components/MainComponent';
import Rsvp from './components/Rsvp';  // Add the RSVP component route

// Import Firebase initialization
import './firebase';  // Ensure this file is initialized before your components are rendered

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EventCreation />} />
                <Route path="/eventpreview" element={<EventPreview />} />
                <Route path="/maincomponent" element={<MainComponent />} />
                <Route path="/rsvp/:eventId" element={<Rsvp />} /> {/* RSVP route with dynamic eventId */}
            </Routes>
        </Router>
    );
};

export default App;


