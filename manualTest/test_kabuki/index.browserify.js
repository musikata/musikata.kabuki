require("babelify/polyfill");
var $ = require('jquery');
var Kabuki = require('kabuki/src/Kabuki');
var CorePlugin = require('kabuki/src/plugins/Core/Core');
var BasicTextPlugin = require('kabuki/src/plugins/BasicText/BasicText');
var ImagePlugin = require('kabuki/src/plugins/Image/Image');
var AudioPlugin = require('kabuki/src/plugins/Audio/Audio');

var audioCtx = require('kabuki/src//AudioManager/AudioContext');
var AudioManager = require('kabuki/src/AudioManager/AudioManager');


var audioManager = new AudioManager({audioContext: audioCtx});

var assetsToLoad = [
    /*
    // @TODO: There is probably a better way to do this...
    {pluginId: 'Core', loaderId: 'Generic', loaderOpts: {
        handler: function() {
            return audioManager.loadSample({
                id: 'running-water',
                url: '/test_assets/ignore/Jason_Shaw_-_RUNNING_WATERS.mp3'
            });
        }
    }}
    */
];

var script = {
    commands: [
        //{cmd: 'widget:create', pluginId: 'Audio', widgetClass: 'AudioWidget', widgetId: 'audio1', 
            //widgetOpts: {audioManager: audioManager}},
        //{cmd: 'widget:request', widgetId: 'audio1', request: 'playSample', requestOpts: {id: 'running-water'}},

        // Setup status region.
        {cmd: 'widget:request', widgetId: 'stage', req: 'region:add', opts: {id: 'statusRegion', className: 'status'}},
        {cmd: 'widget:create', pluginId: 'Core', widgetClass: 'LayoutWidget', widgetId: 'statusLayout', regionId: 'stage:statusRegion'},
        {cmd: 'widget:request', widgetId: 'statusLayout', req: 'region:add', opts: {id: 'narratorRegion'}},
        {cmd: 'widget:create', pluginId: 'Image', widgetClass: 'ImageWidget', 
            widgetId: 'narratorImage', regionId: 'statusLayout:narratorRegion', widgetOpts: {uri: 'circle.gif'}},

        // Setup text region.
        {cmd: 'widget:request', widgetId: 'stage', req: 'region:add', opts: {id: 'textRegion'}},
        {cmd: 'widget:create', pluginId: 'Text', widgetClass: 'TextWidget', widgetId: 'text1', regionId: 'stage:textRegion'},

        // Start text.
        {cmd: 'widget:request', widgetId: 'text1', req: 'showText', opts: {text: 'Onegai Shimasu. Let us begin with music'}},
        {cmd: 'service', pluginId: 'Core', serviceId: 'wait', opts: {time: 2000}},
        {cmd: 'widget:request', widgetId: 'text1', req: 'showText', opts: {text: 'Listen.'}},
        {cmd: 'service', pluginId: 'Core', serviceId: 'wait', opts: {time: 2000}},
    ]
};


$(document).ready(function() {

    var $theatreEl = $('<div class="kb-theatre">');
    $('body').append($theatreEl);

    var k = new Kabuki.KabukiApp({
        el: $theatreEl,
        loadingImgSrc: 'circle.gif',
        script: script,
        plugins: {
            'Core': CorePlugin,
            'Text': BasicTextPlugin,
            'Audio': AudioPlugin,
            'Image': ImagePlugin
        },
        assetsToLoad: assetsToLoad
    });

    k.start();
});
