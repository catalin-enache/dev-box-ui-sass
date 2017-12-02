'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

class DBUWebComponentBase extends HTMLElement {
  static registerSelf(klass) {
    const componentName = klass.componentName;
    console.log('defining: ', componentName);
    customElements.define(componentName, klass);
  }
}

exports.default = DBUWebComponentBase;