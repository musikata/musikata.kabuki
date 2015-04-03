//
// Main Kabuki code.
//

var $ = require('jquery');
var Marionette = require('./marionette-shim');

var TheatreLayoutView = require('./TheatreLayoutView');

var Kabuki = {};

var KabukiApp = Marionette.Application.extend({

  initialize(options) {
    this.theatre = new TheatreLayoutView({
      el: options.el
    });
  },

  onStart(options) {
    this.theatre.render();

    this.showCurtains();

    // start loading
    var loadPromises = [];

    // when loading finishes, show 'next' button.
    $.when.apply($, loadPromises).then(() => {
      this.channel.trigger('loading:end');
    });
  },

  showCurtains() {
  },

  hideCurtains() {
  }

});

Kabuki.KabukiApp = KabukiApp;

module.exports = Kabuki;


