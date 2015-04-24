import React from 'react';
import { mutate, query } from 'react-mutator';

import AdFactory from './views/components/Ad'

import _ from 'lodash';

const AD_LOCATION = 11;

function Mutators (app) {
  var Ad = AdFactory(app);

  function indexPageMutator() {
    var el = this;

    query(el, 'div').forEach(function(element) {
      if (element.ref === 'listings') {
        var listings = element.props.children[0];

        if (listings.length > 0) {
          var location = Math.min(AD_LOCATION, listings.length);
          var randomElementIndex = parseInt(element.props.children[0].length * Math.random());
          var hijackedProps = element.props.children[0][randomElementIndex].props;

          var srnames = _.uniq(element.props.children[0].map(function(l) {
            return l.props.listing.subreddit;
          }));

          element.props.children[0].splice(location, 0, (
            <Ad { ...hijackedProps } srnames={srnames} />
          ));
        }
      }
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
