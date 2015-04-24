var $ = require('jquery');
var Radio = require('backbone.radio');

var ImagePlugin = require('./Image');

describe('ImageWidget', function() {

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
    expect(ImagePlugin.widgets.ImageWidget).toBeDefined();
  });

  it('should show an image', function() {
    var iw = new ImagePlugin.widgets.ImageWidget({channel: channel});
    $container.append(iw.$el);
    iw.render();
    var testImg = '/base/test_assets/test_image.gif';
    iw.showImage(testImg);
    var $img = $container.find('img');
    expect($img.length).toBe(1);
    expect($img.attr('src')).toBe(testImg);
  });
});
