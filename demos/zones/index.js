require('zone.js/dist/zone-node');

let _counter = 0;
const manager = Object.defineProperty({}, 'counter', {
  get: function () { return _counter; },
  set: function (newValue) {
    if (newValue < 0) return;
    _counter = newValue;
    console.log(`New counter value: ${_counter}`);
    if (_counter === 0) {
      console.log('Trigger Change Detection');
    }
  },
});

const zoneSpec = {
  name: 'my-zone',
  onScheduleTask: function (parentZoneDelegate, currentZone, targetZone, task) {
    manager.counter++;
    return parentZoneDelegate.scheduleTask(targetZone, task);
  },
  onInvokeTask: function (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
    try {
      return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
    } finally {
      manager.counter--;
    }
  }
}

const myZone = Zone.current.fork(zoneSpec);

myZone.run(() => {
  Promise.resolve().then(() => console.log('Promise resolve callback'));
  setTimeout(function () {
    console.log('setTimeout callback');
  }, 1000);
});