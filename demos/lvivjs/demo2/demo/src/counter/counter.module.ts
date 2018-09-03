import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';
import { createCustomElement } from '@angular/elements';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [CounterComponent, FormComponent],
  entryComponents: [CounterComponent, FormComponent]
})
export class CounterModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const counterEl = createCustomElement(CounterComponent, { injector: this.injector });
    customElements.define('app-counter', counterEl);

    const formEl = createCustomElement(FormComponent, { injector: this.injector });
    customElements.define('app-form', formEl);
  }
}
