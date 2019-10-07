import { performance } from 'perf_hooks';

const timingZone = Zone.current.fork({
  name: 'timingZone',
  onInvoke: function (
    parentZoneDelegate, currentZone,
    targetZone, callback, applyThis,
    applyArgs, source
  ) {
    var start = performance.now();
    parentZoneDelegate.invoke(targetZone, callback, applyThis, applyArgs, source);
    var end = performance.now();
    console.log(
      'Zone:', targetZone.name,
      'Intercepting zone:', currentZone.name,
      'Duration:', end - start
    );
  }
});


const logZone = timingZone.fork({
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

const appZone = logZone.fork({ name: 'appZone' });

appZone.run(function myApp() {
  console.log('Zone:', Zone.current.name, 'Hello World!')
});
// Output: 
// > Zone: appZone Intercepting zone: logZone enter
// > Zone: appZone Hello World!
// > Zone: appZone Intercepting zone: timingZone Duration: 919.128399014473
// > Zone: appZone Intercepting zone: logZone leave


const wrappedFn = appZone.wrap(function myApp() {
  console.log('Zone:', Zone.current.name, 'Hello World!');
}, 'myApp');

wrappedFn();

// > Zone: appZone Intercepting zone: logZone wrap
// > Zone: appZone Intercepting zone: logZone enter
// > Zone: appZone Hello World!
// > Zone: appZone Intercepting zone: timingZone Duration: 1.6572850048542023
// > Zone: appZone Intercepting zone: logZone leave