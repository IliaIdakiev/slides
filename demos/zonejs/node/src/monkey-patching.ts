const originalSetTimeout = global.setTimeout;
global.setTimeout = function (...args) {
  console.log('Timeout was called');
  return originalSetTimeout(...args);
}

setTimeout(function () {
  console.log('Hello!')
}, 0);

// > 'Timeout was called'
// > 'Hello!'