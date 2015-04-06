//
// Main Kabuki code.
//

var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('./marionette-shim');

var TheatreLayoutView = require('./TheatreLayoutView');

var Kabuki = {};

var KabukiApp = Marionette.Application.extend({

  initialize(options) {
    this.theatre = new TheatreLayoutView({
      el: options.el,
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
    // Show a loading view.
    var loadingImgSrc = this.options.loadingImgSrc;
    var LoadingView = Marionette.ItemView.extend({
      template: _.template('<img src="' + loadingImgSrc + '"/>')
    });
    this.theatre.showChildView('stage', new LoadingView());
  },

  hideCurtains() {
  }

});

Kabuki.KabukiApp = KabukiApp;

module.exports = Kabuki;


