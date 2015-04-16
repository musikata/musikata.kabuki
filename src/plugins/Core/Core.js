/**
 * Kabuki Core Plugins
 **/

var $ = require('jquery');

/**
 * Handler to wait for a given amount of time.
 **/
function wait(opts) {
    var dfd = new $.Deferred();
    setTimeout(function() {
        dfd.resolve();
    }, opts.time)
    return dfd.promise();
}

/**
 * Run a generic loader, passed in as a handler function.
 **/
function genericLoader(opts) {
    return $.when(opts.handler());
}

module.exports = {
  pluginId: 'Core',
  services: {
    'wait': wait
  },
  loaders: {
    'Generic': genericLoader
  }
};
