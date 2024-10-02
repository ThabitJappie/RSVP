import { SUBMIT_RSVP } from '../actions/rsvpActions';

const initialState = {
    rsvpSubmitted: false
};

const rsvpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_RSVP:
            return { ...state, rsvpSubmitted: true };
        default:
            return state;
    }
};

export default rsvpReducer;
