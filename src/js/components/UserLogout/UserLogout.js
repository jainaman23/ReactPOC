import React, { Component } from 'react';
import { connect } from 'react-redux';

import logoutActions from './logout.actions';
import { inlineLoading } from '../../helpers/utils';
import { LOGOUT_MESSAGE } from '../../helpers/translations';

class UserLogout extends Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div className="user-login-wrapper">
        <div className="user-logout text-center m-5">
          {LOGOUT_MESSAGE} {inlineLoading()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { fetchingLogoutInfo,
    fetchedLogoutInfo,
    userLogout, error } = state.userLogin;

  return {
    fetchingLogoutInfo,
    fetchedLogoutInfo,
    userLogout, error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutActions.submitLogout()),
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(UserLogout);

export default connectedComponent;
