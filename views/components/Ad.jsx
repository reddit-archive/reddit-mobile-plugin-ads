import React from 'react';
import superagent from 'superagent';

import { models } from 'snoode';

import ListingFactory from 'reddit-mobile/src/views/components/Listing';
var Listing;

class Ad extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  getAd () {
    var srnames = this.props.srnames;

    // If we're not on a sub/multi, we're on the front page, so get front page
    // ads
    if (!this.props.subredditTitle) {
      srnames = ' reddit.com';
    }

    return new Promise((resolve, reject) => {
      superagent.post('https://www.reddit.com/api/request_promo.json')
        .type('form')
        .send({
          srnames: srnames,
          is_mobile_web: true,
        })
        .end(function(err, res) {
          if (err) {
            return reject(err);
          }

          if (res && res.status === 200 && res.body) {
            var link = res.body.data;
            link.url = link.href_url.replace(/&amp;/g, '&');

            link.imp_pixel = link.imp_pixel.replace(/&amp;/g, '&');
            link.adserver_imp_pixel = link.adserver_imp_pixel.replace(/&amp;/g, '&');
            return resolve(new models.Link(link).toJSON());
          } else {
            return reject(res);
          }
        });
      });
  }

  componentDidMount () {
    var ctx = this;

    this.getAd().then((ad) => {
      return this.setState({
        loaded: true,
        ad: new models.Link(ad).toJSON(),
      });
    }, () => {});
  }

  render () {
    if (!this.state.loaded) {
      return (<div></div>);
    }

    var props = this.props;
    props.listing = this.state.ad;
    props.sponsored = true;
    props.hideSubredditLabel = true;
    props.hideWhen = true;
    props.hideDomain = true;

    if (props.listing.disable_comments) {
      props.listing.permalink = undefined;
      props.hide_comments = true;
    }

    if (props.listing.mobile_ad_url) {
      props.listing.preview = {
        source: {
          url: props.listing.mobile_ad_url,
        },
      };
    }

    return (
      <div>
        <Listing {...props } />
        <img src={ props.listing.imp_pixel } height='0' width='0' />
        <img src={ props.listing.adserver_imp_pixel } height='0' width='0' />
      </div>
    );
  }
};

function AdFactory(app) {
  Listing = ListingFactory(app);
  return app.mutate('ads/components/ad', Ad);
}

export default AdFactory;
