(function () {
  const template = createTemplate(`
  <style>
  :host {
    display: flex;
  }
  div[name="value"] {
    min-width: 30px;
  }
  </style>
  <div name="value"></div>
  <button data-type="dec">-</button>
  <button data-type="inc">+</button>
  `);

  class Counter extends HTMLElement {

    set counter(value) {
      this._counter = value;
      this._update();
      this._emmitValue();
    }

    get counter() {
      return this._counter;
    }

    _emmitValue() {
      this.dispatchEvent(new CustomEvent('change', { detail: { counter: this.counter }, bubbles: false }));
    }

    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));

      shadowRoot.addEventListener('click', ({ target }) => {
        const type = target.getAttribute('data-type');
        if (type === 'dec') {
          this.counter--;
        } else if (type === 'inc') {
          this.counter++;
        }
      });

      this._update = () => {
        updateDOM(shadowRoot, [{ name: 'value', value: this.counter }]);
      }

      this.counter = 0;
    }

    static get observedAttributes() {
      return ['value', 'array'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'value') { this.counter = newValue; }
      console.log(newValue);
    }
  }

  customElements.define('hg-counter', Counter);
}());