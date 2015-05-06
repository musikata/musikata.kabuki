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
        var words = opts.text.split(' ');

        var _showNextWord = () => {

            // Get settings.
            var settings = _.defaults({}, opts, this.options, 
                this.broadcastChannel.request('settings:get'));

            if (words.length == 0) {
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


            var nextWord = words.shift();
            var $wordEl = $('<span style="opacity:0;">').html(' ' + nextWord);
            $wordEl.appendTo(this.$el).fadeTo(400, 1);
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
