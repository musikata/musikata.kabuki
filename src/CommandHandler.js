/**
 * CommandHandler: for handling script commands.
 * @TODO: Flesh this out!
 **/

var Radio = require('backbone.radio');

class CommandHandler {
    constructor(opts) {
        this.channel = opts.channel;
        this.plugins = opts.plugins;
        this._widgetRegistry = {};
    }

    handle(cmd) {
        // Dispatch by parsing command.
        var cmdParts = cmd.cmd.split(':');

        if (cmdParts[0] == 'widget') {
            var action = cmdParts[1];
            if (action == 'create') {
                var widgetClass = this.plugins[cmd.pluginId].widgets[cmd.widgetClassId];
                var widgetChannel = Radio.channel(cmd.widgetId);
                var widget = new widgetClass(Object.assign({channel: widgetChannel}, cmd.widgetOpts));
                this._widgetRegistry[cmd.widgetId] = {
                    widget: widget,
                    channel: widgetChannel
                }

                if (cmd.regionId) {
                    var region = this.channel.request('region:get', {id: cmd.regionId})
                    region.show(widget);
                }

            } else if (action == 'request') {
                var widgetChannel = this._widgetRegistry[cmd.widgetId].channel;
                return widgetChannel.request(cmd.request, cmd.requestOpts);
            }
        } else if (cmdParts[0] == 'service'){
            return this.plugins[cmd.pluginId].services[cmd.serviceId](cmd.serviceOpts);
        } else if (cmdParts[0] == 'region'){
            return this.channel.request(cmd.cmd, cmd.opts);
        }
    }
}

module.exports = CommandHandler;
