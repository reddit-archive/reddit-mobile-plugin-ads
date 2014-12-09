import { mutate, query } from 'switcharoo/src/mutate';

import AdFactory from './viws/components/Ad'
var Ad;

function Mutators (app) {
  Ad = AdFactory(app);

  var indexPageMutator = function() {
    query(this, 'main').forEach(function(el) {
      element.props.children.splice(0, 0, <Ad />);
    });
  }

  return {
    'core/components/index': [
      indexPageMutator,
    ],
  }

}

export default Mutators;
