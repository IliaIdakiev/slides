/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventSourceService } from './event-source.service';

describe('Service: EventSource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventSourceService]
    });
  });

  it('should ...', inject([EventSourceService], (service: EventSourceService) => {
    expect(service).toBeTruthy();
  }));
});
