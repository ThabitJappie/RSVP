import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendVerificationCode, verifyCode } from '../firebase'; // Firebase helper functions
import '../styles/Rsvp.css'; // CSS styles

// Country codes defined here
const countryCodes = [
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+27', country: 'South Africa' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    // Add more country codes as needed
];

const Rsvp = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [selectedOption, setSelectedOption] = useState(''); 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+1'); 
    const [attendees, setAttendees] = useState('');
    const [comment, setComment] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null); 

    useEffect(() => {
        const storedEventDetails = JSON.parse(localStorage.getItem(eventId));
        if (storedEventDetails) {
            setEventDetails(storedEventDetails);
        } else {
            console.error('Event details not found for this event ID');
        }
    }, [eventId]);

    // Your other event-related code...

    return (
        <div className="rsvp-container">
            <h1>RSVP for {eventDetails?.eventName}</h1>
            {/* Rest of the component */}
            <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="phone-input">
                    <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="country-code-dropdown"
                    >
                        {countryCodes.map((code) => (
                            <option key={code.code} value={code.code}>
                                {code.country} ({code.code})
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
            </div>
            {/* Rest of your JSX code */}
        </div>
    );
};

export default Rsvp;
