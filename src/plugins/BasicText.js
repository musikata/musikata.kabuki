/**
 * Basic text plugin.
 * Probably not that useful, mainly here to test out architecture ideas.
 **/

// @TODO: THIS WON'T WORK YET! Just Pseudocode for now.
TextPlugin: (function() {
  TextWidget: function(id, radio) {
    this.id = id;
    this.radio = radio;
    this.channel = this.radio.createChannel(this.id);
    this.channel.comply('showText', this.showText);
  };
  TextWidget.prototype = {
    showText: function(txt)) {
      this.view.showText(txt);
    }
  };

  return {
    pluginId: 'Text',
    widgets: {
      'Text': TextWidget
    }
  }
})();
