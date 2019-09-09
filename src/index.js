import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@babel/polyfill';
import 'intersection-observer';

import store from './js/helpers/store';
import App from './js/components/App';
import ErrorToast from './js/components/Errors/ErrorToast.js'
import * as serviceWorker from './serviceWorker';
import './sass/style.scss';
import {isLoggedIn} from './js/helpers/authorization';
import {removeDrupalToolbar} from './js/helpers/utils';

let path = window.location.pathname;

// Drupal Admin bar
const adminBar = document.getElementById('toolbar-item-administration');
if (adminBar) {
  if (window.outerWidth > 975) {
    window.addEventListener('load', function() {
      adminBar.click();
    });
  }
}

// Removing Drupal Admin bar, If Present.
removeDrupalToolbar();

isLoggedIn();

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ErrorToast />
  </Provider>,
  document.getElementById('react-app-container')
);

if (path.indexOf('/admin') !== '-1' || path.indexOf('/login') !== '-1' || path.indexOf('/logout') !== '-1' || path.indexOf('/user/reset') !== '-1') {
  serviceWorker.unregister();
}

serviceWorker.unregister();
