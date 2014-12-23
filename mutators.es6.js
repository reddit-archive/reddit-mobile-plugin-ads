import * as React from 'react';
import { mutate, query } from 'react-mutator';

import MobileDeviceAdFactory from './views/components/MobileDeviceAd'

function parseUserAgent (agent) {
  if (/Android/i.test(agent)) {
    return 'android';
  }

  if (/iPhone|iPad|iPod/i.test(agent)) {
    return 'ios';
  }
}

function Mutators (app) {
  var MobileDeviceAd = MobileDeviceAdFactory(app);

  function indexPageMutator() {
    var el = this;

    query(el, 'main').forEach(function(element) {
      var listings = element.props.children[1];
      var location = parseInt(Math.random() * listings.length);
      var userAgent;

      if (listings.length > 0) {
        if (global.navigator && global.navigator.userAgent) {
          userAgent = parseUserAgent(global.navigator.userAgent);
        }

        listings.splice(location, 0, <MobileDeviceAd userAgent={ userAgent } />);
      }
    });

    return el;
  }

  return {
    'core/components/index': [
      indexPageMutator,
    ],
  };
}

export default Mutators;
