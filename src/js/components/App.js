import React, { Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LOADER } from '../helpers/appConstants';
import ProviderComponent from './Global/GlobalBrands';

const Loader = <section className="loading"><img className="loading-icon" src={LOADER} alt="loader" /></section>;

const UserLogin = lazy(() => import(/* webpackChunkName: "UserLogin" */ './UserLogin/UserLogin'));

const UserLogout = lazy(() => import(/* webpackChunkName: "UserLogout" */ './UserLogout/UserLogout'));

const UserRegistration = lazy(() => import(/* webpackChunkName: "UserRegistration" */ './UserRegistration'));

const Homepage = lazy(() => import(/* webpackChunkName: "Homepage" */ './Homepage/Homepage'));

const Header = lazy(() => import(/* webpackChunkName: "Header" */ './Header/Header'));

const NewsListing  = lazy(() => import(/* webpackChunkName: "NewsListing" */ './Trendings/TrendingListing/TrendingListing'));

const NewsDetail = lazy(() => import(/* webpackChunkName: "NewsDetail" */ './Trendings/TrendingDetails/TrendingDetails'));

const Footer = lazy(()=> import(/* webpackChunkName: "Footer" */ './Footer/Footer'));

const ResetPassword = lazy(() => import(/* webpackChunkName: "ResetPassword" */ './ResetPassword/index'));

const ChangePassword = lazy(() => import(/* webpackChunkName: "ChangePassword" */ './ChangePassword/index'));

const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './Errors/NotFoundPage'));

const ModuleListing = lazy(() => import(/* webpackChunkName: "ModuleListing" */ './ModuleListing/ModuleListing'));

const BrandLanding = lazy(() => import(/* webpackChunkName: "BrandLanding" */ './BrandLanding/BrandLanding'));

const ModuleDetails = lazy(() => import(/* webpackChunkName: "ModuleListing" */ './ModuleDetails/ModuleDetails'));

const ProductsListing = lazy(() => import(/* webpackChunkName: "ProductsListing" */ './Products/ProductsListing/ProductsListing'));

const ProductDetail = lazy(() => import(/* webpackChunkName: "ProductDetail" */ './Products/ProductDetails/ProductDetails'));

const IngredientsListing = lazy(() => import(/* webpackChunkName: "ProductDetail" */ './Ingredients/IngredientsListing/IngredientsListing'));

const IngredientDetail = lazy(() => import(/* webpackChunkName: "IngredientDetail" */ './Ingredients/IngredientsDetails/IngredientsDetails'));

const PrivacyPolicy = lazy(() => import(/* webpackChunkName: "PrivacyPolicy" */ './PrivacyPolicy/PrivacyPolicy'));

const TermsAndConditions = lazy(() => import(/* webpackChunkName: "TermsAndConditions" */ './TermsAndConditions/TermsAndConditions'));

const Videos = lazy(() => import(/* webpackChunkName: "Videos" */ './Videos/VideosListing/Videos'));

const UserProfile = lazy(() => import(/* webpackChunkName: "UserProfile" */ './User/Details/UserDetails'));

const UserEdit = lazy(() => import(/* webpackChunkName: "UserEdit" */ './User/Edit/UserEdit'));

const Tools = lazy(() => import(/* webpackChunkName: "Tools" */ './Tools/ToolsListing/Tools'));

class App extends Component {
  render() {
    return (
      <Router forceRefresh={true}>
        <Suspense fallback={Loader}>
          <Header />
          <div className="main-content col-12">
            <ProviderComponent>
              <Switch>
                <Route exact path="/home" component={Homepage} />
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={UserLogin} />
                <Route exact path="/user/login" />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/confirm-password" component={ChangePassword} />
                <Route exact path="/news" component={NewsListing} />
                <Route exact path="/news/:nid" component={NewsDetail} />
                <Route exact path="/logout" component={UserLogout} />
                <Route exact path={"/course/:cid"} component={ModuleListing} />
                <Route path={'/brand/:id'} component={BrandLanding} />
                <Route exact path={"/module/:nid"} component={ModuleDetails} />
                <Route exact path={"/user/:uid"} component={UserProfile} />
                <Route exact path="/products" component={ProductsListing} />
                <Route exact path={"/product/:nid"} component={ProductDetail} />
                <Route exact path="/ingredients" component={IngredientsListing} />
                <Route exact path={"/ingredient/:nid"} component={IngredientDetail} />
                <Route exact path="/videos" component={Videos} />
                <Route exact path="/tools" component={Tools} />
                <Route exact path="/profile-edit" component={UserEdit} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/terms-and-conditions" component={TermsAndConditions} />
                <Route exact path="/registration" component={UserRegistration} />
                <Route component={NotFoundPage} />
              </Switch>
            </ProviderComponent>
          </div>
          <Footer />
        </Suspense>
      </Router>
    );
  }
}

export default App;
