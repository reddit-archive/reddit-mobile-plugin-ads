import React from 'react';
import superagent from 'superagent';
import constants from 'reddit-mobile/src/constants';

import { models } from 'snoode';

import ListingFactory from 'reddit-mobile/src/views/components/Listing';
var Listing;
var _ = require('lodash').runInContext();

class Ad extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
    };
    this._onScroll = _.throttle(this._onScroll.bind(this), 100);
    this._removeListeners = this._removeListeners.bind(this);
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
    this.getAd().then((ad) => {
      return this.setState({
        loaded: true,
        ad: new models.Link(ad).toJSON(),
      });
    }, () => {});

    window.addEventListener('scroll', this._onScroll);
    window.addEventListener('resize', this._onScroll);
    this._hasListeners = true;
    this._onScroll();
  }

  componentWillUnmount() {
    this._removeListeners();
  }

  _removeListeners() {
    if (this._hasListeners) {
      window.removeEventListener('scroll', this._onScroll);
      window.removeEventListener('resize', this._onScroll);
      this._hasListeners = false;
    }
  }

  _onScroll() {
    var adObject = this.state.ad;
    if (adObject) {
      var node = React.findDOMNode(this);
      var winHeight = window.innerHeight;
      var rect = node.getBoundingClientRect();
      var top = rect.top;
      var height = rect.height;
      var bottom = top + rect.height;
      var middle = (top + bottom) / 2;
      var middleIsAboveBottom = middle < winHeight;
      var middleIsBelowTop = bottom > constants.TOP_NAV_HEIGHT + height / 2;
      if(middleIsAboveBottom && middleIsBelowTop) {
        var srcs=['imp_pixel', 'adserver_imp_pixel'];
        for (var i = 0, iLen = srcs.length; i < iLen; i++) {
          var pixel = new Image();
          pixel.src = adObject[srcs[i]];
        }
        this._removeListeners();
      }
    }
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

    var listingPreview;
    if (props.compact && props.listing.thumbnail) {
      listingPreview = props.listing.thumbnail;
    } else if (props.listing.mobile_ad_url) {
      listingPreview = props.listing.mobile_ad_url;
    }
    if (listingPreview) {
      props.listing.preview = {
        source: {
          url: listingPreview,
        },
      };
    }

    return (
      <div>
        <Listing {...props } />
      </div>
    );
  }
};

function AdFactory(app) {
  Listing = ListingFactory(app);
  return app.mutate('ads/components/ad', Ad);
}

export default AdFactory;
