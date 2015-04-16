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

module.exports = {
  pluginId: 'Core',
  services: {
    'wait': wait
  }
};
