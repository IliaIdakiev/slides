"use strict";
exports.__esModule = true;
var perf_hooks_1 = require("perf_hooks");
var timingZone = Zone.current.fork({
    name: 'timingZone',
    onInvoke: function (parentZoneDelegate, currentZone, targetZone, callback, applyThis, applyArgs, source) {
        var start = perf_hooks_1.performance.now();
        parentZoneDelegate.invoke(targetZone, callback, applyThis, applyArgs, source);
        var end = perf_hooks_1.performance.now();
        console.log('Zone:', targetZone.name, 'Intercepting zone:', currentZone.name, 'Duration:', end - start);
    }
});
var logZone = timingZone.fork({
    name: 'logZone',
    onInvoke: function (parentZoneDelegate, currentZone, targetZone, callback, applyThis, applyArgs, source) {
        console.log('Zone:', targetZone.name, 'Intercepting zone:', currentZone.name, 'enter');
        parentZoneDelegate.invoke(targetZone, callback, applyThis, applyArgs, source);
        console.log('Zone:', targetZone.name, 'Intercepting zone:', currentZone.name, 'leave');
    },
    onIntercept: function (parentZoneDelegate, currentZone, targetZone, callback, source) {
        console.log('Zone:', targetZone.name, 'Intercepting zone:', currentZone.name, 'wrap');
        return parentZoneDelegate.intercept(targetZone, callback, source);
    }
});
var appZone = logZone.fork({ name: 'appZone' });
appZone.run(function myApp() {
    console.log('Zone:', Zone.current.name, 'Hello World!');
});
var wrappedFn = appZone.wrap(function myApp() {
    console.log('Zone:', Zone.current.name, 'Hello World!');
}, 'myApp');
wrappedFn();
//# sourceMappingURL=interception.js.map