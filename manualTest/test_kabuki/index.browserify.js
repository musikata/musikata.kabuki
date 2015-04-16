require("babelify/polyfill");
var $ = require('jquery');
var Kabuki = require('kabuki/src/Kabuki');
var CorePlugin = require('kabuki/src/plugins/Core/Core');
var BasicText = require('kabuki/src/plugins/BasicText/BasicText');

var script = {
    commands: [
        {cmd: 'widget:create:text', opts: {widgetId: 'text1'}},
        {cmd: 'text:show', opts: {widgetId: 'text1', text: 'This is the first text'}},
        {cmd: 'wait', opts: {time: 2000}},
        {cmd: 'text:show', opts: {widgetId: 'text1', text: 'This is the second text'}},
    ]
};


$(document).ready(function() {
  console.log('here');
  var $theatreEl = $('<div class="kb-theatre">');
  $('body').append($theatreEl);

  var k = new Kabuki.KabukiApp({
    el: $theatreEl,
    loadingImgSrc: 'circle.gif',
    script: script
  });

  k.start();
});
