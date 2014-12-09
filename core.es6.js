// Export the plugin interface (right now, just a register function that passes
// the app instance into a route builder.)
import Mutators from './mutators';

var core = {};

core.register = function(app, server) {
  var mutators = Mutators(app);

  for (var el in mutators) {
    app.registerMutators(el, mutators[el]);
  }
}

export default core;
