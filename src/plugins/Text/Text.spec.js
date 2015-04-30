var $ = require('jquery');
var Radio = require('backbone.radio');

var Text = require('./Text');

describe('TextWidget', function() {

  var $container;
  var channel;
  var broadcastChannel;

  beforeEach(function() {
    channel = Radio.channel('test-Text');
    broadcastChannel = Radio.channel('test-broadcast-Text');
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

  it('should show text', function(done) {
    var tw = new Text.widgets.TextWidget({
        channel: channel,
        broadcastChannel: broadcastChannel,
        autoAdvance: true
    });
    $container.append(tw.$el);
    tw.render();
    var testText = 'The canteloupe is the queen of fruits.';
    tw.showText({text: testText}).then(function() {;
        expect($container.text()).toContain(testText);
        done();
    })
  });
});
