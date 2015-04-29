require("babelify/polyfill");
var $ = require('jquery');
var Kabuki = require('kabuki/src/Kabuki');
var CorePlugin = require('kabuki/src/plugins/Core/Core');
var TextPlugin = require('kabuki/src/plugins/Text/Text');
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
        
        // Show sensei and text.
        /*
        {cmd: 'widget:request', widgetId: 'stage', req: 'region:add', opts: {id: 'imageRegion', style: {opacity: 0}}},
        {cmd: 'widget:create', widgetClass: 'Image:ImageWidget', 
            widgetId: 'big-sensei', regionId: 'stage:imageRegion', widgetOpts: {uri: 'cricket_colored.svg'}},

        {cmd: 'widget:request', widgetId: 'stage', req: 'region:add', opts: {id: 'textRegion', style: {opacity: 0}}},
        {cmd: 'widget:create', widgetClass: 'Text:TextWidget', widgetId: 'text1', regionId: 'stage:textRegion'},
        {cmd: 'widget:request', widgetId: 'text1', req: 'showText', opts: {text: 'Onegai Shimasu'}},

        {cmd: 'batch', cmds: [
            {cmd: 'widget:request', widgetId: 'stage', req: 'region:animate', opts: {
                id: 'textRegion', props: {opacity: 1}, opts: {duration: 2000}}
            },
            {cmd: 'widget:request', widgetId: 'stage', req: 'region:animate', opts: {
                    id: 'imageRegion', props: {opacity: 1}, opts: {duration: 2000}}
            },
            ]
        },

        {cmd: 'service', serviceId: 'Core:wait', opts: {time: 2000}},

        {cmd: 'batch', cmds: [
            {cmd: 'widget:request', widgetId: 'stage', req: 'region:animate', opts: {
                id: 'textRegion', props: {opacity: 0}, opts: {duration: 1000}}
            },
            {cmd: 'widget:request', widgetId: 'stage', req: 'region:animate', opts: {
                    id: 'imageRegion', props: {opacity: 0}, opts: {duration: 1000}}
            },
            ]
        },

        {cmd: 'widget:request', widgetId: 'stage', req: 'region:remove', opts: {id: 'textRegion'}},
        {cmd: 'widget:request', widgetId: 'stage', req: 'region:remove', opts: {id: 'imageRegion'}},
        */

        {cmd: 'theatre:toggleSettings'},

        // Setup status region.
        {cmd: 'widget:request', widgetId: 'stage', req: 'region:add', opts: {id: 'statusRegion', className: 'status', style: {opacity: 0}}},
        {
            cmd: 'widget:create', widgetClass: 'Core:LayoutWidget', 
            widgetId: 'statusLayout', regionId: 'stage:statusRegion', widgetOpts: {className: 'status-layout'}
        },
        {cmd: 'widget:request', widgetId: 'stage', req: 'region:animate', opts: {
            id: 'statusRegion', props: {opacity: 1}, opts: {duration: 1000}}
        },

        // Status:narrator.
        {cmd: 'widget:request', widgetId: 'statusLayout', req: 'region:add', opts: {id: 'narratorRegion', className: 'narrator', style: {opacity: 0}}
        },
        {cmd: 'widget:create', widgetClass: 'Image:ImageWidget', 
            widgetId: 'narratorImage', regionId: 'statusLayout:narratorRegion', widgetOpts: {uri: 'cricket-head-optimized.svg'}},
        {cmd: 'widget:request', widgetId: 'statusLayout', req: 'region:animate', opts: {
            id: 'narratorRegion', props: {opacity: 1}, opts: {duration: 2000}}
        },

        // Status: settings launcher.
        {cmd: 'widget:request', widgetId: 'statusLayout', req: 'region:add', opts: {id: 'settingsLauncherRegion', className: 'settings-launcher'}},
        {cmd: 'widget:create', widgetClass: 'Text:TextWidget', widgetId: 'settingsLauncher', regionId: 'statusLayout:settingsLauncherRegion',
            widgetOpts: {cmdTriggers: {'click': {cmd: 'theatre:toggleSettings'}}}
        },
        {cmd: 'widget:request', widgetId: 'settingsLauncher', req: 'showText', opts: {text: 'S'}},

        // Setup text region.
        {cmd: 'widget:request', widgetId: 'stage', req: 'region:add', opts: {id: 'textRegion'}},
        {cmd: 'widget:create', widgetClass: 'Text:TextWidget', widgetId: 'text1', regionId: 'stage:textRegion'},

        // Start text.
        {cmd: 'widget:request', widgetId: 'text1', req: 'showText', opts: {text: 'Let us begin with music'}},
        {cmd: 'service', serviceId: 'Core:wait', opts: {time: 2000}},
        {cmd: 'widget:request', widgetId: 'text1', req: 'showText', opts: {text: 'Listen.'}},
        {cmd: 'service', serviceId: 'Core:wait', opts: {time: 2000}},
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
            'Text': TextPlugin,
            'Audio': AudioPlugin,
            'Image': ImagePlugin
        },
        assetsToLoad: assetsToLoad
    });

    k.start();
});
