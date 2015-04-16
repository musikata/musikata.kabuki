require("babelify/polyfill");
var $ = require('jquery');
var Kabuki = require('kabuki/src/Kabuki');
var CorePlugin = require('kabuki/src/plugins/Core/Core');
var BasicTextPlugin = require('kabuki/src/plugins/BasicText/BasicText');

var script = {
    commands: [
        {cmd: 'widget:create', pluginId: 'Text', widgetClassId: 'TextWidget', widgetId: 'text1', regionId: 'stage'},
        {cmd: 'widget:request', widgetId: 'text1', request: 'showText', requestOpts: {text: 'This is the first text'}},
        {cmd: 'service', pluginId: 'Core', serviceId: 'wait', serviceOpts: {time: 1000}},
        {cmd: 'widget:request', widgetId: 'text1', request: 'showText', requestOpts: {text: 'This is the second text'}},
    ]
};


$(document).ready(function() {
  console.log('here');
  var $theatreEl = $('<div class="kb-theatre">');
  $('body').append($theatreEl);

  var k = new Kabuki.KabukiApp({
    el: $theatreEl,
    loadingImgSrc: 'circle.gif',
    script: script,
    plugins: {
        'Core': CorePlugin,
        'Text': BasicTextPlugin
    }
  });

  k.start();
});
