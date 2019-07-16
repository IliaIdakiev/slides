import { html, render } from 'lit-html';

function property(target: any, propertyKey: string | symbol) {
  let _value;
  Object.defineProperty(target, propertyKey, {
    set: function (value) {
      _value = value;
      if (!this.changeHandler) { return; }
      this.changeHandler();
    },
    get: function () {
      return _value;
    }
  })
}

export function Component(config: { mode?: 'open' | 'closed', selector: string }) {
  return function componentDecorator(target) {
    const cmp = class extends HTMLElement {
      static selector = config.selector;
      scheduledRender = false;
      changeHandler: () => void;
      onConnected: () => void;
      constructor(...args) {
        super();
        const root = this.attachShadow({ mode: config.mode || 'closed' });

        const targetInstance = new target(...args);
        const { constructor, ...prototypeProps } = Object.getOwnPropertyDescriptors(target.prototype);

        const props = {
          ...Object.getOwnPropertyDescriptors(targetInstance),
          ...prototypeProps
        }
        Object.defineProperties(this, props);

        this.changeHandler = function () {
          if (!this.scheduledRender) {
            this.scheduledRender = true;
            Promise.resolve().then(() => {
              this.scheduledRender = false;
              if (!this.render) { return; }
              render(this.render(), root);
            });
          }
        }

        return this;
      }

      connectedCallback() {
        this.changeHandler();
        if (this.onConnected) {
          this.onConnected();
        }
      }
    };

    customElements.define(config.selector, cmp);

    return cmp as any;
  };
}

@Component({
  selector: 'hg-counter'
})
export class Counter {

  @property value;

  onConnected() {
    console.log('Counter connected');
  }

  render() {
    return html`
      <div>${this.value}</div>
    `;
  }
}



const getAppTemplate = (context: App) => html`
  <hg-counter .value=${context.counter}></hg-counter>
  <button @click=${context.incrementHandler}>Increment</button>
`;

export class App extends HTMLElement {
  counter = 0;
  scheduledRender = false;
  changeHandler: () => void;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'closed' });

    this.changeHandler = () => {
      if (!this.scheduledRender) {
        this.scheduledRender = true;
        Promise.resolve().then(() => {
          this.scheduledRender = false;
          render(getAppTemplate(this), root);
        });
      }
    }
  }

  incrementHandler = () => {
    this.counter++;
    this.changeHandler();
  }

  connectedCallback() {
    this.changeHandler();
  }
}

customElements.define('hg-app', App);