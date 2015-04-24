var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');

var StageView = Marionette.LayoutView.extend({
    template: _.template(''),
    initialize: function(opts) {
        this.channel = opts.channel;
        this.channel.reply('region:get', (regionOpts) => {
            return this.getRegion('stage');
        });
    },

    addRegion: function(opts) {
        var regionElId = this.cid + '-r-' + opts.id;
        this.$el.append('<div id="' + regionElId + '">');
        Marionette.LayoutView.prototype.addRegion.apply(this, [opts.id, '#' + regionElId]);
    },

    removeRegion: function(opts) {
        var $regionEl = this.getRegion(opts.id).$el;
        Marionette.LayoutView.prototype.removeRegion.apply(this, [opts.id]);
        $regionEl.remove();
    }
});

module.exports = StageView;
