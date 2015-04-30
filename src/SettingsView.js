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
        '<div class="text-speed"></div>' +
        '<div><label>auto advance?</label><input type="checkbox" class="auto-advance"></div>' +
        '<div class="advance-delay"></div>'
    ),

    ui: {
        textSpeed: '.text-speed',
        autoAdvance: '.auto-advance',
        advanceDelay: '.advance-delay'
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

        $(this.ui.autoAdvance).on('change', () => {
            this.model.set('autoAdvance', $(this.ui.autoAdvance).prop('checked'));
        });

        $(this.ui.advanceDelay).slider({
            value: 50,
            min: 0,
            max: 100,
            step: 20,
            change: (e, ui) => {
                this.model.set('advanceDelay', ui.value);
            }
        });

    }
});

module.exports = SettingsView;
