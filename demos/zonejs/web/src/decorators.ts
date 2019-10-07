import { render } from 'lit-html';

export function Component(config: { mode?: 'open' | 'closed', selector: string }) {
  return function componentDecorator(target) {
    function Cmp(...args) {
      HTMLElement.call(this, ...args);
      target.call(this);
      const root = this.attachShadow({ mode: config.mode || 'closed' });
      this.detectChanges = function () {
        render(this.render(), root);
      }
      Zone.current.get('components').push(this);
    };

    const { constructor, ...prototypeProps } = Object.getOwnPropertyDescriptors(target.prototype);
    Cmp.prototype = Object.create(HTMLElement.prototype, prototypeProps);
    customElements.define(config.selector, Cmp);
  };
}