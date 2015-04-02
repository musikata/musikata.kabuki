require("babelify/polyfill");
var $ = require('jquery');
var Kabuki = require('kabuki/src/Kabuki');

$(document).ready(function() {
  console.log('here');
  var $container = $('<div id="container">');
  $('body').append($container);

  var t = new Kabuki.Theatre({
    el: $container
  });

  t.start();
});
