import axios from 'axios';
import { removeCookie, token } from '../../helpers/authorization';
import { HOMEPAGE, LOGIN } from '../../helpers/appConstants';

function submitLogout() {
  localStorage.clear();
  return ((dispatch) => {
    dispatch({ type: "USER_LOGOUT" });
    axios.get('/session/token').then((csrfToken) => {
      axios.post('/api/v1/logout?_format=json', { token }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRF-Token': csrfToken.data,
        },
      })
        .then((response) => {
          dispatch({ type: "USER_LOGOUT_SUCCESS", payload: response.data })
          if (response.status === 200) {
            removeCookie();
            window.location = LOGIN;
          }
        })
        .catch((error) => {
          dispatch({ type: "USER_LOGOUT_FAILURE", payload: error.response })
          dispatch({ type: "ADD_ERROR", payload: error })
          window.location = HOMEPAGE;
        });
    });
  });
}

const logoutActions = {
  submitLogout
}

export default logoutActions;