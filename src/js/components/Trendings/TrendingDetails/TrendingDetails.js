/*
  provide trending stories details.

  Redux Store Props:
    story: <Array> data for story.
    fetchingStory: <Boolean> flag to specify if api is fetching story,
    fetchedStory: <Boolean> flag to specify if api has fetched story,
    error: <String/ANY> a message from api detailing about error encountered.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import queryString from 'query-string';

import getTrendingDetailsActions from './trendingDetails.actions';
import LazyImages from '../../Common/LazyImages';
import { BANNER_DEFAULT } from '../../../helpers/appConstants';
import BannerLoader from '../../Loaders/BannerLoader';
import DetailsLoader from '../../Loaders/DetailsLoader';
import {GlobalBrandsConsumer, GlobalBrands} from '../../Global/GlobalBrands';
import '../../../../sass/components/trending-stories.scss';

class TrendingDetails extends Component {
  static contextType = GlobalBrands;
  constructor(props) {
    super(props);
    this.state = {
      story: props.story,
      nid: null,
      preview: 0,
      banner: false
    };

    this.getTrendingDetailsTemplate = this.getTrendingDetailsTemplate.bind(this);
  }

  resize = () => {
    window.outerHeight < window.outerWidth && window.outerHeight < 1200
    ? this.setState({banner: true}) : this.setState({banner: false});
  }

  componentDidMount() {
    const { nid } = this.props.match.params;
    const parsed = queryString.parse(this.props.location.search);
    const { preview, language } = parsed;
    if (preview && nid) {
      this.setState({
        preview: preview,
        nid: nid,
      })
    }

    this.props.getStory(nid, preview, language);
    window.addEventListener("resize", this.resize);
    window.addEventListener("load", this.resize);
  }

  createMarkup(data) {
    return { __html: data };
  }

  getFormatDate(date) {
    let month = [];
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    let d = new Date(new Date(0).setUTCSeconds(date));
    let mon = month[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();

    return `${mon} ${day}, ${year}`;
 }

  getTrendingDetailsTemplate() {
    const { results, fetchingStory, fetchedStory } = this.props;
    const story = results;
    if (fetchedStory) {
      if (results && results.length !== 0) {
        return (
          <div className="story-details text-center">
            <div className="story-content">
              <LazyImages
                defaultImage={BANNER_DEFAULT}
                src={story.imageLarge ? story.imageLarge : BANNER_DEFAULT}
                imageLarge={story.imageLarge ? story.imageLarge : BANNER_DEFAULT}
                type={this.state.banner ? 'featured' : null}
              />
              <div className="heading carousel-caption">
                {story.brand !== 0 && (
                  <h3 className="brand-title">
                    {this.context[story.brand]}
                  </h3>
                )}
                <h1 className="page-title" dangerouslySetInnerHTML={this.createMarkup(story.displayTitle)}></h1>
              </div>
              {story.published !== 0 && (
                <h3 className="brand-title">
                  {this.getFormatDate(story.published)}
                </h3>
              )}
            </div>
            <div className="story-body description">
              <Col xs={12} dangerouslySetInnerHTML={this.createMarkup(story.body)}></Col>
            </div>
          </div>
        )
      }
    }
    else if (fetchingStory) {
      return (
        <>
          <BannerLoader height={1920} width={1080} />
          <DetailsLoader />
        </>
      )
    }
  }

  render() {
    return (
      <GlobalBrandsConsumer>
        {() => {
          return (
            <div className="treding-details-wrapper">
              {this.getTrendingDetailsTemplate()}
            </div>
          )
        }}
      </GlobalBrandsConsumer>
    )
  }
}

function mapStateToProps(state) {
  const { story, fetchingStory, fetchedStory, fetchedStoryError } = state.trendingDetails;

  return { story, fetchingStory, fetchedStory, fetchedStoryError }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStory: (nid, preview, language) => dispatch(getTrendingDetailsActions.getStory(nid, preview, language)),
  }
}


const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    results: propsFromState.story.results,
    sections: false,
    countEnable: true
  }
};

const connectedTrendingDetails = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TrendingDetails);

export default connectedTrendingDetails;
