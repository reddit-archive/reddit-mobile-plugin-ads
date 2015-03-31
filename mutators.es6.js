import React from 'react';
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

const AD_LOCATION = 11;

function Mutators (app) {
  var MobileDeviceAd = MobileDeviceAdFactory(app);

  function indexPageMutator() {
    var el = this;

    query(el, 'main').forEach(function(element) {
      query(element, 'div').forEach(function(element) {
        if (element.ref === 'listings') {
          var listings = element.props.children[0];

          if (listings.length > 0) {
            var userAgent;
            var location = Math.min(AD_LOCATION, listings.length);

            if (global.navigator && global.navigator.userAgent) {
              userAgent = parseUserAgent(global.navigator.userAgent);
            }

            element.props.children[0].splice(location, 0, (
              <MobileDeviceAd userAgent={ userAgent } />
            ));
          }
        }
      });
    });

    return el;
  }

  return {
    'core/pages/index': [
      indexPageMutator,
    ],
  };
}

export default Mutators;
