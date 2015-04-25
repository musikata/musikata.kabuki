/**
* Basic text plugin.
* Probably not that useful, mainly here to test out architecture ideas.
**/

var Marionette = require('kabuki/src/marionette-shim');

var ImageWidget = Marionette.View.extend({
    initialize: function(opts) {
        this.channel = opts.channel;
        this.channel.reply('showImage', (opts) => {
            this.showImage(opts.uri);
        });
        if (opts.uri) {
            this.showImage(opts.uri);
        }
    },

    showImage: function(imageUri) {
        this.$el.html('<img src="' + imageUri + '">');
    }
});

module.exports = {
    pluginId: 'Image',
    widgets: {
        'ImageWidget': ImageWidget
    }
};
