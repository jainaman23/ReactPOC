/*
  User Details
 */
import axios from 'axios';
import { getAuthorization, removeCookie } from '../../../helpers/authorization';

let config = getAuthorization();
// Get user's dashboard information
function updateUserInfo(data) {
  return ((dispatch) => {
    dispatch({ type: 'UPDATE_USER_DETAILS' });
    let csrfToken = null;
    axios.get('/session/token').then((response) => {
      csrfToken = response.data;
      config.headers['X-CSRF-Token'] = csrfToken;
      // Get User Data.
      axios.post(`/api/v1/userUpdate?_format=json`, data, config)
        .then((response) => {
          dispatch({ type: 'UPDATE_USER_DETAILS_SUCCESS', payload: response });
          dispatch({ type: "SUCCESS_MESSAGE", payload: response });
        })
        .catch((error) => {
          dispatch({ type: 'UPDATE_USER_DETAILS_FAILURE', payload: error.response });
          dispatch({ type: "ADD_ERROR_WITHOUT_LOGOUT", payload: error });
        });
    });
  });
}

// Get user's dashboard information
function updateUserImage(data) {
  return ((dispatch) => {
    dispatch({ type: 'UPDATE_USER_IMAGE' });
    let csrfToken = null;
    axios.get('/session/token').then((response) => {
      csrfToken = response.data;
      config.headers['X-CSRF-Token'] = csrfToken;
      // Get User Data.
      axios.post(`/api/v1/user/profile/picture?_format=json`, data, config)
        .then((response) => {
          dispatch({ type: 'UPDATE_USER_IMAGE_SUCCESS', payload: response });
          dispatch({ type: "SUCCESS_MESSAGE", payload: response });
        })
        .catch((error) => {
          dispatch({ type: 'UPDATE_USER_IMAGE_FAILURE', payload: error.response });
          dispatch({ type: "ADD_ERROR_WITHOUT_LOGOUT", payload: error });
        });
    });
  });
}

// Get user's dashboard information
function updateUserPass(data) {
  return ((dispatch) => {
    dispatch({ type: 'UPDATE_USER_PASSWORD' });
    let csrfToken = null;
    axios.get('/session/token').then((response) => {
      csrfToken = response.data;
      config.headers['X-CSRF-Token'] = csrfToken;
      // Get User Data.
      axios.post(`/api/v1/passwordChange?_format=json`, data, config)
        .then((response) => {
          dispatch({ type: 'UPDATE_USER_PASSWORD_SUCCESS', payload: response });
          dispatch({ type: "SUCCESS_MESSAGE", payload: response });
          removeCookie();
        })
        .catch((error) => {
          dispatch({ type: 'UPDATE_USER_PASSWORD_FAILURE', payload: error.response});
          dispatch({ type: "ADD_ERROR_WITHOUT_LOGOUT", payload: error });
        });
    });
  });
}

const userEditActions = {
  updateUserInfo,
  updateUserImage,
  updateUserPass
};

export default userEditActions;
