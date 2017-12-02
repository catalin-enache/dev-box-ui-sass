'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DBUWebComponentBase = require('../DBUWebComponentBase/DBUWebComponentBase');

var _DBUWebComponentBase2 = _interopRequireDefault(_DBUWebComponentBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DBUWebComponent extends _DBUWebComponentBase2.default {
  static get componentName() {
    return 'dbu-web-component';
  }

  static registerSelf() {
    super.registerSelf(DBUWebComponent);
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
      
      </style>
      <div id="DBUWebComponent">DBUWebComponent</div>
    `;
  }
}

exports.default = DBUWebComponent;