import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class CounterComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  @Input() counter = 0;

  constructor() { }
  ngOnInit() {
  }

  inc() {
    this.counter++;
    this.valueChange.emit(this.counter);
  }
  dec() {
    this.counter--;
    this.valueChange.emit(this.counter);
  }

}
