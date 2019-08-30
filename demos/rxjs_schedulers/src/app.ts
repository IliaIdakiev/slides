import { defer, interval, animationFrameScheduler, fromEvent } from 'rxjs';
import { map, filter, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';

console.clear();

const box = document.getElementById('box');

const height = 300;
const width = 800;

const directionActionMap = {
  ArrowUp: (box, frame, x, y) => {
    let newY = y - frame;
    if (newY <= 0) { newY = 0; }
    box.style.transform = `translate3d(${x}px, ${newY}px, 0px)`;
  },
  ArrowDown: (box, frame, x, y) => {
    let newY = y + frame;
    if (newY >= height - box.clientHeight) { newY = height - box.clientHeight; }
    box.style.transform = `translate3d(${x}px, ${newY}px, 0px)`;
  },
  ArrowLeft: (box, frame, x, y) => {
    let newX = x - frame;
    if (newX <= 0) { newX = 0; }
    box.style.transform = `translate3d(${newX}px, ${y}px, 0px)`;
  },
  ArrowRight: (box, frame, x, y) => {
    let newX = x + frame;
    if (newX >= width - box.clientWidth) { newX = width - box.clientWidth; }
    box.style.transform = `translate3d(${newX}px, ${y}px, 0px)`;
  },
}

const direction$ = fromEvent(document, 'keydown').pipe(
  filter<KeyboardEvent>(e => ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)),
  map(e => e.key),
  startWith('ArrowRight'),
  distinctUntilChanged(),
);

const clock$ = defer(() => {
  const start = animationFrameScheduler.now();
  const result = /translate3d\(([0-9\.]+)px, ([0-9\.]+)px, 0px\)/.exec(box.style.transform) || [0, 0, 0];
  const [, x, y] = result;
  return interval(0, animationFrameScheduler).pipe(
    map(() => [animationFrameScheduler.now() - start, x, y])
  );
});

const movement = (vpx, ms) => vpx * ms / 1000;

direction$.pipe(
  switchMap(direction => clock$.pipe(map(([ms, x, y]) => [movement(50, ms), direction, +x, +y])))
).subscribe(([frame, direction, x, y]: [number, string, number, number]) => {
  directionActionMap[direction](box, frame, x, y);
});