const originalSetTimeout = global.setTimeout;
const originalClearTimeout = global.clearTimeout;

(global as any).setTimeout = function (callback: () => void, delay: number) {
  let id: any;
  const task = Zone.current.scheduleMacroTask(
    'setTimeout',
    function () {
      callback();
      console.log('task end');
    },
    null,
    task => {
      console.log('task start');
      id = originalSetTimeout(
        task.invoke as any,
        delay
      );
    },
    () => originalClearTimeout(id)
  );

  return task;
};

(global as any).clearTimeout = function (task: Task) {
  Zone.current.cancelTask(task);
}

const task = setTimeout(function () {
  console.log(123);
}, 1000);

// clearTimeout(task);