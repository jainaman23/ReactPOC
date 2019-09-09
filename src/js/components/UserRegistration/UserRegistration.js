/**
 * @Todo
 *   1. Break this in to Useful Components w.r.t. API's.
 *   2. Can be converted into proper form with custom validations.
 */
import React, {Component} from "react";
import classnames from "classnames";
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, FormGroup, Label, Input} from "reactstrap";

import SelectiveFilter from '../SelectiveFilter/SelectiveFilter';
import supportActions from '../SupportEmail/support.actions';
import getUserRegistrationAction from './userRegistration.action';
import getBrandListAction from '../BrandList/brandList.actions';
import { inlineLoading } from '../../helpers/utils';
import {LOGIN, TNC_LINK, PRIVACY_LINK} from '../../helpers/appConstants';
import '../../../sass/components/userlogin.scss';
import Captcha from './ReCaptcha';
import {
  SECONDARY_LANG_LABEL,
  PRIMARY_LANG_LABEL,
  PRIVACY_POLICY_DESC,
  PRIVACY_POLICY_LABEL,
  TNC_LABEL,
  TNC_DESC } from '../../helpers/translations';

//importing translations
import {
  REGISTER,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  USERNAME,
  SELECT_REGION,
  SELECT_MARKET,
  SELECT_LANGUAGE,
  SELECT_JOB_TITLE,
  REQUIRED,
  INVALID_EMAIL,
  INVALID_USERNAME,
  REGISTRATION_LABEL,
  CANCEL,
  NO_LANGUAGE,
  NO_JOBS_TITLE,
  SELECT_BRAND,
  REGISTRATION_CODE,
  NEED_HELP
} from "../../helpers/translations";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        region: '',
        market: '',
        language: '',
        jobTitle: '',
        code: '',
        tncCheck: false,
        brand: ''
      },
      errStatus: false,
      msg: '',
      userObject: {},
      regions: {},
      allMarkets: {},
      markets: {},
      languages: {},
      jobTitles: {},
      currentRegion: '',
      currentMarket: '',
      currentJob: '',
      currentLanguage: '',
      currentBrand: '',
      brands: {},
      captcha: false,
      activeState: false,
      languageLabel: SELECT_LANGUAGE,
      jobTitleLabel: SELECT_JOB_TITLE
    };

    this.handleJobtitle = this.handleJobtitle.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handleMarket = this.handleMarket.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleBrand = this.handleBrand.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this);
    this.getNeedHelp = this.getNeedHelp.bind(this);
  }

  //Saving the data into the state
  handleSubmit = data => {

    // Finalizing Object
    const UserObject = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.username,
      email: data.email,
      region: this.state.currentRegion,
      country: this.state.currentMarket,
      langCode: this.state.currentLanguage,
      jobTitle: this.state.currentJob,
      policyFlag: (this.state.agree1 && this.state.agree2) ? 1 : 0,
      brand: this.state.currentBrand,
      registrationCode: data.code
    }

    this.setState({
      msg: '',
      errStatus: false,
      userObject: UserObject,
      activeState: true,
      userError: false
    });

    this.props.userValidate(UserObject.email, UserObject.userName);
  };

  handleJobtitle(job) {
    this.setState({currentJob: job});
  }

  handleBrand(brand) {
    this.setState({currentBrand: brand});
  }

  handleRegion(region) {
    if (Number(region) === 0) {
      this.setState({
        activeMarket: false,
        activeLanguage: false,
        currentRegion: region,
        currentLanguage: '',
        languageLabel: SELECT_LANGUAGE,
        markets: {},
        languages: {},
      });
    }
    else {
      // Resetting the market filed.
      this.setState({activeMarket: false, markets: {}, currentRegion: region});
      const marketsCloned = this.state.allMarkets.map((item) => Object.assign({}, item));
      const markets = marketsCloned.filter((item) => Number(item.region) === Number(region));
      const currentMarkets = {};

      // Converting into Object.
      markets.forEach((item) => currentMarkets[item.tid] = item.market);
      this.setState({
        markets: currentMarkets,
        activeMarket: true
      });
    }
  }

  handleMarket(market) {
    if (Number(market) === 0) {
      this.setState({
        activeLanguage: false,
        currentLanguage: '',
        languageLabel: SELECT_LANGUAGE,
        languages: {},
        currentMarket: ''
      });
    }
    else {
      this.props.getLanguages(market);
      this.setState({currentMarket: market});
    }
  }

  handleLanguage(language) {
    this.setState({currentLanguage: language});
  }

  handleCancel() {
    window.location = LOGIN;
  }

  toggleCheckbox = (e) => {
    let id = document.getElementById(e.target.id);
    const name = e.target.name;
    const value = id.checked;
    this.setState({
      [name]: value
    })
  }

  createMarkup(data) {
    return { __html: data };
  }

  handleCaptcha(captcha) {
    if (captcha) {
      this.setState({captcha: true});
    }
  }

  componentDidMount() {
    this.props.getRegions();
    this.props.getMarkets();
    this.props.getJobTitles();
    this.props.getBrandList();
    this.props.getGlobalSupportEmail();
  }

  componentWillReceiveProps(nextProps) {
    const {regions, fetchedRegions, fetchingRegions } = nextProps;
    const location = {};
    if (fetchedRegions && !this.state.fetchedRegions) {
      regions.forEach((item) => location[item.tid] = item.name);
      this.setState({
        fetchedRegions: true,
        regions: location
      })
    }

    if (fetchingRegions) {
      this.setState({fetchedRegions: false})
    }

    // Markets
    const { markets, fetchedMarkets, fetchingMarkets } = nextProps;
    if (fetchedMarkets && !this.state.fetchedMarkets) {
      this.setState({
        fetchedMarkets: true,
        allMarkets: markets
      })
    }

    if (fetchingMarkets) {
      this.setState({fetchedMarkets: false})
    }

    // Languages
    const { languages, fetchedLanguages, fetchingLanguages, languagesStatus } = nextProps;
    if (fetchedLanguages && !this.state.fetchedLanguages) {
      this.setState({activeLanguage: false, languages: {}});
      if (languagesStatus === 204) {
        this.setState({
          activeLanguage: false,
          fetchedLanguages: true,
          languageLabel: NO_LANGUAGE,
        });
      }
      else {
        const currentLanguages = {};

        // Converting into Object.
        currentLanguages.header_1 = PRIMARY_LANG_LABEL;
        languages.primary.forEach((item) => currentLanguages[item.languageCode] = item.languageName);
        if (languages.secondary.length !== 0) {
          currentLanguages.header_2 = SECONDARY_LANG_LABEL;
          languages.secondary.forEach((item) => currentLanguages[item.languageCode] = item.languageName);
        }
        this.setState({
          activeLanguage: true,
          fetchedLanguages: true,
          languages: currentLanguages,
          languageLabel: SELECT_LANGUAGE,
        });
      }
    }

    if (fetchingLanguages) {
      this.setState({fetchedLanguages: false})
    }

    // Job Titles
    const {jobtitles, fetchedJobTitle, fetchingJobTitle, jobtitlesStatus } = nextProps;
    if (fetchedJobTitle && !this.state.fetchedJobTitle) {
      if (jobtitlesStatus === 204) {
        this.setState({
          fetchedJobTitle: true,
          jobTitles: {},
          jobTitleLabel: NO_JOBS_TITLE,
          activeJobTitle: false
        })
      }
      else {
        const jobs = {};
        jobtitles.forEach((item) => jobs[item.rid] = item.role);
        this.setState({
          fetchedJobTitle: true,
          jobTitles: jobs,
          jobTitleLabel: SELECT_JOB_TITLE,
          activeJobTitle: true
        })
      }
    }

    if (fetchingJobTitle) {
      this.setState({fetchedJobTitle: false})
    }

    // User Validation
    const { userInfo, fetchedUserInfo, fetchingUserInfo, userInfoStatus, UserInfoError } = nextProps;

    if (fetchedUserInfo && !this.state.fetchedUserInfo) {
      if (userInfo.status) {
        this.setState({fetchedUserInfo: true})
        this.props.getRegistration(this.state.userObject);
      }
      else if (userInfoStatus !== 200) {
        if (UserInfoError.data.error === 'UserName') {
          this.setState({userNameError: true});
          document.getElementById('register').scrollTop = 0;
        }
        else if (UserInfoError.data.error === 'UserEmail') {
          this.setState({userEmailError: true});
          document.getElementById('register').scrollTop = 0;
        }
        this.setState({activeState: false});
      }
    }

    if (fetchingUserInfo) {
      this.setState({fetchedUserInfo: false})
    }

    // Registration
    const {registration, fetchedRegistration, fetchingRegistration, registrationStatus } = nextProps;

    if (fetchedRegistration && !this.state.fetchedRegistration) {
      if (registrationStatus !== 200) {
        this.setState({registrationCodeError: true, activeState: false});
        document.getElementById('register').scrollTop = 200;
        return;
      }

      this.setState({
        msg: registration.message,
        errStatus: true,
        activeState: true,
        fetchedRegistration: true
      });

      if (registration.status) {
        window.location = `${LOGIN}?registration=1`;
      }
    }

    if (fetchingRegistration) {
      this.setState({fetchedRegistration: false, activeState: true})
    }

    // Brand List
    const {brandList, fetchedBrandList, fetchingBrandList } = nextProps;

    if (fetchedBrandList && !this.state.fetchedBrandList) {
      const brands = {};
      brandList.results.forEach((item) => brands[item.tid] = item.name);
      this.setState({brands: brands, fetchedBrandList: true});
    }

    if (fetchingBrandList) {
      this.setState({fetchedBrandList: false})
    }
  }

  getNeedHelp() {
    const {fetchingSupportEmail, fetchedSupportEmail, supportEmail } = this.props;
    if (fetchingSupportEmail) {
      return (
        <div className="need-help">
          <div className="loader text-center">{inlineLoading()}</div>
        </div>
      )
    }
    else if (fetchedSupportEmail && supportEmail) {
      return (
        <div className={classnames("need-help", { "disabled": supportEmail.length === 0 || supportEmail.URL === '' })}>
          <a href={`mailto:${supportEmail}`}>{NEED_HELP}</a>
        </div>
      )
    }
  }

  render() {
    //eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const spaceRegex = /^\S+$/;
    const {
      firstName,
      lastName,
      email,
      username,
      region,
      market,
      language,
      jobTitle,
      registrationCode,
      tncCheck,
      code,
      brand
    } = this.state.form;

    const { fetchingRegions, fetchingLanguages, fetchingJobTitle, fetchingBrandList } = this.props;

    return (
      <>
        <div className='registration-wrapper' id='register'>
          <Formik
            initialValues={{
              firstName: firstName,
              lastName: lastName,
              email: email,
              username: username,
              region: region,
              market: market,
              language: language,
              jobTitle: jobTitle,
              registrationCode: registrationCode,
              tncCheck: tncCheck,
              code: code,
              brand: brand
            }}
            //error handling
            validate={values => {
              let errors = {};
              if (!values.firstName) {
                errors.firstName = REQUIRED;
              }

              if (!values.lastName) {
                errors.lastName = REQUIRED;
              }

              if (!values.code) {
                errors.code = REQUIRED;
              }

              if (!values.email) {
                errors.email = REQUIRED;
              } else if (emailRegex.test(values.email) === false) {
                errors.email = INVALID_EMAIL;
              }

              if (!values.username) {
                errors.username = REQUIRED;
              } else if (spaceRegex.test(values.username) === false) {
                errors.username = INVALID_USERNAME;
              }

              if (this.state.currentRegion === '' || Number(this.state.currentRegion) === 0) {
                errors.region = REQUIRED;
              }

              if (this.state.currentMarket === '' || Number(this.state.currentMarket) === 0) {
                errors.market = REQUIRED;
              }

              if (this.state.currentLanguage === '' || Number(this.state.currentLanguage) === 0) {
                errors.language = REQUIRED;
              }

              if (this.state.currentJob === '' || Number(this.state.currentJob) === 0) {
                errors.jobTitle = REQUIRED;
              }

              if (this.state.currentBrand === '' || Number(this.state.currentBrand) === 0) {
                errors.brand = REQUIRED;
              }
              if (Object.keys(errors).length !== 0) {
                document.getElementById('register').scrollTop = 0;
              }
              return errors;
            }}

            onSubmit={values => {
              this.handleSubmit(values);
            }}
            >
            {/* Form Structure */}
            <Form>
              {this.state.errStatus &&
                <div className="err-msg" dangerouslySetInnerHTML={this.createMarkup(this.state.msg)}></div>
              }
              <Row>
              <h1 className="page-title">{REGISTRATION_LABEL}</h1>
                <Col sm={6} className="first-name field-content">
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
                </Col>
                <Col sm={6} className="last-name field-content">
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
                </Col>

                <div className="col-12 col-sm-6 email field-content">
                  <Field
                    type="text"
                    name="email"
                    placeholder={EMAIL}
                    autoComplete='off'
                    className={classnames({'error': this.state.userEmailError})}
                  />
                  <ErrorMessage name="email" component="div" className="error-msg" />
                </div>
                <div className="col-12 col-sm-6 username field-content">
                  <Field
                    type="text"
                    name="username"
                    placeholder={USERNAME}
                    autoComplete='off'
                    className={classnames({'error': this.state.userNameError})}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-msg"
                    />
                </div>

                <div className="col-12 col-sm-6 location field-content">
                  {fetchingRegions
                    ? <div className="loader text-center">{inlineLoading()}</div>
                    : <SelectiveFilter
                    staticData={this.state.regions}
                    handleSelect={this.handleRegion}
                    allLabel={SELECT_REGION}
                    />
                  }
                  <ErrorMessage name="region" component="div" className="error-msg" />
                </div>
                <div className={classnames("col-12 col-sm-6 market field-content", {"disabled": !this.state.activeMarket})}>
                  <SelectiveFilter
                    staticData={this.state.markets}
                    handleSelect={this.handleMarket}
                    allLabel={SELECT_MARKET}
                    />
                  <ErrorMessage name="market" component="div" className="error-msg" />
                </div>
                <div className={classnames("col-12 col-sm-6 language field-content",{"disabled": !this.state.activeLanguage})}>
                  {fetchingLanguages
                    ? <div className="loader text-center">{inlineLoading()}</div>
                    : <SelectiveFilter
                    staticData={this.state.languages}
                    handleSelect={this.handleLanguage}
                    allLabel={this.state.languageLabel}
                    />
                  }
                  <ErrorMessage name="language" component="div" className="error-msg" />
                </div>

                <div className={classnames("col-12 col-sm-6 job-title field-content", {"disabled": !this.state.activeJobTitle})}>
                  {fetchingJobTitle
                    ? <div className="loader text-center">{inlineLoading()}</div>
                    : <SelectiveFilter
                    staticData={this.state.jobTitles}
                    handleSelect={this.handleJobtitle}
                    allLabel={this.state.jobTitleLabel}
                    />
                  }
                  <ErrorMessage name="jobTitle" component="div" className="error-msg" />
                </div>

                <div className="col-12 col-sm-6 brands field-content">
                  {fetchingBrandList
                    ? <div className="loader text-center">{inlineLoading()}</div>
                    : <SelectiveFilter
                    staticData={this.state.brands}
                    handleSelect={this.handleBrand}
                    allLabel={SELECT_BRAND}
                    />
                  }
                  <ErrorMessage name="brand" component="div" className="error-msg" />
                </div>
                <div className="col-12 col-sm-6 code field-content">
                  <Field
                    type="text"
                    name="code"
                    placeholder={REGISTRATION_CODE}
                    autoComplete='off'
                    className={classnames({'error': this.state.registrationCodeError})}
                  />
                  <ErrorMessage name="code" component="div" className="error-msg" />
                </div>

                <div className="col-12 tnc field-content">
                  <FormGroup check className={classnames({ "disabled": !this.state.currentMarket })}>
                    <Label check for="agree1" className={classnames('my-2', { "active": this.state.agree1 })}>
                      <Input
                        type="checkbox"
                        id="agree1"
                        name="agree1"
                        value={this.state.agree1}
                        onChange={this.toggleCheckbox}
                        autoComplete='off'
                      />
                      {TNC_DESC} <a href={TNC_LINK} target="_blank" rel="noopener noreferrer">{TNC_LABEL}</a>
                    </Label>
                  </FormGroup>
                  <FormGroup check className={classnames({ "disabled": !this.state.currentMarket })}>
                    <Label check for="agree2" className={classnames('my-2', { "active": this.state.agree2 })}>
                      <Input
                        type="checkbox"
                        id="agree2"
                        name="agree2"
                        value={this.state.agree2}
                        onChange={this.toggleCheckbox}
                        autoComplete='off'
                      />{' '}
                      {PRIVACY_POLICY_DESC} <a href={`${PRIVACY_LINK}?market=${this.state.currentMarket}`} target="_blank" rel="noopener noreferrer">{PRIVACY_POLICY_LABEL}</a>
                    </Label>
                  </FormGroup>
                </div>
                <div className="col-12 captcha text-center field-content">
                  <Captcha handleCaptcha={this.handleCaptcha} />
                </div>
                <div className="col-12 more-link mt-3">
                  <Row>
                    <div className="col-12 my-1 col-sm-6 field-content">
                      <button
                        type="submit"
                        className={classnames(
                          "btn btn-outline-secondary text-uppercase", {"active": this.state.agree1 && this.state.agree2}, {"disabled": (!(this.state.agree1 && this.state.agree2 && this.state.captcha)) || this.state.activeState}
                          )}
                          >
                        {REGISTER}
                      </button>
                    </div>
                    <div className="col-12 my-1 col-sm-6 field-content">
                      <button
                        type="button"
                        className={classnames(
                          "btn btn-outline-secondary text-uppercase"
                          )}
                          onClick={this.handleCancel}
                          >
                        {CANCEL}
                      </button>
                    </div>
                  </Row>
                </div>
              </Row>
            </Form>
          </Formik>
          {this.getNeedHelp()}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { regions, fetchedRegions, fetchingRegions, fetchingRegionsError } = state.regions;

  const { markets, fetchedMarkets, fetchingMarkets, fetchingMarketsError } = state.markets;

  const { languages, fetchedLanguages, fetchingLanguages, fetchingLanguagesError, languagesStatus } = state.languages;

  const { jobtitles, fetchedJobTitle, fetchingJobTitle, jobtitlesStatus } = state.jobtitles;

  const { registration, fetchedRegistration, fetchingRegistration, registrationStatus } = state.registration;

  const { brandList, fetchedBrandList, fetchingBrandList } = state.brandList;

  const { userInfo, fetchedUserInfo, fetchingUserInfo, userInfoStatus, UserInfoError } = state.userValidation;

  const { fetchingSupportEmail, fetchedSupportEmail, supportError, supportEmail } = state.support;

  return { regions, fetchedRegions, fetchingRegions, fetchingRegionsError, markets, fetchedMarkets, fetchingMarkets, fetchingMarketsError, languages, fetchedLanguages, fetchingLanguages, fetchingLanguagesError, languagesStatus, jobtitles, fetchedJobTitle, fetchingJobTitle, jobtitlesStatus, registration, fetchedRegistration, fetchingRegistration, registrationStatus, brandList, fetchedBrandList, fetchingBrandList, userInfo, fetchedUserInfo, fetchingUserInfo, userInfoStatus, fetchingSupportEmail, fetchedSupportEmail, supportError, supportEmail, UserInfoError}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRegions: () => dispatch(getUserRegistrationAction.getRegions()),
    getMarkets: () => dispatch(getUserRegistrationAction.getMarkets()),
    getLanguages: (market) => dispatch(getUserRegistrationAction.getLanguages(market)),
    getJobTitles: () => dispatch(getUserRegistrationAction.getJobTitles()),
    getRegistration: (user) => dispatch(getUserRegistrationAction.register(user)),
    getBrandList: () => dispatch(getBrandListAction.getBrandList()),
    userValidate: (email, username) => dispatch(getUserRegistrationAction.userValidate(email, username)),
    getGlobalSupportEmail: () => dispatch(supportActions.getGlobalSupportEmail()),
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

export default connectedComponent;
