import { CounterModule } from './counter.module';

describe('CounterModule', () => {
  let counterModule: CounterModule;

  beforeEach(() => {
    counterModule = new CounterModule();
  });

  it('should create an instance', () => {
    expect(counterModule).toBeTruthy();
  });
});
