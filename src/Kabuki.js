//
// Main Kabuki code.
//

var $ = require('jquery');
var Marionette = require('./marionette-shim');

var Kabuki = {};

class Theatre extends Marionette.Application {
  initialize(options) {

    this.stage = new Marionette.LayoutView({
      el: options.el
    });
  }

  onStart(options) {
    this.showCurtains();

    // start loading
    var loadPromises = [];

    // when loading finishes, show 'next' button.
    $.when.apply($, loadPromises).then(() => {
      this.channel.trigger('loading:end');
    });
  }

  showCurtains() {
    this.stage.$el.html('curtain');
  }

  hideCurtains() {
  }

}

Kabuki.Theatre = Theatre;

module.exports = Kabuki;


