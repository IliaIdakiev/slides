import 'zone.js';

class AppZoneManager {
  private __zoneName = '<app-zone>';
  private __counter = 0;
  private __isLoaded = false;

  get counter() {
    return this.__counter;
  }
  set counter(val: number) {
    if (!this.__isLoaded || val < 0) return;
    this.__counter = val;
    if (this.counter === 0) {
      const components = Zone.current.get('components') || [];
      components.forEach(cmp => cmp.detectChanges());
    }
  }

  constructor() {
    window.addEventListener('DOMContentLoaded', () => { this.__isLoaded = true });
  }

  ignite = () => {
    const zoneSpec: ZoneSpec = {
      name: this.__zoneName,
      properties: { components: [] },
      onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
        return parentZoneDelegate.scheduleTask(targetZone, task);
      },
      onInvokeTask: (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) => {
        try {
          this.counter++;
          return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
        } finally {
          this.counter--;
        }
      }
    }


    const appZone = Zone.current.fork(zoneSpec);
    appZone.runGuarded(() => { import('./app'); });
  }
}

function bootstrap() {
  const manager = new AppZoneManager();
  manager.ignite();
}

bootstrap();