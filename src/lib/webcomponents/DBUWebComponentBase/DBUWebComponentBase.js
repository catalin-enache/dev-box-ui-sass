
const template = document.createElement('template');
template.innerHTML = '<style></style><slot></slot>';

export function defineCommonStaticMethods(klass) {
  Object.defineProperty(klass, 'componentStyle', {
    get() {
      return klass.template.content.querySelector('style').innerHTML;
    },
    set(value) {
      klass.template.content.querySelector('style').innerHTML = value;
    },
    enumerable: true,
    configurable: true
  });
  klass.registerSelf = () => {
    const componentName = klass.componentName;
    customElements.define(componentName, klass);
  };
}


class DBUWebComponentBase extends HTMLElement {

  static get template() {
    return template;
  }

  constructor() {
    super();
    const { template } = this.constructor;
    if (template) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  connectedCallback() {
    if (this.hasAttribute('componentInstanceStyle')) {
      const componentInstanceStyle = this.getAttribute('componentInstanceStyle');
      this.shadowRoot.querySelector('style').innerHTML = componentInstanceStyle;
    }
  }
}

export default DBUWebComponentBase;
