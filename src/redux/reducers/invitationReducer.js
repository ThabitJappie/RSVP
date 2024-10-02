import { SEND_INVITATION } from '../actions/invitationActions';

const initialState = {
    invitationSent: false
};

const invitationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_INVITATION:
            return { ...state, invitationSent: true };
        default:
            return state;
    }
};

export default invitationReducer;
