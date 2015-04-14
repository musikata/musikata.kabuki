var $ = require('jquery');

var ScriptProcessor = require('./ScriptProcessor');


fdescribe('ScriptProcessor', function() {

    class MockCommandHandler {
        constructor() {
            this.promises = {};
        }

        handle(cmd) {
            if (cmd.data && cmd.data.blocking) {
                var dfd = new $.Deferred();

                setTimeout(function() {
                    dfd.resolve();
                }, 100);

                var promise = this.promises[cmd.id] = dfd.promise();

                return promise;
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

    fit('should wait for blocking sequential commands', function(done){
        var scriptProcessor = generateScriptProcessor();
        var handler = scriptProcessor.commandHandler;
        spyOn(handler, 'handle').and.callThrough();

        var script = {
            commands: [
                {id: 'a', data: {blocking: true}},
                {id: 'b'}
            ]
        }

        scriptProcessor.processScript(script);

        expect(handler.handle).not.toHaveBeenCalledWith(
            jasmine.objectContaining({id: 'a'}));

        expect(handler.handle).not.toHaveBeenCalledWith(
            jasmine.objectContaining({id: 'b'}));

        handler.promises['a'].then(function() {
            expect(handler.handle).toHaveBeenCalledWith(
                jasmine.objectContaining({id: 'a'}));

            expect(handler.handle).not.toHaveBeenCalledWith(
                jasmine.objectContaining({id: 'b'}));
        }).done(function() {
            expect(handler.handle).toHaveBeenCalledWith(
                jasmine.objectContaining({id: 'b'}));
                done();
        });

    });

});
