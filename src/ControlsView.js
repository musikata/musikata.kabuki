var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('kabuki/src/marionette-shim');


var ControlsView = Marionette.ItemView.extend({
    template: _.template('<span class="button expand" data-signal="next">next</span>'),
    events: {
        'click .button': 'onClickButton',
    },

    initialize: function(opts) {
        this.channel = opts.channel;
    },

    onClickButton: function(e) {
        var signal = $(e.target).data('signal');
        this.channel.trigger('controls:' + signal);
    }

});

module.exports = ControlsView;
