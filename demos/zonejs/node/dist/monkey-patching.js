var originalSetTimeout = global.setTimeout;
global.setTimeout = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log('Timeout was called');
    return originalSetTimeout.apply(void 0, args);
};
setTimeout(function () {
    console.log('Hello!');
}, 0);
//# sourceMappingURL=monkey-patching.js.map