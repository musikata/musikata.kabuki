var $ = require('jquery');
var BasicText = require('./BasicText');

describe('TextWidget', function() {

  var $container;

  beforeEach(function() {
    $container = $('<div>');
    $('body').append($container);
  });

  afterEach(function() {
    $container.remove();
  });

  it('should be defined', function() {
    expect(BasicText.widgets.TextWidget).toBeDefined();
  });

  it('should show text', function() {
    var tw = new BasicText.widgets.TextWidget();
    $container.append(tw.$el);
    tw.render();
    var testText = 'The canteloupe is the queen of fruits.';
    tw.showText(testText);
    expect($container.html()).toContain(testText);
  });
});
