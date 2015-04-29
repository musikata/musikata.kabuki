/**
 * TheatreLayoutView: main container for Kabuki regions.
 **/
var Radio = require('backbone.radio');
var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');

var LayoutWidget = require('./plugins/Core/Core').widgets.LayoutWidget;
var ControlsView = require('./ControlsView');


var TheatreLayoutView = Marionette.LayoutView.extend({
    className: 'kb-theatre',
    template: _.template('' +
        '<div class="kb-settings"></div>' + 
        '<div class="kb-stage"></div>' + 
        '<div class="kb-controls"></div>'
    ),
    regions: {
        stage: '.kb-stage',
        controls: '.kb-controls',
        settings: '.kb-settings'
    },

    initialize: function(opts) {
        this.channel = opts.channel;

        // @TODO: clean this up later.
        this.getSettingsView = opts.getSettingsView || function() {
            return new Marionette.ItemView();
        };

        this.channel.reply('toggleSettings', this.toggleSettingsView, this);
    },

    onRender: function() {
        this.showChildView('controls', new ControlsView());

    },

    showCurtains: function(opts) {
        // Show a loading view in the stage region.
        var LoadingView = Marionette.ItemView.extend({
            template: _.template('<img src="' + opts.loadingImgSrc + '"/>')
        });
        this.showChildView('stage', new LoadingView());
    },

    showStage: function() {
        this.stage = new LayoutWidget({channel: Radio.channel('stage')});
        this.showChildView('stage', this.stage);
    },

    toggleSettingsView: function() {
        if (this.getRegion('settings').hasView()) {
            this.getRegion('settings').empty({preventDestroy: true});
        } else {
            this.showChildView('settings', this.getSettingsView());
        }
    }
});

module.exports = TheatreLayoutView;
