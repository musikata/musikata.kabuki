require("babelify/polyfill");
var $ = require('jquery');
var Kabuki = require('kabuki/src/Kabuki');
var CorePlugin = require('kabuki/src/plugins/Core/Core');
var BasicTextPlugin = require('kabuki/src/plugins/BasicText/BasicText');
var AudioPlugin = require('kabuki/src/plugins/Audio/Audio');

var audioCtx = require('kabuki/src//AudioManager/AudioContext');
var AudioManager = require('kabuki/src/AudioManager/AudioManager');


var audioManager = new AudioManager({audioContext: audioCtx});

var assetsToLoad = [
    // @TODO: There is probably a better way to do this...
    {pluginId: 'Core', loaderId: 'Generic', loaderOpts: {
        handler: function() {
            return audioManager.loadSample({
                id: 'testSample',
                url: '/test_assets/test_audio.mp3'
            });
        }
    }}
];

var script = {
    commands: [
        {cmd: 'widget:create', pluginId: 'Text', widgetClassId: 'TextWidget', widgetId: 'text1', regionId: 'stage'},
        {cmd: 'widget:request', widgetId: 'text1', request: 'showText', requestOpts: {text: 'This is the first text'}},
        {cmd: 'service', pluginId: 'Core', serviceId: 'wait', serviceOpts: {time: 500}},
        {cmd: 'widget:request', widgetId: 'text1', request: 'showText', requestOpts: {text: 'This is the second text'}},
        {cmd: 'service', pluginId: 'Core', serviceId: 'wait', serviceOpts: {time: 500}},
        {cmd: 'widget:create', pluginId: 'Audio', widgetClassId: 'AudioWidget', widgetId: 'audio1', 
            widgetOpts: {audioManager: audioManager}},
        {cmd: 'widget:request', widgetId: 'audio1', request: 'playSample', requestOpts: {id: 'testSample'}},
        {cmd: 'service', pluginId: 'Core', serviceId: 'wait', serviceOpts: {time: 1000}},
        {cmd: 'widget:request', widgetId: 'audio1', request: 'playSample', requestOpts: {id: 'testSample'}},
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
            'Audio': AudioPlugin
        },
        assetsToLoad: assetsToLoad
    });

    k.start();
});
