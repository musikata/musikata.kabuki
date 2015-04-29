var $ = require('jquery');
var Radio = require('backbone.radio');

var Text = require('./Text');

describe('TextWidget', function() {

  var $container;
  var channel;

  beforeEach(function() {
    channel = Radio.channel('test');
    $container = $('<div>');
    $('body').append($container);
  });

  afterEach(function() {
    $container.remove();
    channel.reset();
  });

  it('should be defined', function() {
    expect(Text.widgets.TextWidget).toBeDefined();
  });

  it('should show text', function() {
    var tw = new Text.widgets.TextWidget({channel: channel});
    $container.append(tw.$el);
    tw.render();
    var testText = 'The canteloupe is the queen of fruits.';
    tw.showText(testText);
    expect($container.html()).toContain(testText);
  });
});