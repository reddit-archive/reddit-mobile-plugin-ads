import * as React from 'react';
import { mutate, query } from 'react-mutator';

import AdFactory from './views/components/Ad'

function Mutators (app) {
  var Ad = AdFactory(app);

  function indexPageMutator() {
    var el = this;

    query(el, 'main').forEach(function(element) {
      element.props.children.splice(0, 0, <Ad />);
    });
  }

  return {
    'core/components/index': [
      indexPageMutator,
    ],
  };
}

export default Mutators;
