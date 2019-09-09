import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classnames from 'classnames';
import CryptoJS from "crypto-js";
import { Link } from 'react-router-dom';

import { inlineLoading } from '../../helpers/utils';
import { LOGIN, RESET_PASSWORD_LINK } from '../../helpers/appConstants';
import { passKey } from '../../helpers/authorization';
import {
  RESEND_CODE,
  LOGIN_LABEL,
  BACK_TO_LOGIN,
  REQUIRED,
  INVALID_USERNAME,
  PASSWORD_DOES_NOT_MATCH,
  RE_TYPE_PASS,
  MIN_EIGHT,
  ALPHA_NUMERIC,
  SPECIAL_CHAR,
  NEW_PASS,
  EMAIL,
  RESET_CODE}  from '../../helpers/translations';

class ForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      tooltipOpen: false,
      form: {
        email: '',
        password: '',
        confirmPassword: '',
        otp: '',
      }
    }

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadingRender = this.loadingRender.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.resend = this.resend.bind(this);
  }

  handleSubmit(data){
    this.setState({
      form: data
    })

    if(data.email && data.otp && data.password && data.confirmPassword) {
      const pass = CryptoJS.AES.encrypt(data.password, passKey);
      this.props.onSubmitForm(data.email, data.otp, pass.toString());
    }
  }

  loadingRender() {
    return (
      <div className="text-center">{inlineLoading()}</div>
    )
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  checkStatus() {
    const {fetching, fetched, error} = this.props;
    if (fetching || (fetched && error === null)) {
      return (
        <div className="login-status">
          {this.loadingRender()}
        </div>
      )
    }
    else if (fetched && error && error.data && error.data.message) {
      return (
        <div className="text-center">
          <p>{error.data.message}</p>
        </div>
      )
    }
  }

  resend(){
    if(this.state.form.email && this.state.form.email !== '' ){
      this.props.resend(this.state.form.email);
    }
  }

  render() {
    const { email, password, confirmPassword, otp} = this.state.form;
    return (
      <Formik
        initialValues={{ email: email, password: password, confirmPassword: confirmPassword, otp: otp }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = REQUIRED;
          } else if (
            /\s?\w+\s/i.test(values.email)
          ) {
            errors.email = INVALID_USERNAME;
          }
          if(!values.otp){
            errors.otp = REQUIRED;
          }
          if (!values.password) {
            errors.password = REQUIRED;
          }
          if (values.password) {
            if(!/(?=.*?[A-Z])/g.test(values.password)){
              errors.password = SPECIAL_CHAR;
            }
            else if(!/(?=.*?[a-z])/g.test(values.password)){
              errors.password = SPECIAL_CHAR;
            }
            else if(!/(?=.*?[0-9])/g.test(values.password)){
              errors.password = ALPHA_NUMERIC;
            }
            else if(!/(?=.*?[#?!@$%^&*-])/g.test(values.password)){
              errors.password = SPECIAL_CHAR;
            }
            else if(values.password.length < 8){
              errors.password = MIN_EIGHT;
            }
          }
          if(!values.confirmPassword){
            errors.confirmPassword = REQUIRED;
          } else if(values.password !== values.confirmPassword){
            errors.confirmPassword = PASSWORD_DOES_NOT_MATCH;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            this.handleSubmit(values);
          }, 400);
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className={classnames({ "disabled": this.props.fetching || (this.props.fetched && this.props.error === null) })}>
            {this.checkStatus()}
            <div className="extended">
              <Link className="forget-password mb-4" to={LOGIN}>{BACK_TO_LOGIN}</Link>
            </div>
            <Field
              type="text"
              name="email"
              placeholder={EMAIL}
              autoComplete='off'
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-msg"
            />
            <Field
              type="text"
              name="otp"
              placeholder={RESET_CODE}
              autoComplete='off'
            />
            <ErrorMessage
              name="otp"
              component="div"
              className="error-msg"
            />
            <Field
              type="password"
              name="password"
              placeholder={NEW_PASS}
              autoComplete='off'
              id="passTip"
            />
            <Tooltip placement="top" isOpen={this.state.tooltipOpen}  target="passTip" toggle={this.toggle}>
              {`- ${MIN_EIGHT}`}<br />
              {`- ${ALPHA_NUMERIC}`}<br />
              {`- ${SPECIAL_CHAR}`}
            </Tooltip>
            <ErrorMessage
              name="password"
              component="div"
              className="error-msg"
            />
            <Field
              type="password"
              name="confirmPassword"
              placeholder={RE_TYPE_PASS}
              autoComplete='off'
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error-msg"
            />
            <div className="more-link">
              <button type="submit" className={classnames("btn btn-outline-secondary text-uppercase", { "disabled": isSubmitting })}>{LOGIN_LABEL}</button>
            </div>
            <div className="extended">
              <Link className="forget-password underline" to={RESET_PASSWORD_LINK}>{RESEND_CODE}</Link>
            </div>
          </Form>
        )}
      </Formik>
    )
  }
}

export default ForgotForm;

