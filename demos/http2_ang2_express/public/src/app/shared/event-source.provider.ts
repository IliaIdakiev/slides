import { OpaqueToken } from '@angular/core';
export const EventSource = new OpaqueToken('EventSource');

const _EventSource = typeof window !== 'undefined' && window['EventSource'] || <any>{};

export const EventSourceProvider = {
    provide: EventSource,
    useValue: _EventSource
};