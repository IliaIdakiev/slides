var originalSetTimeout = global.setTimeout;
var originalClearTimeout = global.clearTimeout;
global.setTimeout = function (callback, delay) {
    var id;
    var task = Zone.current.scheduleMacroTask('setTimeout', function () {
        callback();
        console.log('task end');
    }, null, function (task) {
        console.log('task start');
        id = originalSetTimeout(task.invoke, delay);
    }, function () { return originalClearTimeout(id); });
    return task;
};
global.clearTimeout = function (task) {
    Zone.current.cancelTask(task);
};
var task = setTimeout(function () {
    console.log(123);
}, 1000);
//# sourceMappingURL=tasks.js.map