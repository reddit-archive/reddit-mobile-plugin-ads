import AdFactory from './Ad';
var Ad;

/** @jsx React.DOM */

import * as React from 'react';

var propsMap = {
  android: [{
    linkText: 'check out our AMA app!',
    linkUrl: 'https://play.google.com/store/apps/details?id=com.reddit.iama',
    thumbnail: '/img/ama.png',
    descriptionText: 'We just released an awesome way to browse AMAs. Get it for Android or iOS.'
  }],
  ios: [{
    linkText: 'check out our AMA app!',
    linkUrl: 'https://itunes.apple.com/us/app/reddit-ama-ask-me-anything/id911630284?mt=8',
    thumbnail: '/img/ama.png',
    descriptionText: 'We just released an awesome way to browse AMAs. Get it for Android or iOS.',
  },
  {
    linkText: 'check out our official ios app, alienblue!',
    linkUrl: 'https://itunes.apple.com/us/app/alien-blue-reddit-official/id923187241?mt=8',
    thumbnail: '/img/alienblue.png',
    descriptionText: 'Browse reddit on the official ios app.',
  }]
};

function getProps (device) {
  var props;

  if (!device) {
    device = (parseInt(Math.random() * 2)) ? 'ios' : 'android';
  }

  var random = parseInt(Math.random() * propsMap[device].length);
  return propsMap[device][random];
}

var MobileDeviceAd = React.createClass({
  componentWillMount: function() {
    this.props = getProps(this.props.userAgent);
  },
  render: function() {
    return (
      <Ad {...this.props} />
    );
  }
});

function MobileDeviceAdFactory(app) {
  Ad = AdFactory(app);
  return app.mutate('ads/components/mobileDeviceAd', MobileDeviceAd);
}

export default MobileDeviceAdFactory;
