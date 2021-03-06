/**
* CommandHandler: for handling script commands.
* @TODO: Flesh this out!
**/

var _ = require('underscore');
var $ = require('jquery');
var Radio = require('backbone.radio');

class CommandHandler {
    constructor(opts) {
        this.channel = opts.channel;
        this.broadcastChannel = this.channel;
        this.plugins = opts.plugins;
        this.widgetRegistry = opts.widgetRegistry;

        // @TODO: later, should probably decouple theatre from commandhandler.
        this.theatreChannel = opts.theatreChannel;
    }

    handle(cmd) {
        // Dispatch by parsing command.
        var cmdParts = cmd.cmd.split(':');

        if (cmdParts[0] == 'widget') {
            var action = cmdParts[1];
            if (action == 'create') {
                var classParts = cmd.widgetClass.split(':');
                var widgetClass = this.plugins[classParts[0]].widgets[classParts[1]];
                var widgetChannel = Radio.channel(cmd.widgetId);
                var mergedWidgetOpts = _.extend({
                    broadcastChannel: this.broadcastChannel, channel: widgetChannel
                }, cmd.widgetOpts);
                var widget = new widgetClass(mergedWidgetOpts);

                // Wire widget command triggers, for things like
                // click behavior.
                _.each(cmd.cmdTriggers, (cmdTrigger, action) => {
                    widget.$el.on(action, () => {
                        this.handle(cmdTrigger);
                    });
                });

                this.widgetRegistry.registerWidget({id: cmd.widgetId, widget: widget});

                if (cmd.regionId) {
                    var regionParts = cmd.regionId.split(':');
                    var regionWidgetId = regionParts[0];
                    var widgetChannel = this.widgetRegistry.getWidget(regionWidgetId).channel;
                    var region = widgetChannel.request('region:get', {id: regionParts[1]});
                    region.show(widget);
                }

            } else if (action == 'request') {
                var widgetChannel = this.widgetRegistry.getWidget(cmd.widgetId).channel;
                return widgetChannel.request(cmd.req, cmd.opts);
            }
        } else if (cmdParts[0] == 'service'){
            var serviceParts = cmd.serviceId.split(':');
            return this.plugins[serviceParts[0]].services[serviceParts[1]](cmd.opts);
        } else if (cmdParts[0] == 'region'){
            return this.channel.request(cmd.cmd, cmd.opts);
        } else if(cmdParts[0] == 'batch') {
            var promises = [];
            for (var i=0; i < cmd.cmds.length; i++) {
                promises.push(this.handle(cmd.cmds[i]));
            }
            return $.when.apply($, promises);
        } else if(cmdParts[0] == 'theatre') {
            // @TODO: decouple theatre later, so that
            // we don't need to keep direct reference here.
            cmdParts.shift();
            var theatreCmd = cmdParts.join(':');
            return this.theatreChannel.request(theatreCmd, cmd.opts);
        } else if(cmdParts[0] == 'debug') {
            console.log('debug', cmd);
        }
    }
}

module.exports = CommandHandler;
