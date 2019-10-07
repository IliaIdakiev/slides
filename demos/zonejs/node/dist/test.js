var myZone = Zone.current.fork({
    name: 'myZone',
    onScheduleTask: function (deletate, currentZone, targetZone, task) {
        try {
            return deletate.scheduleTask(targetZone, task);
        }
        finally {
            deletate.invoke(targetZone, task.invoke, 'sss');
        }
    },
    onInvoke: function (deletate, currentZone, targetZone, deletateFn, applyThis, applyArgs, source) {
        return deletate.invoke(targetZone, deletateFn, applyArgs, applyArgs);
    }
});
var customTask = function () {
    return myZone.scheduleMacroTask('myCustomTask', function () { console.log('123'); console.log('task end'); }, null, function (task) {
        console.log('customTask');
        task.invoke();
    });
};
customTask();
console.log('hello');
//# sourceMappingURL=test.js.map