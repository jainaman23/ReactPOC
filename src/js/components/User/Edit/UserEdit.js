import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Col, Row, Tooltip} from 'reactstrap';
import classnames from 'classnames';
import CryptoJS from "crypto-js";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Avatar from '../../../../images/defaults/avatar.png';
import '../../../../sass/components/userprofile.scss';
import userEditActions from './userEdit.actions';
import { inlineLoading } from '../../../helpers/utils';
import { LOGOUT } from '../../../helpers/appConstants';
import { passKey } from '../../../helpers/authorization';
import {
  FIRST_NAME,
  LAST_NAME,
  SAVE,
  BACK,
  CONFIRM_PASS,
  OLD_PASS,
  NEW_PASS,
  PASSWORD_DOES_NOT_MATCH,
  RE_TYPE_PASS,
  RESET_LABEL,
  MIN_EIGHT,
  ALPHA_NUMERIC,
  SPECIAL_CHAR,
  REQUIRED} from '../../../helpers/translations';

const userDetails = localStorage.getItem('user');
const user = JSON.parse(userDetails);

class UserEdit extends Component {
  constructor() {
    super();
    this.state = {
      activeState: false,
      user: user,
      userImage: user.userPicture,
      updatedUserImage: true,
      tooltipOpen: false,
      form: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePassDialog = this.handlePassDialog.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleSubmit(values) {
    if (!this.state.enablePassDialog) {
      const info = {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }

      this.props.updateUserInfo(info);
    }
    else {
      const oldPass = CryptoJS.AES.encrypt(values.oldPass, passKey).toString();
      const newPass = CryptoJS.AES.encrypt(values.newPass, passKey).toString();

      const data = {
        currentPassword: oldPass,
        newPassword: newPass
      }

      this.props.updateUserPass(data);
    }
  }

  handlePassDialog(e) {
    e.target.checked ? this.setState({enablePassDialog: true}) : this.setState({enablePassDialog: false});
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  handleCancel() {
    this.props.history.goBack()
  }

  handleUpload() {
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    let file    = document.getElementById('userUpload').files[0];
    let fileName    = document.getElementById('userUpload').files[0].name;
    let fileType    = document.getElementById('userUpload').files[0].type;
    let reader  = new FileReader();
    let $this = this;

    if (file) {
      reader.readAsDataURL(file);

      if (fileTypes.indexOf(fileType) === -1) {
        reader.abort();
      }
    }

    reader.addEventListener("loadend", function (response) {
      if (response.currentTarget.result) {
        let data = response.currentTarget.result.split(',');
        const content = {
          filename: fileName,
          image: data[1]
        }
        $this.props.updateUserImage(content);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {updatingUserDetails, updatedUserDetails, userEdit, userEditStatus } = nextProps;

    if (userEditStatus !== null) {
      this.setState({activeState: false});
    }
    if (updatedUserDetails && !this.state.updatedUserDetails) {
      if (userEdit.status) {
        const {user} = this.state;
        user.firstName = this.state.firstName;
        user.lastName = this.state.lastName;
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({
          user: user,
          updatedUserDetails: true
        });
      }
      else {
        this.setState({activeState: false});
      }
    }

    if (updatingUserDetails) {
      this.setState({updatedUserDetails: false, activeState: true})
    }

    const {updatingUserImage, updatedUserImage, userImage } = nextProps;

    if (updatedUserImage && !this.state.updatedUserImage) {
      if (userImage.status) {
        const {user} = this.state;
        user.userPicture = userImage.image;
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({
          userImage: userImage.image,
          updatedUserImage: true,
          activeState: false
        });
      }
      else {
        this.setState({activeState: false});
      }
    }

    if (updatingUserImage) {
      this.setState({updatedUserImage: false, activeState: true})
    }

    const {updatingUserPass, updatedUserPass, userPass, userPassStatus } = nextProps;

    if (updatedUserPass && !this.state.updatedUserPass) {
      if(userPass && Number(userPassStatus) === Number(200)) {
        this.setState({
          updatedUserPass: true
        });

        setTimeout(() => {
          window.location = LOGOUT;
        }, 2000)
      }
      else {
        this.setState({activeState: false});
      }
    }

    if (updatingUserPass) {
      this.setState({updatedUserPass: false, activeState: true})
    }
  }

  render() {
    const {
      firstName,
      lastName
    } = this.state.form;

    return (
      <div className="user-profile user-edit">
        <Row>
          <Col xs={12} className="user-picture">
            <div className="profile-image">
              <div className='picture'>
                <img src={this.state.userImage? this.state.userImage : Avatar} alt='user-profile' />
                {!this.state.updatedUserImage &&
                  <div className='loader'>
                    <div className="text-center">{inlineLoading()}</div>
                  </div>
                }
                <input
                  type="file"
                  name="user_uploaded"
                  id="userUpload"
                  onChange={this.handleUpload}
                  autoComplete='off'
                />
              </div>
            </div>
          </Col>
          <Col xs={12} className="user-login user-data">
            <Formik
              initialValues={{
                firstName: firstName,
                lastName: lastName,
                oldPass: '',
                newPass: '',
                confirmPass: ''
              }}
              //error handling
              validate={values => {
                let errors = {};
                if (!this.state.enablePassDialog) {
                  errors = {};
                  if (!values.firstName) {
                    errors.firstName = REQUIRED;
                  }
                  if (!values.lastName) {
                    errors.lastName = REQUIRED;
                  }
                  if (values.lastName && values.firstName) {
                    this.setState({
                      firstName: values.firstName,
                      lastName: values.lastName
                    })
                  }
                }

                if (this.state.enablePassDialog) {
                  errors = {};
                  if (!values.oldPass) {
                    errors.oldPass = REQUIRED;
                  }
                  if (!values.newPass) {
                    errors.newPass = REQUIRED;
                  }
                  if (values.newPass) {
                    if(!/(?=.*?[A-Z])/g.test(values.newPass)){
                      errors.newPass = SPECIAL_CHAR;
                    }
                    else if(!/(?=.*?[a-z])/g.test(values.newPass)){
                      errors.newPass = SPECIAL_CHAR;
                    }
                    else if(!/(?=.*?[0-9])/g.test(values.newPass)){
                      errors.newPass = ALPHA_NUMERIC;
                    }
                    else if(!/(?=.*?[#?!@$%^&*-])/g.test(values.newPass)){
                      errors.newPass = SPECIAL_CHAR;
                    }
                    else if(values.newPass.length < 8){
                      errors.newPass = MIN_EIGHT;
                    }
                  }
                  if (!values.confirmPass) {
                    errors.confirmPass = REQUIRED;
                  }
                  if (values.newPass !== values.confirmPass) {
                    errors.confirmPass = PASSWORD_DOES_NOT_MATCH;
                  }
                }
                Object.keys(errors).length !== 0
                  ? this.setState({subDisabled: true})
                  : this.setState({subDisabled: false})

                return errors;
              }}

              onSubmit={values => {
                this.handleSubmit(values);
              }}
              >
              {/* Form Structure */}
              <Form>
                <div className={classnames("user-details", {"disabled": this.state.enablePassDialog})}>
                  <Col className={classnames("name first profile-data", {"disabled": this.state.activeState})}>
                    <div className="field"><label>{FIRST_NAME}</label></div>
                    <div className="field">
                      <Field
                        type="text"
                        name="firstName"
                        placeholder={FIRST_NAME}
                        autoComplete='off'
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="error-msg"
                      />
                    </div>
                  </Col>
                  <Col className={classnames("name last profile-data", {"disabled": this.state.activeState})}>
                    <div className="field"><label>{LAST_NAME}</label></div>
                    <div className="field">
                      <Field
                        type="text"
                        name="lastName"
                        placeholder={LAST_NAME}
                        autoComplete='off'
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="error-msg"
                      />
                    </div>
                  </Col>
                </div>
                <div className={classnames("pass-dialog", {"disabled": this.state.activeState})}>
                  <label htmlFor='passDialog' className={classnames("form-check-label", {"active": this.state.enablePassDialog})}>
                    <input
                      type="checkbox"
                      placeholder={LAST_NAME}
                      autoComplete='off'
                      id='passDialog'
                      onChange={this.handlePassDialog}
                      className='form-check-input'

                    />
                    {RESET_LABEL}
                  </label>
                </div>
                {this.state.enablePassDialog &&
                  <>
                    <Col className={classnames("name old-pass profile-data", {"disabled": this.state.activeState})}>
                      <div className="field"><label>{OLD_PASS}</label></div>
                      <div className='field'>
                        <Field
                          type="password"
                          name="oldPass"
                          placeholder={OLD_PASS}
                        />
                        <ErrorMessage
                          name="oldPass"
                          component="div"
                          className="error-msg"
                        />
                      </div>
                    </Col>
                    <Col className={classnames("name old-pass profile-data", {"disabled": this.state.activeState})}>
                      <div className="field"><label>{NEW_PASS}</label></div>
                      <div className='field'>
                        <Field
                          type="password"
                          name="newPass"
                          placeholder={NEW_PASS}
                          id='passTip'
                        />
                        <Tooltip placement="top" isOpen={this.state.tooltipOpen}  target="passTip" toggle={this.toggle}>
                          {`- ${MIN_EIGHT}`}<br />
                          {`- ${ALPHA_NUMERIC}`}<br />
                          {`- ${SPECIAL_CHAR}`}
                        </Tooltip>
                        <ErrorMessage
                          name="newPass"
                          component="div"
                          className="error-msg"
                        />
                      </div>
                    </Col>
                    <Col className={classnames("name old-pass profile-data", {"disabled": this.state.activeState})}>
                      <div className="field"><label>{CONFIRM_PASS}</label></div>
                      <div className='field'>
                        <Field
                          type="password"
                          name="confirmPass"
                          placeholder={RE_TYPE_PASS}
                        />
                        <ErrorMessage
                          name="confirmPass"
                          component="div"
                          className="error-msg"
                        />
                      </div>
                    </Col>
                  </>
                }
                <div className="col-12 my-5 field-content more-link">
                  <button
                    type="submit"
                    className={classnames("btn btn-outline-secondary text-uppercase", {"disabled": this.state.activeState || this.state.subDisabled})}
                  >{SAVE}</button>
                  <button
                    type="button"
                    className={classnames("btn btn-outline-secondary text-uppercase", {"disabled": this.state.activeState || this.state.subDisabled})}
                    onClick={this.handleCancel}
                  >{BACK}</button>
                </div>
              </Form>
            </Formik>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { updatingUserDetails, updatedUserDetails, userEdit, userEditError, userEditStatus } = state.userEdit;

  const { updatingUserImage, updatedUserImage, userImage, userImageError, userImageStatus } = state.userImage;

  const { updatingUserPass, updatedUserPass, userPass, userPassError, userPassStatus } = state.userPass;

  return {updatingUserDetails, updatedUserDetails, userEdit, userEditError, updatingUserImage, updatedUserImage, userImage, userImageError, updatingUserPass, updatedUserPass, userPass, userPassError, userEditStatus, userImageStatus, userPassStatus};
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (data) => dispatch(userEditActions.updateUserInfo(data)),
    updateUserImage: (data) => dispatch(userEditActions.updateUserImage(data)),
    updateUserPass: (data) => dispatch(userEditActions.updateUserPass(data)),
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(UserEdit);


export default connectedComponent;