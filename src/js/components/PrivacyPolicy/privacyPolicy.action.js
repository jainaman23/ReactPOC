import axios from 'axios';
import { getAuthorization } from '../../helpers/authorization';

import { isLoggedIn } from '../../helpers/authorization';

let config = getAuthorization();

function getPrivacyPolicy(language, country) {

  return ((dispatch) => {
    const loggedIn = isLoggedIn();
    let url;
    if (loggedIn) {
      url = '/api/v1/privacyPolicy';
    }
    else {
      url = '/api/v1/globalPrivacyPolicy';
      config = {};
    }

    dispatch({ type: 'FETCH_PRIVACY_POLICY' });
    axios.get(`${url}?_format=json`, config)
      .then((response) => {
        dispatch({ type: 'FETCH_PRIVACY_POLICY_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_PRIVACY_POLICY_FAILURE', payload: error.response });
        dispatch({ type: "ADD_ERROR", payload: error });
      })
  });
}

const getPrivacyPolicyAction = {
  getPrivacyPolicy
}

export default getPrivacyPolicyAction;
