import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import queryString from 'query-string';

import getUserLoginAction from './userLogin.actions';
import LoginForm from './LoginForm';
import LoginAccept from '../PrivacyPopup/PrivacyPopup';
import supportActions from '../SupportEmail/support.actions';
import NoLoggedInHeader from '../Header/NoLoggedInHeader';
import userDetailsActions from '../User/Details/userDetails.actions';
import logoutActions from '../UserLogout/logout.actions';
import { HOMEPAGE } from '../../helpers/appConstants';
import {REGISTRATION_SUCCESS} from '../../helpers/translations';
import {token, isLoggedIn} from '../../helpers/authorization';
import '../../../sass/components/userlogin.scss';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'rgba(0,0,0,0.3)',
      true: false,
      auth_in_progress: false,
      showAcceptModal: false,
      cred: false,
      showForgot: false,
      supportEmail: null
    }
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    const { registration } = parsed;

    if (registration) {
      this.setState({registration});
    }
    if (!isLoggedIn()) {
      this.props.getLoginBackground();
      this.props.getGlobalSupportEmail();
    }
    if (token) {
      this.props.getUserInfo(token);
      this.setState({active: true});
    }
    else if (window.localStorage.getItem('background') && window.localStorage.getItem('email')) {
      const backgrond = JSON.parse(window.localStorage.getItem('background'));
      const email = JSON.parse(window.localStorage.getItem('email'));
      this.setState({
        background: backgrond.backGroundImage,
        supportEmail: email.supportEmail
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { AuthenticatedUserCredentails, AuthenticatingUserCredentails, userLoginCredentails } = nextProps;

    // Fetching Login Background Image
    if (nextProps.loginBackground.backGroundImage !== undefined) {
      this.setState({
        background: nextProps.loginBackground.backGroundImage
      })
    }

    if (AuthenticatingUserCredentails) {
      this.setState({ cred: true })
    }
    else if (AuthenticatedUserCredentails && this.state.cred && userLoginCredentails && userLoginCredentails.length !== '') {
      this.setState({ cred: false });
      nextProps.getUserInfo(userLoginCredentails);
    }

    if (nextProps.fetchedUserDetails) {
      if (nextProps.user && nextProps.user.policyFlag) {
        localStorage.setItem('user', JSON.stringify(nextProps.user));
        this.redirectLogin();
      }
      else {
        this.setState({showAcceptModal: true});
      }
    }
  }

  redirectLogin = () => {
    window.location = HOMEPAGE;
  }

  toggleAcceptModal = () => {
    let flag = !this.state.showAcceptModal;
    this.setState({
      showAcceptModal: flag
    })
  }

  toggleForgot = () => {
    this.setState({
      showForgot: !this.state.showForgot
    })
  }

  render() {
    const { AuthenticatedUserCredentails, AuthenticatingUserCredentails,
      fetchedFooter, fetchingFooter, footer, userLoginError, fetchingSupportEmail,
      fetchedSupportEmail } = this.props;
    const email = this.state.supportEmail ? this.state.supportEmail : this.props.supportEmail;

    return (
      <Row>
        <div className="user-login-wrapper col-12" style={{ backgroundImage: 'url(' + this.state.background + ')' }}>
          <NoLoggedInHeader />
          <div className="user-login">
            {this.state.registration &&
              <div className='msg'>{REGISTRATION_SUCCESS}</div>
            }
            <LoginForm
              isOpen={!this.state.showForgot}
              onSubmitForm={this.toggleAcceptModal}
              login={this.props.submitLogin}
              fetching={AuthenticatingUserCredentails || this.state.active}
              fetched={AuthenticatedUserCredentails}
              userLoginError={userLoginError}
              fetchedFooter={fetchedFooter}
              fetchingFooter={fetchingFooter}
              footer={footer}
              toggleForgot={this.toggleForgot}
              supportEmail={email}
              fetchedSupportEmail={fetchedSupportEmail}
              fetchingSupportEmail={fetchingSupportEmail}
            />
            <LoginAccept
              isOpen={this.state.showAcceptModal}
              toggle={this.toggleAcceptModal}
              logout={this.props.logout}
              redirectLogin={this.redirectLogin}
              userLoginCredentails={this.props.userLoginCredentails}
              user={this.props.user}
            />
          </div>
        </div>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  const { fetchingLoginBackground, fetchedLoginBackground, userLoginError, loginBackground, AuthenticatingUserCredentails, AuthenticatedUserCredentails, fetchingLogoutInfo, fetchedLogoutInfo, userLogout, userLoginCredentails } = state.userLogin;

  const { fetchedFooter, fetchingFooter, footer } = state.footer;

  const { fetchingSupportEmail, fetchedSupportEmail, supportError, supportEmail } = state.support;

  const { fetchingUserDetails, fetchedUserDetails, user, userDetailsError } = state.userDetails;

  return {
    fetchingLoginBackground, fetchedLoginBackground, userLoginError, loginBackground,
    AuthenticatingUserCredentails, AuthenticatedUserCredentails, fetchingLogoutInfo, fetchedLogoutInfo,
    userLogout, fetchedFooter, fetchingFooter, footer, userLoginCredentails, fetchingSupportEmail,
    fetchedSupportEmail, supportError, supportEmail, fetchingUserDetails, fetchedUserDetails, user, userDetailsError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginBackground: () => dispatch(getUserLoginAction.getLoginBackground()),
    submitLogin: (user, pass) => dispatch(getUserLoginAction.submitLogin(user, pass)),
    logout: () => dispatch(logoutActions.submitLogout()),
    getGlobalSupportEmail: () => dispatch(supportActions.getGlobalSupportEmail()),
    getUserInfo: (token) => dispatch(userDetailsActions.getUserInfo(token)),
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(UserLogin);

export default connectedComponent;
