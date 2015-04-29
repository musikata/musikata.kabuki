/**
 * SettingsView: for settings dialog.
 **/
var $ = require('jquery');
require('jquery-ui');
var Radio = require('backbone.radio');
var Marionette = require('kabuki/src/marionette-shim');
var Backbone = require('backbone');
var _ = require('underscore');


var SettingsView = Marionette.ItemView.extend({
    className: 'kb-settings',
    template: _.template('SETTINGS' +
        '<div class="text-speed"></div>'
    ),

    ui: {
        textSpeed: '.text-speed'
    },

    constructor: function(opts) {
        var decoratedOpts = Object.assign({model: new Backbone.Model()}, opts);
        Marionette.ItemView.prototype.constructor.call(this, decoratedOpts);
    },

    initialize: function(opts) {
        this.channel = opts.channel;
    },

    onRender: function() {
        $(this.ui.textSpeed).slider({
            value: 50,
            min: 0,
            max: 100,
            step: 20,
            change: (e, ui) => {
                this.model.set('textSpeed', ui.value);
            }
        });
    }
});

module.exports = SettingsView;
