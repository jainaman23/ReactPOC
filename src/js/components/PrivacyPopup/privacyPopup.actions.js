/*
  Update User Flag
 */
import axios from 'axios';
import { getAuthorization, token } from '../../helpers/authorization';

let config = getAuthorization();

// Update user's privacy flag
function updateUserFlag(key) {
  if(!token){
    config = {
      headers: {
        Authorization: `${key.tokenType} ${key.accessToken}`,
      },
    };
  }

  return ((dispatch) => {
    dispatch({ type: 'UPDATE_USER_FLAG' });
    let csrfToken = null;
    axios.get('/session/token').then((response) => {
      csrfToken = response.data;
      config.headers['X-CSRF-Token'] = csrfToken;

      // Get User Data.
      axios.post(`/api/v1/userPolicyFlag?_format=json`, {flagStatus: 1}, config)
        .then((response) => {
          dispatch({ type: 'UPDATE_USER_FLAG_SUCCESS', payload: response.data });
        })
        .catch((error) => {
          dispatch({ type: 'UPDATE_USER_FLAG_FAILURE', payload: error.response.data.message });
          dispatch({ type: "ADD_ERROR", payload: error });
        });
      });
  });
}

const userFlagActions = {
  updateUserFlag,
};

export default userFlagActions;
