/** @jsx React.DOM */

import * as React from 'react';

import ListingFactory from 'switcharoo-plugin-core/views/components/Listing';
var Listing;

var Ad = React.createClass({
  render: function() {
    var fakeAdListingProps = {
      listing: {
        url: '/ad',
        permalink: '/ad/idnumber',
        cleanUrl: '/ad',
        thumbnail: '',
        title: 'This is an advertisement',
        listingClass: 'ad',
        hideSubredditLabel: 'true',
        comments: parseInt(Math.random() * 1000),
      }
    };

    return (
      <Listing {...fakeAdListingProps} />
    );
  }
});

function AdFactory(app) {
  Listing = ListingFactory(app);
  return app.mutate('ads/components/ad', Ad);
}

export default AdFactory;
