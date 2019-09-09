import axios from 'axios';
import cookie from "react-cookies";
import {
  LOGIN,
  RESET_PASSWORD_LINK,
  CONFIRM_PASSWORD_LINK,
  REGISTRATION_LINK,
  LOGOUT} from './appConstants';

let token = null;
let passKey = process.env.REACT_APP_PASSKEY;

if (window.drupalSettings !== undefined) {
  if (window.drupalSettings.user.uid > 0 && window.drupalSettings.rtid) {
    token =  window.drupalSettings.rtid;
  }

  if (window.drupalSettings.password_encrypt) {
    passKey = window.drupalSettings.password_encrypt.passkey;
  }
}

export {token};
export {passKey};

export function getAuthorization() {
  axios.defaults.headers['Content-Type'] = 'application/json';
  if (token !== undefined) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return config;
  }
}

export function removeCookie() {
  window.localStorage.clear();
}

export function isLoggedIn() {
  const status = cookie.load('status');
  if (status !== undefined && window.atob(decodeURIComponent(status))) {
    return true;
  }

  removeCookie();
  return false;
}

export function isAnonymous() {
  if (window.location.pathname === LOGIN
    || window.location.pathname === RESET_PASSWORD_LINK
    || window.location.pathname === CONFIRM_PASSWORD_LINK
    || window.location.pathname === REGISTRATION_LINK
    || window.location.pathname === LOGOUT) {
    return true;
  }

  return false;
}