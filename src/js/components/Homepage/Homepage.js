import React, { Component } from 'react';
import HomepageTrending from './Trending/Trending';
import HomepageLevels from './LearningLevels/LearningLevels';
import HomepageSpotlight from './Spotlight/Spotlight';
import {GlobalBrandsConsumer} from '../Global/GlobalBrands';
import '../../../sass/components/homepage.scss';

class Homepage extends Component {
  render() {
    return (
      <GlobalBrandsConsumer>
        {() => {
          return (
            <div className="homepage">
              <HomepageSpotlight />
              <HomepageLevels />
              <HomepageTrending />
            </div>
          )}
        }
      </GlobalBrandsConsumer>
    )
  }
}

export default Homepage;
