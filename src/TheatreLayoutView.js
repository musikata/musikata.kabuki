var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');

var ControlsView = require('./ControlsView');
var StageView = require('./StageView');


var TheatreLayoutView = Marionette.LayoutView.extend({
    className: 'kb-theatre',
    template: _.template('<div class="kb-stage"></div><div class="kb-controls"></div>'),
    regions: {
        stage: '.kb-stage',
        controls: '.kb-controls'
    },

    initialize: function(opts) {
        this.channel = opts.channel;
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
        this.showChildView('stage', new StageView({channel: this.channel}));
    },
});

module.exports = TheatreLayoutView;
