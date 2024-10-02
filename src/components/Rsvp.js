import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase'; // Ensure correct Firebase imports
import '../styles/Rsvp.css'; // Import the CSS file for styles

const countryCodes = [
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+27', country: 'South Africa' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    // Add more country codes as needed
];

const Rsvp = () => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const [eventDetails, setEventDetails] = useState(null);
    const [selectedOption, setSelectedOption] = useState(''); // State for RSVP options
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+1'); // Default to United States code
    const [attendees, setAttendees] = useState('');
    const [comment, setComment] = useState('');
    const [verificationCode, setVerificationCode] = useState(''); // For user input
    const [confirmationResult, setConfirmationResult] = useState(null); // Store Firebase confirmation result
    const [verificationMethod, setVerificationMethod] = useState('SMS');
    const [uploadedImage, setUploadedImage] = useState(null); // State for uploaded image from Pexels

    useEffect(() => {
        const storedEventDetails = JSON.parse(localStorage.getItem(eventId));
        if (storedEventDetails) {
            setEventDetails(storedEventDetails);
        } else {
            console.error('Event details not found for this event ID');
        }
    }, [eventId]);

    if (!eventDetails) {
        return <div>No event details available for RSVP.</div>;
    }

    const handleRSVPSubmit = async () => {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        try {
            // Ensure recaptcha container is available before creating the verifier
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible',
                    'callback': function (response) {
                        console.log("Recaptcha Verified");
                    }
                }, auth);
            }

            const appVerifier = window.recaptchaVerifier;

            // Call Firebase's signInWithPhoneNumber method
            const result = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
            setConfirmationResult(result);
            alert(`Verification code sent via ${verificationMethod}`);
        } catch (error) {
            console.error('Failed to send verification code:', error);
            alert('Error sending verification code. Make sure your Firebase setup is correct.');
        }
    };

    const handleVerifyCode = async () => {
        try {
            await confirmationResult.confirm(verificationCode);
            alert('Phone number verified successfully!');
            // Mark RSVP as completed in your backend or application logic
        } catch (error) {
            console.error('Error verifying code:', error);
            alert('Invalid verification code');
        }
    };

    // Validation logic for attendees based on the maxGuestsPerInvitee
    const handleAttendeesChange = (e) => {
        const value = e.target.value;
        const maxGuests = eventDetails.maxGuestsPerInvitee || 1; // Default to 1 if no maxGuestsPerInvitee is defined
        if (value <= maxGuests) {
            setAttendees(value);
        } else {
            alert(`You can only bring up to ${maxGuests} guests.`);
        }
    };

    const handleImageUpload = () => {
        // Placeholder: Call Pexels API to fetch and allow image selection
        // On success, update the uploaded image state
        const exampleImage = 'https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg';
        setUploadedImage(exampleImage);
    };

    return (
        <div className="rsvp-container">
            <h1>RSVP for {eventDetails.eventName}</h1>
            <p>{eventDetails.description}</p>
            <p>Date: {eventDetails.date ? new Date(eventDetails.date).toLocaleDateString() : 'N/A'}</p>
            <p>Start Time: {eventDetails.startTime || 'N/A'}</p>
            <p>End Time: {eventDetails.endTime || 'N/A'}</p>
            <p>Location: {eventDetails.location || 'N/A'}</p>
            {eventDetails.selectedTemplate ? (
                <img
                    src={eventDetails.selectedTemplate}
                    alt="Event Template"
                    style={{ width: '300px', height: '300px', border: '2px solid #ccc' }}
                />
            ) : (
                <p>No image selected</p>
            )}

            {/* RSVP Options */}
            <div className="rsvp-options">
                <button
                    className={selectedOption === 'going' ? 'selected' : ''}
                    onClick={() => setSelectedOption('going')}
                >
                    I'm Going
                </button>
                <button
                    className={selectedOption === 'cant-go' ? 'selected' : ''}
                    onClick={() => setSelectedOption('cant-go')}
                >
                    Can't Make It
                </button>
                <button
                    className={selectedOption === 'maybe' ? 'selected' : ''}
                    onClick={() => setSelectedOption('maybe')}
                >
                    Maybe
                </button>
            </div>

            {/* Going option verification fields */}
            {selectedOption === 'going' && (
                <div className="going-details">
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" />
                    </div>
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

                    <div className="input-group">
                        <label htmlFor="attendees">Amount of Attendees</label>
                        <input
                            type="number"
                            id="attendees"
                            placeholder={`Number of attendees (Max: ${eventDetails.maxGuestsPerInvitee || 1})`}
                            value={attendees}
                            onChange={handleAttendeesChange}
                            min="1"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="comment">Post Comment</label>
                        <textarea
                            id="comment"
                            placeholder="Leave a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="input-group">
                        <button onClick={handleImageUpload}>Upload Image via Pexels</button>
                        {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: '100px' }} />}
                    </div>

                    <div className="verification-method">
                        <p>Choose how to receive your verification code:</p>
                        <label>
                            <input
                                type="radio"
                                name="verificationMethod"
                                value="SMS"
                                checked={verificationMethod === 'SMS'}
                                onChange={() => setVerificationMethod('SMS')}
                            />
                            SMS
                        </label>
                    </div>

                    <div className="action-buttons">
                        <button className="cancel-btn" onClick={() => alert('RSVP canceled')}>
                            Cancel
                        </button>
                        <button className="continue-btn" onClick={handleRSVPSubmit}>
                            Continue
                        </button>
                    </div>

                    {/* Verification code input */}
                    <div className="input-group">
                        <label htmlFor="verificationCode">Enter Verification Code</label>
                        <input
                            type="text"
                            id="verificationCode"
                            placeholder="Enter the 6-digit code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <p>Didn't receive your code? <button onClick={handleRSVPSubmit}>Resend it</button></p>
                    </div>
                    <button onClick={handleVerifyCode} className="verify-btn">
                        Verify Code
                    </button>
                </div>
            )}

            {/* Firebase Recaptcha Element */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default Rsvp;
