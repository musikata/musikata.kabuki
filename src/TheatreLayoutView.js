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

        // Proxy region commands to stage.
        this.channel.reply('region:get', (regionOpts) => {
            return this.stageView.getRegion(regionOpts.id);
        });

        this.channel.reply('region:add', (regionOpts) => {
            return this.stageView.addRegion(regionOpts);
        });

        this.channel.reply('region:remove', (regionOpts) => {
            return this.stageView.removeRegion(regionOpts);
        });
    },

    onRender: function() {
        this.showChildView('stage', new StageView({channel: this.channel}));
        this.stageView = this.getRegion('stage').currentView;

        this.showChildView('controls', new ControlsView());

    }
});

module.exports = TheatreLayoutView;
