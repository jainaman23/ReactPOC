/*
  User Details
 */
import axios from 'axios';
import { getAuthorization, token } from '../../../helpers/authorization';

let config = getAuthorization();

// Get user's dashboard information
function getUserInfo(key) {
  if(!token){
    config = {
      headers: {
        Authorization: `${key.tokenType} ${key.accessToken}`,
      },
    };
  }

  return ((dispatch) => {
    dispatch({ type: 'FETCH_USER_DETAILS' });
    // Get User Data.
    axios.get(`/api/v1/userDashboard?_format=json`, config)
      .then((response) => {
        dispatch({ type: 'FETCH_USER_DETAILS_SUCCESS', payload: response.data })
        ;
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_USER_DETAILS_FAILURE', payload: error.response.data.message });
        dispatch({ type: "ADD_ERROR", payload: error });
      });
  });
}

const userDetailsActions = {
  getUserInfo,
};

export default userDetailsActions;
