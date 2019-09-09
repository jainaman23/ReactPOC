import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { Label, Input } from "reactstrap";
import classnames from "classnames";
import CryptoJS from "crypto-js";
import cookies from "react-cookies";

import { inlineLoading } from "../../helpers/utils";
import { passKey } from "../../helpers/authorization";
import {
  REGISTRATION_LINK,
  RESET_PASSWORD_LINK
} from "../../helpers/appConstants";
import {
  NEED_HELP,
  FORGOT_PASS,
  REMEMBER_LABEL,
  SIGN_IN,
  NEW_USER_LABEL,
  REGISTER,
  REQUIRED,
  INVALID_USERNAME,
  USERNAME,
  PASSWORD
} from "../../helpers/translations";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      loginData: {},
      remember: false,
      email: "",
      password: ""
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.loadingRender = this.loadingRender.bind(this);
    this.getNeedHelp = this.getNeedHelp.bind(this);
    this.loginStatus = this.loginStatus.bind(this);
  }

  componentDidMount() {
    let remember = cookies.load("remember");
    if (remember) {
      const data = CryptoJS.AES.decrypt(remember, "adf_elc_key");
      const content = JSON.parse(data.toString(CryptoJS.enc.Utf8));
      this.setState({
        email: content.email,
        password: content.password,
        remember: true
      });
    }
  }

  handleLoginSubmit = data => {
    this.setState({
      loginData: data
    });

    if (this.state.remember) {
      const content = CryptoJS.AES.encrypt(JSON.stringify(data), "adf_elc_key");
      cookies.save("remember", content.toString(), { path: "/" });
    } else {
      cookies.remove("remember", { path: "/" });
    }

    const pass = CryptoJS.AES.encrypt(data.password, passKey);
    this.props.login(data.email, pass.toString());
  };

  toggleCheckbox = e => {
    let id = document.getElementById(e.target.id);
    const value = id.checked;
    this.setState({
      remember: value
    });
  };

  loadingRender() {
    return <div className="text-center">{inlineLoading()}</div>;
  }

  loginStatus() {
    const { fetching, fetched, userLoginError } = this.props;
    if (fetching || (fetched && userLoginError === null)) {
      return <div className="login-status">{this.loadingRender()}</div>;
    } else if (fetched && userLoginError && userLoginError.length !== 0) {
      return (
        <div className="text-center">
          <p>{userLoginError.data}</p>
        </div>
      );
    }
  }

  getEmail() {
    const {supportEmail} = this.props;
    return (
      <div
        className={classnames("need-help", {
          disabled: supportEmail.length === 0 || supportEmail.URL === ""
        })}
      >
        <a href={`mailto:${supportEmail}`}>{NEED_HELP}</a>
      </div>
    )
  }

  getNeedHelp() {
    const {
      fetchingSupportEmail,
      fetchedSupportEmail,
      supportEmail
    } = this.props;
    if (window.localStorage.getItem('email')) {
      return this.getEmail();
    }
    else if (fetchingSupportEmail) {
      return <div className="need-help">{this.loadingRender()}</div>;
    } else if (fetchedSupportEmail && supportEmail) {
      return this.getEmail();
    }
  }

  render() {
    if (!this.props.isOpen || this.props.isOpen === false) {
      return null;
    }
    return (
      <Formik
        initialValues={{
          email: this.state.email,
          password: this.state.password
        }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = REQUIRED;
          } else if (/\s?\w+\s/i.test(values.email)) {
            errors.email = INVALID_USERNAME;
          }
          if (!values.password) {
            errors.password = REQUIRED;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            this.handleLoginSubmit(values);
          }, 400);
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form
            className={classnames({
              disabled:
                this.props.fetching ||
                (this.props.fetched && this.props.userLoginError === null)
            })}
          >
            {this.loginStatus()}
            <Field
              type="text"
              name="email"
              placeholder={USERNAME}
              autoComplete="off"
            />
            <ErrorMessage name="email" component="div" className="error-msg" />
            <Field
              type="password"
              name="password"
              placeholder={PASSWORD}
              autoComplete="off"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-msg"
            />

            <div
              className={classnames("more-link", {
                "d-none": !this.state.show
              })}
            >
              <button
                type="submit"
                className={classnames(
                  "btn btn-outline-secondary text-uppercase",
                  { disabled: isSubmitting }
                )}
              >
                {SIGN_IN}
              </button>
            </div>
            <div className="extended">
              <Link className="forget-password" to={RESET_PASSWORD_LINK}>
                {FORGOT_PASS}
              </Link>
              <a
                href={REGISTRATION_LINK}
                className="registration"
              >{`${NEW_USER_LABEL} ${REGISTER}`}</a>
              <Label
                check
                for="remember-me"
                className={classnames({ active: this.state.remember })}
              >
                <Input
                  type="checkbox"
                  id="remember-me"
                  name="remember_me"
                  onChange={this.toggleCheckbox}
                  autoComplete="off"
                />
                {REMEMBER_LABEL}
              </Label>
            </div>
            {this.getNeedHelp()}
          </Form>
        )}
      </Formik>
    );
  }
}

export default LoginForm;
