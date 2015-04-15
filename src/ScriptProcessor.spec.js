var $ = require('jquery');

var ScriptProcessor = require('./ScriptProcessor');


fdescribe('ScriptProcessor', function() {

    class MockCommandHandler {

        handle(cmd) {
            if (cmd && cmd.func) {
                return cmd.func();
            }
        }
    }


    function generateScriptProcessor() {
        return new ScriptProcessor({
            commandHandler: new MockCommandHandler()
        });
    }

    it('should be defined', function() {
        expect(ScriptProcessor).toBeDefined();
    });

    it('should process sequential commands', function(){
        var scriptProcessor = generateScriptProcessor();
        var handler = scriptProcessor.commandHandler;
        spyOn(handler, 'handle');

        var script = {
            commands: [
                {cmd: 'a'},
                {cmd: 'b'}
            ]
        }

        scriptProcessor.processScript(script);

        expect(handler.handle).toHaveBeenCalledWith({cmd: 'a'});
        expect(handler.handle).toHaveBeenCalledWith({cmd: 'b'});

    });

    fit('should wait for blocking sequential commands', function(){
        var scriptProcessor = generateScriptProcessor();
        var handler = scriptProcessor.commandHandler;
        spyOn(handler, 'handle').and.callThrough();

        var aDfd = new $.Deferred();

        var script = {
            commands: [
                {id: 'a', func: function(){
                    return aDfd.promise();
                }},
                {id: 'b'}
            ]
        }

        scriptProcessor.processScript(script);

        expect(handler.handle).toHaveBeenCalledWith(jasmine.objectContaining({id: 'a'}));
        expect(handler.handle).not.toHaveBeenCalledWith(jasmine.objectContaining({id: 'b'}));

        aDfd.resolve();

        expect(handler.handle).toHaveBeenCalledWith(jasmine.objectContaining({id: 'b'}));
    });

});
