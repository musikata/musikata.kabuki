/**
 * WidgetRegistry: basic registry with conventions for Kabuki widgets.
 **/
class WidgetRegistry {
    constructor() {
        this._registry = {};
    }

    registerWidget(opts) {
        this._registry[opts.id] = opts.widget;
        opts.widget.on('destroy', () => {
            this.unregisterWidget({id: opts.id});
        });
    }

    getWidget(widgetId) {
        return this._registry[widgetId];
    }

    unregisterWidget(opts) {
        delete this._registry[opts.id];
    }
}

module.exports = WidgetRegistry;
