import { ReflectiveInjector } from 'injection-js';

const resolvedProviders = ReflectiveInjector.resolve([{
  provide: 'PersonName',
  useValue: 'Ivan'
}]);

const injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders);
injector.get('PersonName'); // 'Ivan'