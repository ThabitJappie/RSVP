import axios from 'axios';

export const SUBMIT_RSVP = 'SUBMIT_RSVP';

export const submitRsvp = (rsvpData) => async (dispatch) => {
    try {
        await axios.post('http://localhost:5000/api/rsvps', rsvpData);
        dispatch({ type: SUBMIT_RSVP });
    } catch (error) {
        console.error('Error submitting RSVP:', error);
    }
};
