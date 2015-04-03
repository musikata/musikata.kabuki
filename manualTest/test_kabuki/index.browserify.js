require("babelify/polyfill");
var $ = require('jquery');
var Kabuki = require('kabuki/src/Kabuki');

$(document).ready(function() {
  console.log('here');
  var $theatreEl = $('<div class="kb-theatre">');
  $('body').append($theatreEl);

  var ka = new Kabuki.KabukiApp({
    el: $theatreEl
  });

  ka.start();
});
