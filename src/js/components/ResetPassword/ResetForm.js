import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { inlineLoading } from '../../helpers/utils';
import { LOGIN, CONFIRM_PASSWORD_LINK } from '../../helpers/appConstants';
import {
  SEND_LINK,
  HAVE_RESET_CODE,
  BACK_TO_LOGIN,
  REQUIRED,
  INVALID_EMAIL,
  EMAIL } from '../../helpers/translations';

class ResetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      show: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadingRender = this.loadingRender.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }

  handleSubmit(data){
    this.setState({
      email: data.email
    })
    if(data.email && data.email !== ''){
      this.props.onSubmitForm(data.email);
    }
  }

  loadingRender() {
    return (
      <div className="text-center">{inlineLoading()}</div>
    )
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
    else if (fetched && error && error.length !== 0) {
      return (
        <div className="text-center">
          <p>{error.data}</p>
        </div>
      )
    }
  }

  render() {
    const { email } = this.state;
    return (
      <Formik
        initialValues={{ email: email }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = REQUIRED;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
              values.email
            )
          ) {
            errors.email = INVALID_EMAIL;
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
          <Form className={classnames({ "disabled": this.props.fetching || (this.props.fetched && this.props.ErrorMessage === null) })}>
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
            <div className="more-link">
              <button type="submit" className={classnames("btn btn-outline-secondary text-uppercase", { "disabled": isSubmitting })}>{SEND_LINK}</button>
            </div>
            <div className="extended">
              <Link className="forget-password underline" to={CONFIRM_PASSWORD_LINK}>{HAVE_RESET_CODE}</Link>
            </div>
          </Form>
        )}
      </Formik>
    )
  }
}

export default ResetForm;

