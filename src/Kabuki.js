//
// Main Kabuki code.
//



//Possible app code sample.
//t = new Kabuki.Theatre();
//t.registerPlugin(TextPlugin());
//t.createWidget('Text:TextWidget', {region: 'stage', id: 'stageText'});

// NONE OF THIS WILL WORK YET! JUST PSEUDOCODE.

Kabuki = {};

Kabuki.Theatre = function() {
  this.radio = new Radio();
  this.radio.createChannel('WidgetClass');
};

Theatre.prototype = {
  registerPlugin: function(plugin) {
    // For each widget in plugin.
    for (widgetClassId in plugin.widgets) {
      // Add handler for getting widget class.
      this.radio.channel('WidgetClass').reply(plugin.id + ':' + widgetClassId, plugin.widgets[widgetClassId]);
    }
  },

  createWidget: function(widgetId, opts) {
    var widgetClass = this.radio.channel('WidgetClass').request(widgetId);
    var widgetInstance = new widgetClass(opts, radio: this.radio);
    widgetInstance.id = opts.id;
    widgets[opts.id] = widgetInstance;
    regions[opts.region].add(widgeInstance.view);
  }
}


