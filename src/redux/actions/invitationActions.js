import axios from 'axios';

export const SEND_INVITATION = 'SEND_INVITATION';

export const sendInvitation = (invitationData) => async (dispatch) => {
    try {
        await axios.post('http://localhost:5000/api/invitations', invitationData);
        dispatch({ type: SEND_INVITATION });
    } catch (error) {
        console.error('Error sending invitation:', error);
    }
};
