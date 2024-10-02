import axios from 'axios';

export const REGISTER_USER = 'REGISTER_USER';

export const registerUser = (userData) => async (dispatch) => {
    try {
        await axios.post('http://localhost:5000/api/users/register', userData);
        dispatch({ type: REGISTER_USER });
    } catch (error) {
        console.error('Error registering user:', error);
    }
};
