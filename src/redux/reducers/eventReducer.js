import { FETCH_EVENTS } from '../actions/eventActions';

const initialState = {
    events: []
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS:
            return { ...state, events: action.payload };
        default:
            return state;
    }
};

export default eventReducer;
