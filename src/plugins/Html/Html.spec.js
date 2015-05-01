var $ = require('jquery');
var Radio = require('backbone.radio');

var Html = require('./Html');

describe('HtmlWidget', function() {

  var $container;
  var channel;
  var broadcastChannel;

  beforeEach(function() {
    channel = Radio.channel('test-Html');
    broadcastChannel = Radio.channel('test-broadcast-Html');
    $container = $('<div>');
    $('body').append($container);
  });

  afterEach(function() {
    $container.remove();
    channel.reset();
  });

  it('should be defined', function() {
    expect(Html.widgets.HtmlWidget).toBeDefined();
  });

  it('should show html', function() {
    var testHtml1 = '<div>foo</div>';
    var hw = new Html.widgets.HtmlWidget({
        channel: channel,
        broadcastChannel: broadcastChannel,
        html: testHtml1
    });
    $container.append(hw.$el);
    hw.render();
    expect($container.html()).toContain(testHtml1);
    var testHtml2 = '<div>bar</div>';
    hw.showHtml(testHtml2)
    expect($container.html()).not.toContain(testHtml1);
    expect($container.html()).toContain(testHtml2);
  });
});
