import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { CounterModule } from './counter/counter.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CounterModule)
  .catch(err => console.log(err));
