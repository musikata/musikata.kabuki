//
// Main Kabuki code.
//

var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('./marionette-shim');

var TheatreLayoutView = require('./TheatreLayoutView');
var ScriptProcessor = require('./ScriptProcessor');
var CommandHandler = require('./CommandHandler');

var Kabuki = {};

var KabukiApp = Marionette.Application.extend({

  initialize(options) {

    this.script = options.script;
    this.scriptProcessor = new ScriptProcessor({
        commandHandler: new CommandHandler({channel: this.channel})
    });

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
      this.scriptProcessor.processScript(this.script);
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


