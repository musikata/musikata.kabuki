/**
* CommandHandler: for handling script commands.
* @TODO: Flesh this out!
**/

var Radio = require('backbone.radio');

class CommandHandler {
    constructor(opts) {
        this.channel = opts.channel;
        this.plugins = opts.plugins;
        this.widgetRegistry = opts.widgetRegistry;
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
                var widget = new widgetClass(Object.assign({channel: widgetChannel}, cmd.widgetOpts));

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
        }
    }
}

module.exports = CommandHandler;
