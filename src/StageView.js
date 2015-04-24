var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');

var StageView = Marionette.LayoutView.extend({
    template: _.template(''),
    initialize: function(opts) {
        this.channel = opts.channel;

        // Handle region commands.
        this.channel.reply('region:add', this.addRegion, this);
        this.channel.reply('region:remove', this.removeRegion, this);
        this.channel.reply('region:get', (cmdOpts) => {
            return this.getRegion(cmdOpts.id);
        });
    },

    addRegion: function(opts) {
        var regionElId = this.cid + '-r-' + opts.id;
        this.$el.append('<div id="' + regionElId + '">');
        return Marionette.LayoutView.prototype.addRegion.apply(this, [opts.id, '#' + regionElId]);
    },

    removeRegion: function(opts) {
        var $regionEl = this.getRegion(opts.id).$el;
        var res = Marionette.LayoutView.prototype.removeRegion.apply(this, [opts.id]);
        $regionEl.remove();
        return res;
    }
});

module.exports = StageView;
