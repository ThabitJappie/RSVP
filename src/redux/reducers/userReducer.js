import { REGISTER_USER } from '../actions/userActions';

const initialState = {
    userRegistered: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, userRegistered: true };
        default:
            return state;
    }
};

export default userReducer;
