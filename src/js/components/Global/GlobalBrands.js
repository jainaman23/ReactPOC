import React, {Component} from 'react';
import axios from 'axios';
import { getAuthorization, isAnonymous, isLoggedIn } from '../../helpers/authorization';

let config = getAuthorization();

export const GlobalBrands = React.createContext({});
export const GlobalBrandsProvider = GlobalBrands.Provider;
export const GlobalBrandsConsumer = GlobalBrands.Consumer;

class ProviderComponent extends Component {
  constructor() {
    super();
    this.state = {
      brands: ['load']
    }
  }

  componentDidMount() {
    if (!isAnonymous()) {
      const brands = localStorage.getItem('brands');
      let brandsItem = {};
      let that = this;
      if(brands) {
        this.setState({
          brands: JSON.parse(brands)
        })
      }
      else {
        if (!isLoggedIn()) {
          config = {};
        }
        axios.get(`/api/v1/brands?_format=json`, config)
        .then((response) => {
          if (response.data && response.status === 200 && response.data.results.length !==0) {
            response.data.results.forEach((item) => {
              brandsItem[item.tid] = item.name;
            });
            localStorage.setItem('brands', JSON.stringify(brandsItem));
            that.setState({
              brands: brandsItem
            })
          }
          else if (response.data && response.status === 204) {
            that.setState({
              brands: []
            })
          }
        })
        .catch((error) => {
          if (error.response.status !== 204 && error.response.status !== 200) {
            that.setState({
              brands: ['nodata']
            })
          }
        })
      }
    }
  }

  render() {
    return (
      <GlobalBrandsProvider value={this.state.brands}>
        {this.props.children}
      </GlobalBrandsProvider>
    )
  }
}

export default ProviderComponent;