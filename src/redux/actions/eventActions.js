import axios from 'axios';

export const FETCH_EVENTS = 'FETCH_EVENTS';

export const fetchEvents = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/events');
        dispatch({ type: FETCH_EVENTS, payload: response.data });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};
