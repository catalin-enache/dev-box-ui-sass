(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DBUWebComponentBase = require('../DBUWebComponentBase/DBUWebComponentBase');

var _DBUWebComponentBase2 = _interopRequireDefault(_DBUWebComponentBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
    color: maroon;
  }
  </style>
  <b>I'm in shadow dom!</b>
  <slot></slot>
`;

class DBUWebComponent extends _DBUWebComponentBase2.default {
  static get componentName() {
    return 'dbu-web-component';
  }

  static get template() {
    return template;
  }
}

(0, _DBUWebComponentBase.defineCommonStaticMethods)(DBUWebComponent);

exports.default = DBUWebComponent;

},{"../DBUWebComponentBase/DBUWebComponentBase":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineCommonStaticMethods = defineCommonStaticMethods;

const template = document.createElement('template');
template.innerHTML = '<style></style><slot></slot>';

function defineCommonStaticMethods(klass) {
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

exports.default = DBUWebComponentBase;

},{}],4:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _screens = require('./screens');

var _screens2 = _interopRequireDefault(_screens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _react2.default.Component {
  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
  }

  onHashChange() {
    this.forceUpdate();
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: 0 */
      // console.log('rendering App component');
    }
    const screensKeys = Object.keys(_screens2.default);
    const links = _react2.default.createElement(
      'ul',
      null,
      screensKeys.map((screen, idx) => _react2.default.createElement(
        'li',
        { key: idx },
        _react2.default.createElement(
          'a',
          { key: idx, href: `#${screen}` },
          screen
        )
      ))
    );
    const Screen = _screens2.default[(window.location.hash || `#${screensKeys[0]}`).replace('#', '')];

    if (!Screen) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        links
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Screen, null)
      )
    );
  }
}

App.propTypes = {
  classes: _propTypes2.default.object,
  theme: _propTypes2.default.object
};

exports.default = App;

}).call(this,require('_process'))

},{"./screens":12,"_process":1,"prop-types":"prop-types","react":"react"}],5:[function(require,module,exports){
(function (process){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _devBoxUi = require('dev-box-ui');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _DBUWebComponent = require('../src/lib/webcomponents/DBUWebComponent/DBUWebComponent');

var _DBUWebComponent2 = _interopRequireDefault(_DBUWebComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DBUWebComponent.componentStyle += `
//   b {
//     color: orange;
//     font-style: oblique;
//     text-shadow: var(--b-text-shadow, 2px 2px 2px #000000);
//   }
// `;

setTimeout(() => {
  _DBUWebComponent2.default.registerSelf();
}, 2000);

// onScreenConsole({ options: { showLastOnly: false } });

// import DBUWebComponent from '../build/src/lib/webcomponents/DBUWebComponent/DBUWebComponent';
let Demo = class Demo extends _react2.default.Component {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: 0 */
      // console.log('rendering Demo component');
    }
    const { locale: { dir } } = this.props;
    return _react2.default.createElement(_app2.default, null);
  }
};

Demo.propTypes = {
  locale: _propTypes2.default.object
};

Demo = (0, _devBoxUi.localeAware)(Demo);

_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('demo'));

}).call(this,require('_process'))

},{"../src/lib/webcomponents/DBUWebComponent/DBUWebComponent":2,"./app":4,"_process":1,"dev-box-ui":"dev-box-ui","prop-types":"prop-types","react":"react","react-dom":"react-dom"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DBUWebComponentScreen extends _react2.default.Component {
  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'dbu-web-component',
        {
          style: { color: 'blue' }
        },
        _react2.default.createElement(
          'span',
          null,
          'hello world 1'
        )
      ),
      _react2.default.createElement(
        'dbu-web-component',
        {
          style: { color: 'blue' },
          componentInstanceStyle: 'b{color:deepskyblue;}'
        },
        _react2.default.createElement(
          'span',
          null,
          'hello world 2'
        )
      )
    );
  }
}

exports.default = DBUWebComponentScreen;

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _devBoxUi = require('dev-box-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ToRender extends _react2.default.Component {
  render() {
    // console.log('ToRender#render');
    return _react2.default.createElement(
      'div',
      {
        style: { width: 300, height: 300 },
        onMouseDown: this.props.onMouseDown,
        onMouseUp: this.props.onMouseUp,
        onClick: this.props.onClick,
        onTouchStart: this.props.onTouchStart,
        onTouchEnd: this.props.onTouchEnd
      },
      _react2.default.createElement(
        'p',
        null,
        'draggable p ',
        this.props.counter,
        ' ',
        _react2.default.createElement(
          'a',
          { href: 'http://google.com', target: '_blank' },
          'link'
        )
      )
    );
  }
}

class DraggableScreen extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.counter = 1;
    this.state = {
      draggableContent: this.draggableContent
    };
  }

  get draggableContent() {
    return _react2.default.createElement(ToRender, {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick,
      counter: this.counter
    });
  }

  handleMouseDown(evt) {
    console.log('DraggableScreen#handleMouseDown');
  }
  handleMouseUp(evt) {
    console.log('DraggableScreen#handleMouseUp');
  }
  handleTouchStart(evt) {
    console.log('DraggableScreen#handleTouchStart');
  }
  handleTouchEnd(evt) {
    console.log('DraggableScreen#handleTouchEnd');
  }
  handleClick(evt) {
    console.log('DraggableScreen#handleClick');
    // this.counter = this.counter + 1;
    // this.setState({
    //   draggableContent: this.draggableContent
    // });
  }

  componentDidMount() {
    setTimeout(() => {
      this.counter = this.counter + 1;
      this.setState({
        draggableContent: this.draggableContent
      });
    }, 3000);
  }

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _devBoxUi.Draggable,
        { style: { border: '1px solid blue', width: 200, height: 200, overflowX: 'scroll', overflowY: 'scroll' } },
        this.state.draggableContent
      ),
      _react2.default.createElement(
        _devBoxUi.DisableSelection,
        null,
        _react2.default.createElement(
          'p',
          null,
          'disabled selection'
        )
      ),
      Array.from({ length: 10 }).map((el, i) => _react2.default.createElement(
        'p',
        { key: i },
        i,
        ' ---------------------------------'
      ))
    );
  }
}

exports.default = DraggableScreen;

},{"dev-box-ui":"dev-box-ui","react":"react"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _devBoxUi = require('dev-box-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormInputNumberScreen extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: -7.08
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(inputValue) {
    const valueToSendBack = Number(inputValue.toPrecision(16));
    this.setState({
      inputValue: valueToSendBack
    });
  }

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_devBoxUi.FormInputNumber, {
        value: this.state.inputValue,
        onChange: this.handleChange,
        defaultDecPoint: ',',
        defaultThousandsSeparator: '.'
      }),
      _react2.default.createElement(_devBoxUi.FormInputNumber, {
        value: this.state.inputValue,
        onChange: this.handleChange
      }),
      _react2.default.createElement(
        'p',
        null,
        this.state.inputValue,
        '\u00A0'
      )
    );
  }
}

exports.default = FormInputNumberScreen;

},{"dev-box-ui":"dev-box-ui","react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _devBoxUi = require('dev-box-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormInputScreen extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 6
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(inputValue) {
    this.setState({
      inputValue
    });
  }

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_devBoxUi.FormInput, {
        value: this.state.inputValue,
        onChange: this.handleChange,
        hasWarning: false,
        hasError: false,
        disabled: false
      }),
      _react2.default.createElement(
        'p',
        null,
        this.state.inputValue,
        '\u00A0'
      )
    );
  }
}

exports.default = FormInputScreen;

},{"dev-box-ui":"dev-box-ui","react":"react"}],10:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _devBoxUi = require('dev-box-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HelloScreen extends _react2.default.Component {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: 0 */
      // console.log('rendering HelloScreen component');
    }
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_devBoxUi.Hello, null)
    );
  }
}

exports.default = HelloScreen;

}).call(this,require('_process'))

},{"_process":1,"dev-box-ui":"dev-box-ui","react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _devBoxUi = require('dev-box-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListScreen extends _react2.default.Component {
  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_devBoxUi.List, { items: ['three', 'four'] }),
      _react2.default.createElement(_devBoxUi.List, { items: ['three', 'four'] })
    );
  }
}

exports.default = ListScreen;

},{"dev-box-ui":"dev-box-ui","react":"react"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HelloScreen = require('./HelloScreen');

var _HelloScreen2 = _interopRequireDefault(_HelloScreen);

var _ListScreen = require('./ListScreen');

var _ListScreen2 = _interopRequireDefault(_ListScreen);

var _FormInputScreen = require('./FormInputScreen');

var _FormInputScreen2 = _interopRequireDefault(_FormInputScreen);

var _FormInputNumberScreen = require('./FormInputNumberScreen');

var _FormInputNumberScreen2 = _interopRequireDefault(_FormInputNumberScreen);

var _DraggableScreen = require('./DraggableScreen');

var _DraggableScreen2 = _interopRequireDefault(_DraggableScreen);

var _DBUWebComponentScreen = require('./DBUWebComponentScreen');

var _DBUWebComponentScreen2 = _interopRequireDefault(_DBUWebComponentScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  HelloScreen: _HelloScreen2.default,
  ListScreen: _ListScreen2.default,
  FormInputScreen: _FormInputScreen2.default,
  FormInputNumberScreen: _FormInputNumberScreen2.default,
  Draggable: _DraggableScreen2.default,
  DBUWebComponentScreen: _DBUWebComponentScreen2.default
};

},{"./DBUWebComponentScreen":6,"./DraggableScreen":7,"./FormInputNumberScreen":8,"./FormInputScreen":9,"./HelloScreen":10,"./ListScreen":11}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwic3JjL2xpYi93ZWJjb21wb25lbnRzL0RCVVdlYkNvbXBvbmVudC9EQlVXZWJDb21wb25lbnQuanMiLCJzcmMvbGliL3dlYmNvbXBvbmVudHMvREJVV2ViQ29tcG9uZW50QmFzZS9EQlVXZWJDb21wb25lbnRCYXNlLmpzIiwic3JjRGVtby9hcHAuanMiLCJzcmNEZW1vL2RlbW8uanMiLCJzcmNEZW1vL3NjcmVlbnMvREJVV2ViQ29tcG9uZW50U2NyZWVuLmpzIiwic3JjRGVtby9zY3JlZW5zL0RyYWdnYWJsZVNjcmVlbi5qcyIsInNyY0RlbW8vc2NyZWVucy9Gb3JtSW5wdXROdW1iZXJTY3JlZW4uanMiLCJzcmNEZW1vL3NjcmVlbnMvRm9ybUlucHV0U2NyZWVuLmpzIiwic3JjRGVtby9zY3JlZW5zL0hlbGxvU2NyZWVuLmpzIiwic3JjRGVtby9zY3JlZW5zL0xpc3RTY3JlZW4uanMiLCJzcmNEZW1vL3NjcmVlbnMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUE7QUFDRTtBQUNFLGVBQU8sS0FBSyxLQUFMLENBQVcsVUFEcEI7QUFFRSxrQkFBVSxLQUFLLFlBRmpCO0FBR0Usb0JBQVksS0FIZDtBQUlFLGtCQUFVLEtBSlo7QUFLRSxrQkFBVTtBQUxaLFFBREY7QUFRRTtBQUFBO0FBQUE7QUFBSSxhQUFLLEtBQUwsQ0FBVyxVQUFmO0FBQTJCO0FBQTNCO0FBUkYsS0FERjtBQVlEO0FBNUIyQzs7a0JBK0IvQixlOzs7Ozs7Ozs7O0FDckNmOzs7O0FBQ0E7Ozs7QUFJQSxNQUFNLFdBQU4sU0FBMEIsZ0JBQU0sU0FBaEMsQ0FBMEM7QUFDeEMsV0FBUztBQUNQLFFBQUksUUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QztBQUNBO0FBQ0Q7QUFDRCxXQUNFO0FBQUE7QUFBQTtBQUNFO0FBREYsS0FERjtBQUtEO0FBWHVDOztrQkFjM0IsVzs7Ozs7Ozs7Ozs7QUNuQmY7Ozs7QUFDQTs7OztBQUlBLE1BQU0sVUFBTixTQUF5QixnQkFBTSxTQUEvQixDQUF5QztBQUN2QyxXQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUE7QUFDRSxzREFBTSxPQUFPLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBYixHQURGO0FBRUUsc0RBQU0sT0FBTyxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQWI7QUFGRixLQURGO0FBTUQ7QUFSc0M7O2tCQVcxQixVOzs7Ozs7Ozs7QUNoQmY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDYixvQ0FEYTtBQUViLGtDQUZhO0FBR2IsNENBSGE7QUFJYix3REFKYTtBQUtiLHNDQUxhO0FBTWI7QUFOYSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJcbmltcG9ydCBEQlVXZWJDb21wb25lbnRCYXNlLCB7XG4gIGRlZmluZUNvbW1vblN0YXRpY01ldGhvZHNcbn0gZnJvbSAnLi4vREJVV2ViQ29tcG9uZW50QmFzZS9EQlVXZWJDb21wb25lbnRCYXNlJztcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBjb2xvcjogbWFyb29uO1xuICB9XG4gIDwvc3R5bGU+XG4gIDxiPkknbSBpbiBzaGFkb3cgZG9tITwvYj5cbiAgPHNsb3Q+PC9zbG90PlxuYDtcblxuY2xhc3MgREJVV2ViQ29tcG9uZW50IGV4dGVuZHMgREJVV2ViQ29tcG9uZW50QmFzZSB7XG4gIHN0YXRpYyBnZXQgY29tcG9uZW50TmFtZSgpIHtcbiAgICByZXR1cm4gJ2RidS13ZWItY29tcG9uZW50JztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG59XG5cblxuZGVmaW5lQ29tbW9uU3RhdGljTWV0aG9kcyhEQlVXZWJDb21wb25lbnQpO1xuXG5leHBvcnQgZGVmYXVsdCBEQlVXZWJDb21wb25lbnQ7XG4iLCJcbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9ICc8c3R5bGU+PC9zdHlsZT48c2xvdD48L3Nsb3Q+JztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUNvbW1vblN0YXRpY01ldGhvZHMoa2xhc3MpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtsYXNzLCAnY29tcG9uZW50U3R5bGUnLCB7XG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIGtsYXNzLnRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3R5bGUnKS5pbm5lckhUTUw7XG4gICAgfSxcbiAgICBzZXQodmFsdWUpIHtcbiAgICAgIGtsYXNzLnRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3R5bGUnKS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICBrbGFzcy5yZWdpc3RlclNlbGYgPSAoKSA9PiB7XG4gICAgY29uc3QgY29tcG9uZW50TmFtZSA9IGtsYXNzLmNvbXBvbmVudE5hbWU7XG4gICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKGNvbXBvbmVudE5hbWUsIGtsYXNzKTtcbiAgfTtcbn1cblxuXG5jbGFzcyBEQlVXZWJDb21wb25lbnRCYXNlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCB7IHRlbXBsYXRlIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdjb21wb25lbnRJbnN0YW5jZVN0eWxlJykpIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlU3R5bGUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50SW5zdGFuY2VTdHlsZScpO1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlJykuaW5uZXJIVE1MID0gY29tcG9uZW50SW5zdGFuY2VTdHlsZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgREJVV2ViQ29tcG9uZW50QmFzZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHNjcmVlbnMgZnJvbSAnLi9zY3JlZW5zJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLm9uSGFzaENoYW5nZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG9uSGFzaENoYW5nZSgpIHtcbiAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8qIGVzbGludCBuby1jb25zb2xlOiAwICovXG4gICAgICAvLyBjb25zb2xlLmxvZygncmVuZGVyaW5nIEFwcCBjb21wb25lbnQnKTtcbiAgICB9XG4gICAgY29uc3Qgc2NyZWVuc0tleXMgPSBPYmplY3Qua2V5cyhzY3JlZW5zKTtcbiAgICBjb25zdCBsaW5rcyA9IDx1bD5cbiAgICAgIHtcbiAgICAgICAgc2NyZWVuc0tleXMubWFwKChzY3JlZW4sIGlkeCkgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e2lkeH0+XG4gICAgICAgICAgICA8YSBrZXk9e2lkeH0gaHJlZj17YCMke3NjcmVlbn1gfT57c2NyZWVufTwvYT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApKVxuICAgICAgfVxuICAgIDwvdWw+O1xuICAgIGNvbnN0IFNjcmVlbiA9IHNjcmVlbnNbKHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8IGAjJHtzY3JlZW5zS2V5c1swXX1gKS5yZXBsYWNlKCcjJywgJycpXTtcblxuICAgIGlmICghU2NyZWVuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7bGlua3N9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTY3JlZW4vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQXBwLnByb3BUeXBlcyA9IHtcbiAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgdGhlbWU6IFByb3BUeXBlcy5vYmplY3Rcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1xuICAvLyBvblNjcmVlbkNvbnNvbGUsXG4gIGxvY2FsZUF3YXJlXG59IGZyb20gJ2Rldi1ib3gtdWknO1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCc7XG5cbi8vIGltcG9ydCBEQlVXZWJDb21wb25lbnQgZnJvbSAnLi4vYnVpbGQvc3JjL2xpYi93ZWJjb21wb25lbnRzL0RCVVdlYkNvbXBvbmVudC9EQlVXZWJDb21wb25lbnQnO1xuaW1wb3J0IERCVVdlYkNvbXBvbmVudCBmcm9tICcuLi9zcmMvbGliL3dlYmNvbXBvbmVudHMvREJVV2ViQ29tcG9uZW50L0RCVVdlYkNvbXBvbmVudCc7XG5cbi8vIERCVVdlYkNvbXBvbmVudC5jb21wb25lbnRTdHlsZSArPSBgXG4vLyAgIGIge1xuLy8gICAgIGNvbG9yOiBvcmFuZ2U7XG4vLyAgICAgZm9udC1zdHlsZTogb2JsaXF1ZTtcbi8vICAgICB0ZXh0LXNoYWRvdzogdmFyKC0tYi10ZXh0LXNoYWRvdywgMnB4IDJweCAycHggIzAwMDAwMCk7XG4vLyAgIH1cbi8vIGA7XG5cbnNldFRpbWVvdXQoKCkgPT4ge1xuICBEQlVXZWJDb21wb25lbnQucmVnaXN0ZXJTZWxmKCk7XG59LCAyMDAwKTtcblxuXG4vLyBvblNjcmVlbkNvbnNvbGUoeyBvcHRpb25zOiB7IHNob3dMYXN0T25seTogZmFsc2UgfSB9KTtcblxubGV0IERlbW8gPSBjbGFzcyBEZW1vIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBEZW1vIGNvbXBvbmVudCcpO1xuICAgIH1cbiAgICBjb25zdCB7IGxvY2FsZTogeyBkaXIgfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPEFwcCAvPlxuICAgICk7XG4gIH1cbn07XG5cbkRlbW8ucHJvcFR5cGVzID0ge1xuICBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3Rcbn07XG5cbkRlbW8gPSBsb2NhbGVBd2FyZShEZW1vKTtcblxuUmVhY3RET00ucmVuZGVyKChcbiAgPERlbW8vPlxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW8nKSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBEQlVXZWJDb21wb25lbnRTY3JlZW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG5cbiAgICAgICAgPGRidS13ZWItY29tcG9uZW50XG4gICAgICAgICAgc3R5bGU9e3sgY29sb3I6ICdibHVlJyB9fVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4+aGVsbG8gd29ybGQgMTwvc3Bhbj5cbiAgICAgICAgPC9kYnUtd2ViLWNvbXBvbmVudD5cblxuICAgICAgICA8ZGJ1LXdlYi1jb21wb25lbnRcbiAgICAgICAgICBzdHlsZT17eyBjb2xvcjogJ2JsdWUnIH19XG4gICAgICAgICAgY29tcG9uZW50SW5zdGFuY2VTdHlsZT1cImJ7Y29sb3I6ZGVlcHNreWJsdWU7fVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj5oZWxsbyB3b3JsZCAyPC9zcGFuPlxuICAgICAgICA8L2RidS13ZWItY29tcG9uZW50PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERCVVdlYkNvbXBvbmVudFNjcmVlbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBEcmFnZ2FibGUsIERpc2FibGVTZWxlY3Rpb25cbn0gZnJvbSAnZGV2LWJveC11aSc7XG5cbmNsYXNzIFRvUmVuZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdUb1JlbmRlciNyZW5kZXInKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17eyB3aWR0aDogMzAwLCBoZWlnaHQ6IDMwMCB9fVxuICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgb25Nb3VzZVVwPXt0aGlzLnByb3BzLm9uTW91c2VVcH1cbiAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxuICAgICAgICBvblRvdWNoU3RhcnQ9e3RoaXMucHJvcHMub25Ub3VjaFN0YXJ0fVxuICAgICAgICBvblRvdWNoRW5kPXt0aGlzLnByb3BzLm9uVG91Y2hFbmR9XG4gICAgICA+XG4gICAgICAgIDxwPmRyYWdnYWJsZSBwIHt0aGlzLnByb3BzLmNvdW50ZXJ9IDxhIGhyZWY9XCJodHRwOi8vZ29vZ2xlLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPmxpbms8L2E+PC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBEcmFnZ2FibGVTY3JlZW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlRG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0ID0gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZVVwID0gdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVUb3VjaEVuZCA9IHRoaXMuaGFuZGxlVG91Y2hFbmQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5jb3VudGVyID0gMTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZHJhZ2dhYmxlQ29udGVudDogdGhpcy5kcmFnZ2FibGVDb250ZW50XG4gICAgfTtcbiAgfVxuXG4gIGdldCBkcmFnZ2FibGVDb250ZW50KCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VG9SZW5kZXJcbiAgICAgICAgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuICAgICAgICBvbk1vdXNlVXA9e3RoaXMuaGFuZGxlTW91c2VVcH1cbiAgICAgICAgb25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XG4gICAgICAgIG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmR9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIGNvdW50ZXI9e3RoaXMuY291bnRlcn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlRG93bihldnQpIHtcbiAgICBjb25zb2xlLmxvZygnRHJhZ2dhYmxlU2NyZWVuI2hhbmRsZU1vdXNlRG93bicpO1xuICB9XG4gIGhhbmRsZU1vdXNlVXAoZXZ0KSB7XG4gICAgY29uc29sZS5sb2coJ0RyYWdnYWJsZVNjcmVlbiNoYW5kbGVNb3VzZVVwJyk7XG4gIH1cbiAgaGFuZGxlVG91Y2hTdGFydChldnQpIHtcbiAgICBjb25zb2xlLmxvZygnRHJhZ2dhYmxlU2NyZWVuI2hhbmRsZVRvdWNoU3RhcnQnKTtcbiAgfVxuICBoYW5kbGVUb3VjaEVuZChldnQpIHtcbiAgICBjb25zb2xlLmxvZygnRHJhZ2dhYmxlU2NyZWVuI2hhbmRsZVRvdWNoRW5kJyk7XG4gIH1cbiAgaGFuZGxlQ2xpY2soZXZ0KSB7XG4gICAgY29uc29sZS5sb2coJ0RyYWdnYWJsZVNjcmVlbiNoYW5kbGVDbGljaycpO1xuICAgIC8vIHRoaXMuY291bnRlciA9IHRoaXMuY291bnRlciArIDE7XG4gICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICBkcmFnZ2FibGVDb250ZW50OiB0aGlzLmRyYWdnYWJsZUNvbnRlbnRcbiAgICAvLyB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb3VudGVyID0gdGhpcy5jb3VudGVyICsgMTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkcmFnZ2FibGVDb250ZW50OiB0aGlzLmRyYWdnYWJsZUNvbnRlbnRcbiAgICAgIH0pO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8RHJhZ2dhYmxlIHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCBibHVlJywgd2lkdGg6IDIwMCwgaGVpZ2h0OiAyMDAsIG92ZXJmbG93WDogJ3Njcm9sbCcsIG92ZXJmbG93WTogJ3Njcm9sbCcgfX0+XG4gICAgICAgICAge3RoaXMuc3RhdGUuZHJhZ2dhYmxlQ29udGVudH1cbiAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICAgIDxEaXNhYmxlU2VsZWN0aW9uPlxuICAgICAgICAgIDxwPmRpc2FibGVkIHNlbGVjdGlvbjwvcD5cbiAgICAgICAgPC9EaXNhYmxlU2VsZWN0aW9uPlxuICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSkubWFwKChlbCwgaSkgPT4gPHAga2V5PXtpfT57aX0gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPC9wPil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYWdnYWJsZVNjcmVlbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBGb3JtSW5wdXROdW1iZXJcbn0gZnJvbSAnZGV2LWJveC11aSc7XG5cblxuY2xhc3MgRm9ybUlucHV0TnVtYmVyU2NyZWVuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlucHV0VmFsdWU6IC03LjA4XG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoaW5wdXRWYWx1ZSkge1xuICAgIGNvbnN0IHZhbHVlVG9TZW5kQmFjayA9IE51bWJlcihpbnB1dFZhbHVlLnRvUHJlY2lzaW9uKDE2KSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnB1dFZhbHVlOiB2YWx1ZVRvU2VuZEJhY2tcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEZvcm1JbnB1dE51bWJlclxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmlucHV0VmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIGRlZmF1bHREZWNQb2ludD1cIixcIlxuICAgICAgICAgIGRlZmF1bHRUaG91c2FuZHNTZXBhcmF0b3I9XCIuXCJcbiAgICAgICAgLz5cbiAgICAgICAgPEZvcm1JbnB1dE51bWJlclxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmlucHV0VmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgICA8cD57dGhpcy5zdGF0ZS5pbnB1dFZhbHVlfXsnXFx1MDBBMCd9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtSW5wdXROdW1iZXJTY3JlZW47XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgRm9ybUlucHV0XG59IGZyb20gJ2Rldi1ib3gtdWknO1xuXG5cbmNsYXNzIEZvcm1JbnB1dFNjcmVlbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbnB1dFZhbHVlOiA2XG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoaW5wdXRWYWx1ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW5wdXRWYWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Rm9ybUlucHV0XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuaW5wdXRWYWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgaGFzV2FybmluZz17ZmFsc2V9XG4gICAgICAgICAgaGFzRXJyb3I9e2ZhbHNlfVxuICAgICAgICAgIGRpc2FibGVkPXtmYWxzZX1cbiAgICAgICAgLz5cbiAgICAgICAgPHA+e3RoaXMuc3RhdGUuaW5wdXRWYWx1ZX17J1xcdTAwQTAnfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRm9ybUlucHV0U2NyZWVuO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEhlbGxvXG59IGZyb20gJ2Rldi1ib3gtdWknO1xuXG5jbGFzcyBIZWxsb1NjcmVlbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLyogZXNsaW50IG5vLWNvbnNvbGU6IDAgKi9cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcgSGVsbG9TY3JlZW4gY29tcG9uZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8SGVsbG8gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVsbG9TY3JlZW47XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgTGlzdFxufSBmcm9tICdkZXYtYm94LXVpJztcblxuY2xhc3MgTGlzdFNjcmVlbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPExpc3QgaXRlbXM9e1sndGhyZWUnLCAnZm91ciddfS8+XG4gICAgICAgIDxMaXN0IGl0ZW1zPXtbJ3RocmVlJywgJ2ZvdXInXX0vPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0U2NyZWVuO1xuIiwiaW1wb3J0IEhlbGxvU2NyZWVuIGZyb20gJy4vSGVsbG9TY3JlZW4nO1xuaW1wb3J0IExpc3RTY3JlZW4gZnJvbSAnLi9MaXN0U2NyZWVuJztcbmltcG9ydCBGb3JtSW5wdXRTY3JlZW4gZnJvbSAnLi9Gb3JtSW5wdXRTY3JlZW4nO1xuaW1wb3J0IEZvcm1JbnB1dE51bWJlclNjcmVlbiBmcm9tICcuL0Zvcm1JbnB1dE51bWJlclNjcmVlbic7XG5pbXBvcnQgRHJhZ2dhYmxlIGZyb20gJy4vRHJhZ2dhYmxlU2NyZWVuJztcbmltcG9ydCBEQlVXZWJDb21wb25lbnRTY3JlZW4gZnJvbSAnLi9EQlVXZWJDb21wb25lbnRTY3JlZW4nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEhlbGxvU2NyZWVuLFxuICBMaXN0U2NyZWVuLFxuICBGb3JtSW5wdXRTY3JlZW4sXG4gIEZvcm1JbnB1dE51bWJlclNjcmVlbixcbiAgRHJhZ2dhYmxlLFxuICBEQlVXZWJDb21wb25lbnRTY3JlZW5cbn07XG4iXX0=
