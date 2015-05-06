/**
* Basic text plugin.
* Probably not that useful, mainly here to test out architecture ideas.
**/

var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('kabuki/src/marionette-shim');


var TextWidget = Marionette.View.extend({
    initialize: function(opts) {
        this.broadcastChannel = opts.broadcastChannel;
        this.channel = opts.channel;
        this.cmdTriggers = opts.cmdTriggers || [];
        this.autoAdvance = opts.autoAdvance;

        this.channel.reply('showText', (opts) => {
            return this.showText(opts);
        });
    },

    showText: function(opts) {
        // @TODO: get this from settings.
        var dfd = new $.Deferred();

        this.$el.empty();

        // Place hidden words for spacing.
        var words = opts.text.split(' ');
        _.each(words, (word) => {
            $('<span style="opacity:0;">').html(' ' + word).appendTo(this.$el);
        });

        var curWordIdx = 0;
        var _showNextWord = () => {

            // Get settings.
            var settings = _.defaults({}, opts, this.options, 
                this.broadcastChannel.request('settings:get'));

            if (curWordIdx == words.length) {
                var advance = function() {
                    if (!settings.advanceDelay) {
                        dfd.resolve();
                        return;
                    }
                    setTimeout(function(){dfd.resolve()}, settings.advanceDelay);
                };

                if (settings.autoAdvance) {
                    advance();
                } else {
                    // @TODO: wait for 'next' signal.
                    this.broadcastChannel.on('controls:next', () => {
                        advance();
                    });
                }
                return;
            }

            this.$el.children().eq(curWordIdx).fadeTo(400, 1);
            curWordIdx++;
            setTimeout(_showNextWord, settings.textSpeed);
        };

        _showNextWord();

        return dfd.promise();
    },

});

module.exports = {
    pluginId: 'Text',
    widgets: {
        'TextWidget': TextWidget
    }
};
