/**
 * TheatreLayoutView: main container for Kabuki regions.
 **/
var Radio = require('backbone.radio');
var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');

var LayoutWidget = require('./plugins/Core/Core').widgets.LayoutWidget;
var ControlsView = require('./ControlsView');


var TheatreLayoutView = LayoutWidget.extend({
    className: 'kb-theatre',
    template: _.template('' +
        '<div class="kb-stage-container"></div>' + 
        '<div class="kb-controls-container"></div>'
    ),
    regions: {
        stage: '.kb-stage-container',
        controls: '.kb-controls-container',
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

        // Create modal region for settings.
        this.addModalRegion({id: 'settings'});

    },

    showCurtains: function(opts) {
        // Show a loading view in the stage region.
        var LoadingView = Marionette.ItemView.extend({
            template: _.template('<img src="' + opts.loadingImgSrc + '"/>')
        });
        this.showChildView('stage', new LoadingView());
    },

    showStage: function() {
        this.stage = new LayoutWidget({channel: Radio.channel('stage'), className: 'kb-stage'});
        this.showChildView('stage', this.stage);
    },

    addModalRegion: function(opts) {
        // @TODO: Hmm...think on whether this should go here or
        // in LayoutWidget.
        this.addRegion({
            id: opts.id,
            classAttr: 'kb-modal' + (opts.classAttr || ''),
            style: _.extend({display: 'none'}, opts.style)
        });
        if (opts.show) {
            this.toggleModal(opts);
        }
    },

    toggleModalRegion: function(opts) {
        // @TODO: add in pausing, for text and sound.
       var region = this.getRegion(opts.id);
       var promise;
       if (region.$el.is(':visible')) {
        promise = region.$el.fadeOut().promise();
       } else {
        promise =region.$el.fadeIn().promise();
       }

       return promise;
    },

    toggleSettingsView: function() {
        var settingsRegion = this.getRegion('settings');
        if (settingsRegion.hasView()) {
            settingsRegion.empty({preventDestroy: true});
        } else {
            settingsRegion.show(this.getSettingsView());
        }
        this.toggleModalRegion({id: 'settings'});
    }
});

module.exports = TheatreLayoutView;
