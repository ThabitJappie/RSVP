import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EventPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { previewData } = location.state || {};

    if (!previewData) {
        return <div>No event data available for preview.</div>;
    }

    const handleEdit = () => {
        navigate('/', { state: { previewData } });
    };

    const handleAddInvitees = () => {
        navigate('/maincomponent', { state: { eventDetails: previewData } });
    };

    const handleCopyRSVPLink = () => {
        const rsvpLink = `${window.location.origin}/rsvp/${previewData.eventId}`; // Use /rsvp/{eventId} path
        navigator.clipboard.writeText(rsvpLink)
            .then(() => alert('RSVP link copied to clipboard!'))
            .catch(err => alert('Failed to copy RSVP link.'));
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Event Preview</h1>
            <h2>{previewData.eventName}</h2>
            <p>{previewData.description}</p>
            <p>
                Date: {previewData.date ? new Date(previewData.date).toLocaleDateString() : 'N/A'}
            </p>
            <p>Start Time: {previewData.startTime || 'N/A'}</p>
            <p>End Time: {previewData.endTime || 'N/A'}</p>
            <p>Location: {previewData.location || 'N/A'}</p>
            <p>Max Guests Allowed Per Invitee: {previewData.maxGuestsPerInvitee || 'N/A'}</p> {/* New field added */}
            {previewData.selectedTemplate ? (
                <img 
                    src={previewData.selectedTemplate} 
                    alt="Event Template" 
                    style={{ width: '300px', height: '300px', border: '2px solid #ccc' }} 
                />
            ) : (
                <p>No image selected</p>
            )}

            <div style={{ marginTop: '30px' }}>
                <button
                    onClick={handleEdit}
                    style={{
                        backgroundColor: '#6c63ff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '10px',
                    }}
                >
                    Edit
                </button>

                <button
                    onClick={handleAddInvitees}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '10px',
                    }}
                >
                    Add Invitees
                </button>

                <button
                    onClick={handleCopyRSVPLink}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Copy RSVP Link
                </button>
            </div>
        </div>
    );
};

export default EventPreview;
