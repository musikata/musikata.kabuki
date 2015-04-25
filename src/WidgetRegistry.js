/**
 * WidgetRegistry: basic registry with conventions for Kabuki widgets.
 **/
class WidgetRegistry {
    constructor() {
        this._registry = {};
    }

    registerWidget(opts) {
        this._registry[opts.id] = {
            widget: opts.widget,
            channel: opts.channel
        };
    }

    getWidget(widgetId) {
        return this._registry[widgetId];
    }
}

module.exports = WidgetRegistry;
