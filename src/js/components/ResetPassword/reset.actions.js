import axios from 'axios';

function submitEmailForReset(mail) {
  return ((dispatch) => {
    dispatch({ type: "RESET_EMAIL" });
    axios.post('/api/v1/user/lost-password?_format=json', { mail: mail })
      .then((response) => {
        dispatch({ type: "RESET_EMAIL_SUCCESS", payload: response.data });
        dispatch({ type: "SUCCESS_MESSAGE", payload: response });
      })
      .catch((error) => {
        dispatch({ type: "RESET_EMAIL_FAILURE", payload: error })
        dispatch({ type: "ADD_ERROR_WITHOUT_LOGOUT", payload: error });
      });
  });
}

function submitPasswordForReset(mail, tempPass, newPass) {
  return ((dispatch) => {
    dispatch({ type: "CHANGE_PASSWORD" });
    axios.post('/api/v1/user/lost-password-reset?_format=json', { mail, tempPass, newPass })
      .then((response) => {
        dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: response.data });
        dispatch({ type: "SUCCESS_MESSAGE", payload: response });
      })
      .catch((error) => {
        dispatch({ type: "CHANGE_PASSWORD_FAILURE", payload: error })
        dispatch({ type: "ADD_ERROR_WITHOUT_LOGOUT", payload: error });
      });
  });
}

const resetForgetActions = {
  submitEmailForReset,
  submitPasswordForReset,
}

export default resetForgetActions;
