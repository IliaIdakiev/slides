"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jasmine_marbles_1 = require("jasmine-marbles");
var index_1 = require("./index");
describe('App Effects Testing', function () {
    var effects;
    var messageBus;
    beforeEach(function () {
        messageBus = new index_1.MessageBus();
        effects = new index_1.AppEffects(messageBus);
    });
    it('should test login', function () {
        messageBus._mbus = jasmine_marbles_1.cold('--a', { a: null });
        var expected = jasmine_marbles_1.cold('--b', { b: null });
        expect(effects.login$).toBeObservable(expected);
    });
});
//# sourceMappingURL=index.spec.js.map