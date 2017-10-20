require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var IconBase = function IconBase(_ref, _ref2) {
  var children = _ref.children;
  var color = _ref.color;
  var size = _ref.size;
  var style = _ref.style;
  var width = _ref.width;
  var height = _ref.height;

  var props = _objectWithoutProperties(_ref, ['children', 'color', 'size', 'style', 'width', 'height']);

  var _ref2$reactIconBase = _ref2.reactIconBase;
  var reactIconBase = _ref2$reactIconBase === undefined ? {} : _ref2$reactIconBase;

  var computedSize = size || reactIconBase.size || '1em';
  return _react2.default.createElement('svg', _extends({
    children: children,
    fill: 'currentColor',
    preserveAspectRatio: 'xMidYMid meet',
    height: height || computedSize,
    width: width || computedSize
  }, reactIconBase, props, {
    style: _extends({
      verticalAlign: 'middle',
      color: color || reactIconBase.color
    }, reactIconBase.style || {}, style)
  }));
};

IconBase.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  style: _propTypes2.default.object
};

IconBase.contextTypes = {
  reactIconBase: _propTypes2.default.shape(IconBase.propTypes)
};

exports.default = IconBase;
module.exports = exports['default'];
},{"prop-types":"prop-types","react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = require('react-icon-base');

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaSpinner = function FaSpinner(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm11.7 31.1q0 1.2-0.8 2t-2 0.9q-1.2 0-2-0.9t-0.9-2q0-1.2 0.9-2t2-0.8 2 0.8 0.8 2z m11.2 4.6q0 1.2-0.9 2t-2 0.9-2-0.9-0.9-2 0.9-2 2-0.8 2 0.8 0.9 2z m-15.8-15.7q0 1.2-0.8 2t-2 0.9-2-0.9-0.9-2 0.9-2 2-0.9 2 0.9 0.8 2z m26.9 11.1q0 1.2-0.9 2t-2 0.9q-1.2 0-2-0.9t-0.8-2 0.8-2 2-0.8 2 0.8 0.9 2z m-21.5-22.2q0 1.5-1.1 2.5t-2.5 1.1-2.5-1.1-1.1-2.5 1.1-2.5 2.5-1.1 2.5 1.1 1.1 2.5z m26.1 11.1q0 1.2-0.9 2t-2 0.9-2-0.9-0.8-2 0.8-2 2-0.9 2 0.9 0.9 2z m-14.3-15.7q0 1.8-1.3 3t-3 1.3-3-1.3-1.3-3 1.3-3.1 3-1.2 3 1.3 1.3 3z m11.8 4.6q0 2.1-1.5 3.5t-3.5 1.5q-2.1 0-3.5-1.5t-1.5-3.5q0-2.1 1.5-3.5t3.5-1.5q2.1 0 3.5 1.5t1.5 3.5z' })
        )
    );
};

exports.default = FaSpinner;
module.exports = exports['default'];
},{"react":"react","react-icon-base":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = localeAware;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _LocaleService = require('./../services/LocaleService');

var _LocaleService2 = _interopRequireDefault(_LocaleService);

var _I18nService = require('./../services/I18nService');

var _I18nService2 = _interopRequireDefault(_I18nService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function localeAware(Component) {
  class LocaleAware extends _react2.default.PureComponent {
    constructor(props, context) {
      super(props, context);
      this.handleLocaleChange = this.handleLocaleChange.bind(this);
      this.unregisterLocaleChange = null;
      this.state = {
        locale: _LocaleService2.default.locale
      };
      this._mounted = false;
      this._component = null;
    }

    handleLocaleChange(locale) {
      this._mounted && this.state.locale !== locale && this.setState({
        locale
      });
    }

    componentDidMount() {
      this.unregisterLocaleChange = _LocaleService2.default.onLocaleChange(this.handleLocaleChange);
      this._mounted = true;
    }

    componentWillUnmount() {
      this._mounted = false;
      this.unregisterLocaleChange();
    }

    render() {
      const { locale } = this.state;
      return _react2.default.createElement(Component, _extends({}, this.props, {
        locale: locale,
        translations: _I18nService2.default.currentLangTranslations,
        ref: comp => this._component = comp
      }));
    }
  }

  LocaleAware.displayName = `LocaleAware(${Component.displayName || Component.name || 'Component'})`;

  return (0, _hoistNonReactStatics2.default)(LocaleAware, Component);
}

},{"./../services/I18nService":9,"./../services/LocaleService":10,"hoist-non-react-statics":"hoist-non-react-statics","react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localeAware = require('../../HOC/localeAware');

var _localeAware2 = _interopRequireDefault(_localeAware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormInputNumber extends _react2.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      value: evt.target.value
    });
  }

  render() {
    const {
      name
    } = this.props;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', {
        name: name,
        type: 'text',
        value: this.state.value,
        onChange: this.handleChange
      })
    );
  }
}

FormInputNumber.propTypes = {
  value: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired
};

exports.default = (0, _localeAware2.default)(FormInputNumber);

},{"../../HOC/localeAware":4,"prop-types":"prop-types","react":"react"}],6:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _spinner = require('react-icons/lib/fa/spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _List = require('../List/List');

var _List2 = _interopRequireDefault(_List);

var _World = require('../World/World');

var _World2 = _interopRequireDefault(_World);

var _localeAware = require('../../HOC/localeAware');

var _localeAware2 = _interopRequireDefault(_localeAware);

var _I18nService = require('./../../services/I18nService');

var _I18nService2 = _interopRequireDefault(_I18nService);

var _template = require('../../utils/template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_I18nService2.default.registerTranslations({
  en: {
    'Hello': _template2.default`Hello ${'age'} ${'name'}`
  },
  sp: {
    'Hello': _template2.default`Hola ${'age'} ${'name'}`
  }
});

const listItems = ['one', 'two'];

class Hello extends _react2.default.PureComponent {
  render() {
    const { translations } = this.props;
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: 0 */
      // console.log('rendering Hello component');
    }
    return _react2.default.createElement(
      'div',
      null,
      translations.Hello({ age: 22, name: this.props.name || 'Nobody' }),
      _react2.default.createElement(_spinner2.default, null),
      _react2.default.createElement(_List2.default, { items: listItems }),
      _react2.default.createElement(_List2.default, { items: listItems }),
      _react2.default.createElement(_World2.default, null),
      _react2.default.createElement(_World2.default, null)
    );
  }
}

Hello.propTypes = {
  translations: _propTypes2.default.object,
  name: _propTypes2.default.string.isRequired
};

exports.default = (0, _localeAware2.default)(Hello);

}).call(this,require('_process'))

},{"../../HOC/localeAware":4,"../../utils/template":12,"../List/List":7,"../World/World":8,"./../../services/I18nService":9,"_process":1,"prop-types":"prop-types","react":"react","react-icons/lib/fa/spinner":3}],7:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localeAware = require('../../HOC/localeAware');

var _localeAware2 = _interopRequireDefault(_localeAware);

var _I18nService = require('./../../services/I18nService');

var _I18nService2 = _interopRequireDefault(_I18nService);

var _template = require('../../utils/template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_I18nService2.default.registerTranslations({
  en: {
    'list': _template2.default`list`
  },
  sp: {
    'list': _template2.default`lista`
  }
});

class List extends _react2.default.PureComponent {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: 0 */
      // console.log('rendering List component');
    }
    return _react2.default.createElement(
      'div',
      null,
      this.props.translations.list(),
      _react2.default.createElement(
        'ul',
        null,
        this.props.items.map(item => _react2.default.createElement(
          'li',
          { key: item },
          item
        ))
      )
    );
  }
}

List.defaultProps = {
  items: []
};

List.propTypes = {
  items: _propTypes2.default.array
};

exports.default = (0, _localeAware2.default)(List);

}).call(this,require('_process'))

},{"../../HOC/localeAware":4,"../../utils/template":12,"./../../services/I18nService":9,"_process":1,"prop-types":"prop-types","react":"react"}],8:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require('../List/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class World extends _react2.default.PureComponent {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: 0 */
      // console.log('rendering Hello component');
    }
    return _react2.default.createElement(
      'div',
      null,
      'World ------------',
      _react2.default.createElement(_List2.default, { items: ['five', 'six'] }),
      _react2.default.createElement(_List2.default, { items: ['five', 'six'] }),
      '------------------'
    );
  }
}

World.propTypes = {};

exports.default = World;

}).call(this,require('_process'))

},{"../List/List":7,"_process":1,"prop-types":"prop-types","react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LocaleService = require('./LocaleService');

var _LocaleService2 = _interopRequireDefault(_LocaleService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emptyObj = {};

class I18nService {
  constructor() {
    _LocaleService2.default.onLocaleChange(this._handleLocaleChange.bind(this));
    this._locale = _LocaleService2.default.locale;
    this._translations = {};
  }

  _handleLocaleChange(locale) {
    this._locale = locale;
  }

  clearTranslations(lang) {
    delete this._translations[lang];
  }

  registerTranslations(translations) {
    this._translations = Object.keys(translations).reduce((acc, lang) => {
      acc[lang] = Object.assign({}, this._translations[lang], translations[lang]);
      return acc;
    }, this._translations);
  }

  translate(msg) {
    return this.currentLangTranslations[msg];
  }

  get translations() {
    return this._translations;
  }

  get currentLangTranslations() {
    return this._translations[this._locale.lang] || emptyObj;
  }
}

const i18nService = new I18nService();
exports.default = i18nService;

},{"./LocaleService":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const defaultLocale = {
  dir: 'ltr',
  lang: 'en'
};

class LocaleService {
  constructor() {
    this._callbacks = [];
    this._localeAttrs = Object.keys(defaultLocale);
    this._rootElement = window.document.documentElement;
    this._localeAttrs.forEach(attr => {
      if (!this._rootElement.getAttribute(attr)) {
        this._rootElement.setAttribute(attr, defaultLocale[attr]);
      }
    });
    this._locale = this._localeAttrs.reduce((acc, attr) => {
      acc[attr] = this._rootElement.getAttribute(attr);
      return acc;
    }, {});
    this._observer = new MutationObserver(this._handleMutations.bind(this));
    this._observer.observe(this._rootElement, {
      attributes: true
    });
  }

  _handleMutations(mutations) {
    mutations.forEach(mutation => {
      const mutationAttributeName = mutation.attributeName;
      if (this._localeAttrs.includes(mutationAttributeName)) {
        this._locale = Object.assign({}, this._locale, {
          [mutationAttributeName]: this._rootElement.getAttribute(mutationAttributeName)
        });
        this._callbacks.forEach(callback => callback(this._locale));
      }
    });
  }

  set locale(localeObj) {
    Object.keys(localeObj).forEach(key => {
      this._rootElement.setAttribute(key, localeObj[key]);
    });
  }

  get locale() {
    return this._locale;
  }

  onLocaleChange(callback) {
    this._callbacks.push(callback);
    callback(this.locale);
    return () => {
      this._callbacks = this._callbacks.filter(cb => cb !== callback);
    };
  }
}

const localeService = new LocaleService();
exports.default = localeService;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onScreenConsole;

const buttonHeight = '25px';
const buttonStart = '5px';
const buttonTop = '5px';

let consoleMessages = [];
const consoleLog = console.log.bind(console);
const consoleOriginal = {};

function captureConsole(consoleElm, options) {
  const { indent = 2, showLastOnly = false } = options;
  const handler = function handler(action, ...args) {
    if (showLastOnly) {
      consoleMessages = [{ [action]: args }];
    } else {
      consoleMessages.push({ [action]: args });
    }

    consoleElm.innerHTML = consoleMessages.map(entry => {
      const action = Object.keys(entry)[0];
      const values = entry[action];
      const message = values.map(item => {
        return [undefined, null].includes(item) || ['number', 'string', 'function'].includes(typeof item) ? item : ['Map', 'Set'].includes(item.constructor.name) ? `${item.constructor.name} (${JSON.stringify([...item])})` : JSON.stringify(item, (key, value) => {
          if (typeof value === 'function') {
            return value.toString();
          }
          return value;
        }, indent);
      }).join(', ');

      const color = {
        log: '#000',
        warn: 'orange',
        error: 'darkred'
      }[action];

      return `<pre style="color: ${color}">${message}</pre>`;
    }).join('\n');
  };
  ['log', 'warn', 'error'].forEach(action => {
    consoleOriginal[action] = console[action];
    console[action] = handler.bind(console, action);
  });
  window.addEventListener('error', evt => {
    // eslint no-console: 0
    console.error(`"${evt.message}" from ${evt.filename}:${evt.lineno}`);
    console.error(evt, evt.error.stack);
    // evt.preventDefault();
  });
  consoleLog('console captured');
  return function releaseConsole() {
    ['log', 'warn', 'error'].forEach(action => {
      console[action] = consoleOriginal[action];
    });
    consoleLog('console released');
  };
}

function createConsole({
  options,
  consoleStyle: {
    btnStart = buttonStart, btnHeight = buttonHeight,
    width = `calc(100vw - ${btnStart} - 30px)`, height = '400px',
    background = 'rgba(0, 0, 0, 0.5)'
  }
}) {
  const { rtl = false } = options;
  const console = document.createElement('div');
  console.id = 'DBUonScreenConsole';
  console.style.cssText = `
    display: block;
    margin: 0px;
    padding: 5px;
    position: absolute;
    overflow: auto;
    width: ${width};
    height: ${height};
    top: ${btnHeight};
    ${rtl ? 'right' : 'left'}: 0px;
    background: ${background};
    z-index: 9999;
    -webkit-overflow-scrolling: touch
    `;
  return console;
}

function createButton({
  options,
  buttonStyle: {
    position = 'fixed',
    width = '25px', height = buttonHeight, top = buttonTop, start = buttonStart,
    background = 'rgba(0, 0, 0, 0.5)'
  }
}) {
  const { rtl = false } = options;
  const button = document.createElement('div');
  button.id = 'DBUonScreenConsoleToggler';
  button.style.cssText = `
    position: ${position};
    width: ${width};
    height: ${height};
    top: ${top};
    ${rtl ? 'right' : 'left'}: ${start};
    background: ${background};
    z-index: 9999;
    `;
  return button;
}

/**
onScreenConsole({
  buttonStyle = { position, width, height, top, start, background },
  consoleStyle = { width, height, background },
  options = { rtl: false, indent, showLastOnly }
})
*/
function onScreenConsole({
  buttonStyle = {},
  consoleStyle = {},
  options = {}
} = {}) {
  const button = createButton({
    options,
    buttonStyle
  });
  const console = createConsole({
    consoleStyle: Object.assign({}, consoleStyle, {
      btnHeight: buttonStyle.height,
      btnStart: buttonStyle.start
    }),
    options
  });

  console.addEventListener('click', e => {
    e.stopPropagation();
  });

  button.addEventListener('click', e => {
    e.stopPropagation();
    if (!button.contains(console)) {
      button.appendChild(console);
      console.scrollTop = console.scrollHeight - console.clientHeight;
    } else {
      button.removeChild(console);
    }
  });

  document.body.appendChild(button);
  const releaseConsole = captureConsole(console, options);

  return function release() {
    document.body.removeChild(button);
    releaseConsole();
  };
}

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;
function template(strings, ...keys) {
  return (...values) => {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}

},{}],"dev-box-ui":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormInputNumber = exports.List = exports.Hello = exports.localeAware = exports.i18nService = exports.localeService = exports.onScreenConsole = exports.template = undefined;

var _template = require('./utils/template');

var _template2 = _interopRequireDefault(_template);

var _onScreenConsole = require('./utils/onScreenConsole');

var _onScreenConsole2 = _interopRequireDefault(_onScreenConsole);

var _LocaleService = require('./services/LocaleService');

var _LocaleService2 = _interopRequireDefault(_LocaleService);

var _I18nService = require('./services/I18nService');

var _I18nService2 = _interopRequireDefault(_I18nService);

var _localeAware = require('./HOC/localeAware');

var _localeAware2 = _interopRequireDefault(_localeAware);

var _Hello = require('./components/Hello/Hello');

var _Hello2 = _interopRequireDefault(_Hello);

var _List = require('./components/List/List');

var _List2 = _interopRequireDefault(_List);

var _FormInputNumber = require('./components/FormInputNumber/FormInputNumber');

var _FormInputNumber2 = _interopRequireDefault(_FormInputNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// HOC


// Services
// Utils
exports.template = _template2.default;
exports.onScreenConsole = _onScreenConsole2.default;
exports.localeService = _LocaleService2.default;
exports.i18nService = _I18nService2.default;
exports.localeAware = _localeAware2.default;
exports.Hello = _Hello2.default;
exports.List = _List2.default;
exports.FormInputNumber = _FormInputNumber2.default;

// Components

},{"./HOC/localeAware":4,"./components/FormInputNumber/FormInputNumber":5,"./components/Hello/Hello":6,"./components/List/List":7,"./services/I18nService":9,"./services/LocaleService":10,"./utils/onScreenConsole":11,"./utils/template":12}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWljb24tYmFzZS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtaWNvbnMvbGliL2ZhL3NwaW5uZXIuanMiLCJzcmMvbGliL0hPQy9sb2NhbGVBd2FyZS5qcyIsInNyYy9saWIvY29tcG9uZW50cy9Gb3JtSW5wdXROdW1iZXIvRm9ybUlucHV0TnVtYmVyLmpzIiwic3JjL2xpYi9jb21wb25lbnRzL0hlbGxvL0hlbGxvLmpzIiwic3JjL2xpYi9jb21wb25lbnRzL0xpc3QvTGlzdC5qcyIsInNyYy9saWIvY29tcG9uZW50cy9Xb3JsZC9Xb3JsZC5qcyIsInNyYy9saWIvc2VydmljZXMvSTE4blNlcnZpY2UuanMiLCJzcmMvbGliL3NlcnZpY2VzL0xvY2FsZVNlcnZpY2UuanMiLCJzcmMvbGliL3V0aWxzL29uU2NyZWVuQ29uc29sZS5qcyIsInNyYy9saWIvdXRpbHMvdGVtcGxhdGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtB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RUFBd0IsT0FBeEIsQ0FBdkI7O0FBRUEsU0FBTyxTQUFTLE9BQVQsR0FBbUI7QUFDeEIsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUExQjtBQUNBO0FBQ0QsR0FIRDtBQUlEOzs7Ozs7OztrQkNqS3VCLFE7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkIsR0FBRyxJQUE5QixFQUFvQztBQUNqRCxTQUFRLENBQUMsR0FBRyxNQUFKLEtBQWU7QUFDckIsVUFBTSxPQUFPLE9BQU8sT0FBTyxNQUFQLEdBQWdCLENBQXZCLEtBQTZCLEVBQTFDO0FBQ0EsVUFBTSxTQUFTLENBQUMsUUFBUSxDQUFSLENBQUQsQ0FBZjtBQUNBLFNBQUssT0FBTCxDQUFhLENBQUMsR0FBRCxFQUFNLENBQU4sS0FBWTtBQUN2QixZQUFNLFFBQVEsT0FBTyxTQUFQLENBQWlCLEdBQWpCLElBQXdCLE9BQU8sR0FBUCxDQUF4QixHQUFzQyxLQUFLLEdBQUwsQ0FBcEQ7QUFDQSxhQUFPLElBQVAsQ0FBWSxLQUFaLEVBQW1CLFFBQVEsSUFBSSxDQUFaLENBQW5CO0FBQ0QsS0FIRDtBQUlBLFdBQU8sT0FBTyxJQUFQLENBQVksRUFBWixDQUFQO0FBQ0QsR0FSRDtBQVNEOzs7Ozs7Ozs7O0FDVkQ7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBTkE7OztBQUpBO0FBSkE7UUFtQkUsUTtRQUNBLGU7UUFHQSxhO1FBQ0EsVztRQUdBLFc7UUFHQSxLO1FBQ0EsSTtRQUNBLGU7O0FBckJGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIEljb25CYXNlID0gZnVuY3Rpb24gSWNvbkJhc2UoX3JlZiwgX3JlZjIpIHtcbiAgdmFyIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbjtcbiAgdmFyIGNvbG9yID0gX3JlZi5jb2xvcjtcbiAgdmFyIHNpemUgPSBfcmVmLnNpemU7XG4gIHZhciBzdHlsZSA9IF9yZWYuc3R5bGU7XG4gIHZhciB3aWR0aCA9IF9yZWYud2lkdGg7XG4gIHZhciBoZWlnaHQgPSBfcmVmLmhlaWdodDtcblxuICB2YXIgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydjaGlsZHJlbicsICdjb2xvcicsICdzaXplJywgJ3N0eWxlJywgJ3dpZHRoJywgJ2hlaWdodCddKTtcblxuICB2YXIgX3JlZjIkcmVhY3RJY29uQmFzZSA9IF9yZWYyLnJlYWN0SWNvbkJhc2U7XG4gIHZhciByZWFjdEljb25CYXNlID0gX3JlZjIkcmVhY3RJY29uQmFzZSA9PT0gdW5kZWZpbmVkID8ge30gOiBfcmVmMiRyZWFjdEljb25CYXNlO1xuXG4gIHZhciBjb21wdXRlZFNpemUgPSBzaXplIHx8IHJlYWN0SWNvbkJhc2Uuc2l6ZSB8fCAnMWVtJztcbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdzdmcnLCBfZXh0ZW5kcyh7XG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgIHByZXNlcnZlQXNwZWN0UmF0aW86ICd4TWlkWU1pZCBtZWV0JyxcbiAgICBoZWlnaHQ6IGhlaWdodCB8fCBjb21wdXRlZFNpemUsXG4gICAgd2lkdGg6IHdpZHRoIHx8IGNvbXB1dGVkU2l6ZVxuICB9LCByZWFjdEljb25CYXNlLCBwcm9wcywge1xuICAgIHN0eWxlOiBfZXh0ZW5kcyh7XG4gICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgIGNvbG9yOiBjb2xvciB8fCByZWFjdEljb25CYXNlLmNvbG9yXG4gICAgfSwgcmVhY3RJY29uQmFzZS5zdHlsZSB8fCB7fSwgc3R5bGUpXG4gIH0pKTtcbn07XG5cbkljb25CYXNlLnByb3BUeXBlcyA9IHtcbiAgY29sb3I6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBzaXplOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyXSksXG4gIHdpZHRoOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyXSksXG4gIGhlaWdodDogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlcl0pLFxuICBzdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3Rcbn07XG5cbkljb25CYXNlLmNvbnRleHRUeXBlcyA9IHtcbiAgcmVhY3RJY29uQmFzZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zaGFwZShJY29uQmFzZS5wcm9wVHlwZXMpXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBJY29uQmFzZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RJY29uQmFzZSA9IHJlcXVpcmUoJ3JlYWN0LWljb24tYmFzZScpO1xuXG52YXIgX3JlYWN0SWNvbkJhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RJY29uQmFzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBGYVNwaW5uZXIgPSBmdW5jdGlvbiBGYVNwaW5uZXIocHJvcHMpIHtcbiAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIF9yZWFjdEljb25CYXNlMi5kZWZhdWx0LFxuICAgICAgICBfZXh0ZW5kcyh7IHZpZXdCb3g6ICcwIDAgNDAgNDAnIH0sIHByb3BzKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZycsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7IGQ6ICdtMTEuNyAzMS4xcTAgMS4yLTAuOCAydC0yIDAuOXEtMS4yIDAtMi0wLjl0LTAuOS0ycTAtMS4yIDAuOS0ydDItMC44IDIgMC44IDAuOCAyeiBtMTEuMiA0LjZxMCAxLjItMC45IDJ0LTIgMC45LTItMC45LTAuOS0yIDAuOS0yIDItMC44IDIgMC44IDAuOSAyeiBtLTE1LjgtMTUuN3EwIDEuMi0wLjggMnQtMiAwLjktMi0wLjktMC45LTIgMC45LTIgMi0wLjkgMiAwLjkgMC44IDJ6IG0yNi45IDExLjFxMCAxLjItMC45IDJ0LTIgMC45cS0xLjIgMC0yLTAuOXQtMC44LTIgMC44LTIgMi0wLjggMiAwLjggMC45IDJ6IG0tMjEuNS0yMi4ycTAgMS41LTEuMSAyLjV0LTIuNSAxLjEtMi41LTEuMS0xLjEtMi41IDEuMS0yLjUgMi41LTEuMSAyLjUgMS4xIDEuMSAyLjV6IG0yNi4xIDExLjFxMCAxLjItMC45IDJ0LTIgMC45LTItMC45LTAuOC0yIDAuOC0yIDItMC45IDIgMC45IDAuOSAyeiBtLTE0LjMtMTUuN3EwIDEuOC0xLjMgM3QtMyAxLjMtMy0xLjMtMS4zLTMgMS4zLTMuMSAzLTEuMiAzIDEuMyAxLjMgM3ogbTExLjggNC42cTAgMi4xLTEuNSAzLjV0LTMuNSAxLjVxLTIuMSAwLTMuNS0xLjV0LTEuNS0zLjVxMC0yLjEgMS41LTMuNXQzLjUtMS41cTIuMSAwIDMuNSAxLjV0MS41IDMuNXonIH0pXG4gICAgICAgIClcbiAgICApO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRmFTcGlubmVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBob2lzdE5vblJlYWN0U3RhdGljcyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XG5pbXBvcnQgbG9jYWxlU2VydmljZSBmcm9tICcuLy4uL3NlcnZpY2VzL0xvY2FsZVNlcnZpY2UnO1xuaW1wb3J0IGkxOG5TZXJ2aWNlIGZyb20gJy4vLi4vc2VydmljZXMvSTE4blNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2NhbGVBd2FyZShDb21wb25lbnQpIHtcbiAgY2xhc3MgTG9jYWxlQXdhcmUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgICAgdGhpcy5oYW5kbGVMb2NhbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUxvY2FsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy51bnJlZ2lzdGVyTG9jYWxlQ2hhbmdlID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIGxvY2FsZTogbG9jYWxlU2VydmljZS5sb2NhbGVcbiAgICAgIH07XG4gICAgICB0aGlzLl9tb3VudGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9jb21wb25lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUxvY2FsZUNoYW5nZShsb2NhbGUpIHtcbiAgICAgIHRoaXMuX21vdW50ZWQgJiYgdGhpcy5zdGF0ZS5sb2NhbGUgIT09IGxvY2FsZSAmJiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbG9jYWxlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMudW5yZWdpc3RlckxvY2FsZUNoYW5nZSA9IGxvY2FsZVNlcnZpY2Uub25Mb2NhbGVDaGFuZ2UodGhpcy5oYW5kbGVMb2NhbGVDaGFuZ2UpO1xuICAgICAgdGhpcy5fbW91bnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLl9tb3VudGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnVucmVnaXN0ZXJMb2NhbGVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7IGxvY2FsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICBsb2NhbGU9eyBsb2NhbGUgfVxuICAgICAgICAgIHRyYW5zbGF0aW9ucz17IGkxOG5TZXJ2aWNlLmN1cnJlbnRMYW5nVHJhbnNsYXRpb25zIH1cbiAgICAgICAgICByZWY9eyBjb21wID0+IHRoaXMuX2NvbXBvbmVudCA9IGNvbXAgfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBMb2NhbGVBd2FyZS5kaXNwbGF5TmFtZSA9IGBMb2NhbGVBd2FyZSgke1xuICAgIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fFxuICAgIENvbXBvbmVudC5uYW1lIHx8XG4gICAgJ0NvbXBvbmVudCdcbiAgfSlgO1xuXG4gIHJldHVybiBob2lzdE5vblJlYWN0U3RhdGljcyhMb2NhbGVBd2FyZSwgQ29tcG9uZW50KTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGxvY2FsZUF3YXJlIGZyb20gJy4uLy4uL0hPQy9sb2NhbGVBd2FyZSc7XG5cbmNsYXNzIEZvcm1JbnB1dE51bWJlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IHByb3BzLnZhbHVlIHx8IDBcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZShldnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlOiBldnQudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbmFtZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRm9ybUlucHV0TnVtYmVyLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9jYWxlQXdhcmUoRm9ybUlucHV0TnVtYmVyKTtcblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgRmFTcGlubmVyIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9zcGlubmVyJztcbmltcG9ydCBMaXN0IGZyb20gJy4uL0xpc3QvTGlzdCc7XG5pbXBvcnQgV29ybGQgZnJvbSAnLi4vV29ybGQvV29ybGQnO1xuaW1wb3J0IGxvY2FsZUF3YXJlIGZyb20gJy4uLy4uL0hPQy9sb2NhbGVBd2FyZSc7XG5pbXBvcnQgaTE4blNlcnZpY2UgZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9JMThuU2VydmljZSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGUnO1xuXG5pMThuU2VydmljZS5yZWdpc3RlclRyYW5zbGF0aW9ucyh7XG4gIGVuOiB7XG4gICAgJ0hlbGxvJzogdGVtcGxhdGVgSGVsbG8gJHsnYWdlJ30gJHsnbmFtZSd9YFxuICB9LFxuICBzcDoge1xuICAgICdIZWxsbyc6IHRlbXBsYXRlYEhvbGEgJHsnYWdlJ30gJHsnbmFtZSd9YFxuICB9XG59KTtcblxuY29uc3QgbGlzdEl0ZW1zID0gWydvbmUnLCAndHdvJ107XG5cblxuY2xhc3MgSGVsbG8gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBIZWxsbyBjb21wb25lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0cmFuc2xhdGlvbnMuSGVsbG8oeyBhZ2U6IDIyLCBuYW1lOiB0aGlzLnByb3BzLm5hbWUgfHwgJ05vYm9keScgfSl9XG4gICAgICAgIDxGYVNwaW5uZXIgLz5cbiAgICAgICAgPExpc3QgaXRlbXM9eyBsaXN0SXRlbXMgfS8+XG4gICAgICAgIDxMaXN0IGl0ZW1zPXsgbGlzdEl0ZW1zIH0vPlxuICAgICAgICA8V29ybGQgLz5cbiAgICAgICAgPFdvcmxkIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhlbGxvLnByb3BUeXBlcyA9IHtcbiAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvY2FsZUF3YXJlKEhlbGxvKTtcblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbG9jYWxlQXdhcmUgZnJvbSAnLi4vLi4vSE9DL2xvY2FsZUF3YXJlJztcbmltcG9ydCBpMThuU2VydmljZSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL0kxOG5TZXJ2aWNlJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZSc7XG5cbmkxOG5TZXJ2aWNlLnJlZ2lzdGVyVHJhbnNsYXRpb25zKHtcbiAgZW46IHtcbiAgICAnbGlzdCc6IHRlbXBsYXRlYGxpc3RgXG4gIH0sXG4gIHNwOiB7XG4gICAgJ2xpc3QnOiB0ZW1wbGF0ZWBsaXN0YWBcbiAgfVxufSk7XG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBMaXN0IGNvbXBvbmVudCcpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMucHJvcHMudHJhbnNsYXRpb25zLmxpc3QoKX1cbiAgICAgICAgPHVsPlxuICAgICAgICAgIHt0aGlzLnByb3BzLml0ZW1zLm1hcChpdGVtID0+IDxsaSBrZXk9e2l0ZW19PntpdGVtfTwvbGk+KX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGl0ZW1zOiBbXVxufTtcblxuTGlzdC5wcm9wVHlwZXMgPSB7XG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvY2FsZUF3YXJlKExpc3QpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTGlzdCBmcm9tICcuLi9MaXN0L0xpc3QnO1xuXG5jbGFzcyBXb3JsZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8qIGVzbGludCBuby1jb25zb2xlOiAwICovXG4gICAgICAvLyBjb25zb2xlLmxvZygncmVuZGVyaW5nIEhlbGxvIGNvbXBvbmVudCcpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgV29ybGQgLS0tLS0tLS0tLS0tXG4gICAgICAgIDxMaXN0IGl0ZW1zPXtbJ2ZpdmUnLCAnc2l4J119Lz5cbiAgICAgICAgPExpc3QgaXRlbXM9e1snZml2ZScsICdzaXgnXX0vPlxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuV29ybGQucHJvcFR5cGVzID0ge1xufTtcblxuZXhwb3J0IGRlZmF1bHQgV29ybGQ7XG5cbiIsImltcG9ydCBsb2NhbGVTZXJ2aWNlIGZyb20gJy4vTG9jYWxlU2VydmljZSc7XG5cbmNvbnN0IGVtcHR5T2JqID0ge307XG5cbmNsYXNzIEkxOG5TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbG9jYWxlU2VydmljZS5vbkxvY2FsZUNoYW5nZSh0aGlzLl9oYW5kbGVMb2NhbGVDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fbG9jYWxlID0gbG9jYWxlU2VydmljZS5sb2NhbGU7XG4gICAgdGhpcy5fdHJhbnNsYXRpb25zID0ge307XG4gIH1cblxuICBfaGFuZGxlTG9jYWxlQ2hhbmdlKGxvY2FsZSkge1xuICAgIHRoaXMuX2xvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIGNsZWFyVHJhbnNsYXRpb25zKGxhbmcpIHtcbiAgICBkZWxldGUgdGhpcy5fdHJhbnNsYXRpb25zW2xhbmddO1xuICB9XG5cbiAgcmVnaXN0ZXJUcmFuc2xhdGlvbnModHJhbnNsYXRpb25zKSB7XG4gICAgdGhpcy5fdHJhbnNsYXRpb25zID0gT2JqZWN0LmtleXModHJhbnNsYXRpb25zKS5yZWR1Y2UoKGFjYywgbGFuZykgPT4ge1xuICAgICAgYWNjW2xhbmddID0ge1xuICAgICAgICAuLi50aGlzLl90cmFuc2xhdGlvbnNbbGFuZ10sXG4gICAgICAgIC4uLnRyYW5zbGF0aW9uc1tsYW5nXVxuICAgICAgfTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGhpcy5fdHJhbnNsYXRpb25zKTtcbiAgfVxuXG4gIHRyYW5zbGF0ZShtc2cpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TGFuZ1RyYW5zbGF0aW9uc1ttc2ddO1xuICB9XG5cbiAgZ2V0IHRyYW5zbGF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNsYXRpb25zO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRMYW5nVHJhbnNsYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2xhdGlvbnNbdGhpcy5fbG9jYWxlLmxhbmddIHx8IGVtcHR5T2JqO1xuICB9XG59XG5cbmNvbnN0IGkxOG5TZXJ2aWNlID0gbmV3IEkxOG5TZXJ2aWNlKCk7XG5leHBvcnQgZGVmYXVsdCBpMThuU2VydmljZTtcbiIsIlxuY29uc3QgZGVmYXVsdExvY2FsZSA9IHtcbiAgZGlyOiAnbHRyJyxcbiAgbGFuZzogJ2VuJ1xufTtcblxuY2xhc3MgTG9jYWxlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IFtdO1xuICAgIHRoaXMuX2xvY2FsZUF0dHJzID0gT2JqZWN0LmtleXMoZGVmYXVsdExvY2FsZSk7XG4gICAgdGhpcy5fcm9vdEVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIHRoaXMuX2xvY2FsZUF0dHJzLmZvckVhY2goKGF0dHIpID0+IHtcbiAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpKSB7XG4gICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBkZWZhdWx0TG9jYWxlW2F0dHJdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9sb2NhbGUgPSB0aGlzLl9sb2NhbGVBdHRycy5yZWR1Y2UoKGFjYywgYXR0cikgPT4ge1xuICAgICAgYWNjW2F0dHJdID0gdGhpcy5fcm9vdEVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gICAgdGhpcy5fb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLl9oYW5kbGVNdXRhdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9yb290RWxlbWVudCwge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgX2hhbmRsZU11dGF0aW9ucyhtdXRhdGlvbnMpIHtcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcbiAgICAgIGNvbnN0IG11dGF0aW9uQXR0cmlidXRlTmFtZSA9IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWU7XG4gICAgICBpZiAodGhpcy5fbG9jYWxlQXR0cnMuaW5jbHVkZXMobXV0YXRpb25BdHRyaWJ1dGVOYW1lKSkge1xuICAgICAgICB0aGlzLl9sb2NhbGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5fbG9jYWxlLFxuICAgICAgICAgIFttdXRhdGlvbkF0dHJpYnV0ZU5hbWVdOiB0aGlzLl9yb290RWxlbWVudC5nZXRBdHRyaWJ1dGUobXV0YXRpb25BdHRyaWJ1dGVOYW1lKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayh0aGlzLl9sb2NhbGUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldCBsb2NhbGUobG9jYWxlT2JqKSB7XG4gICAgT2JqZWN0LmtleXMobG9jYWxlT2JqKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGxvY2FsZU9ialtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBsb2NhbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgfVxuXG4gIG9uTG9jYWxlQ2hhbmdlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIGNhbGxiYWNrKHRoaXMubG9jYWxlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmZpbHRlcihjYiA9PiBjYiAhPT0gY2FsbGJhY2spO1xuICAgIH07XG4gIH1cbn1cblxuY29uc3QgbG9jYWxlU2VydmljZSA9IG5ldyBMb2NhbGVTZXJ2aWNlKCk7XG5leHBvcnQgZGVmYXVsdCBsb2NhbGVTZXJ2aWNlO1xuIiwiXG5jb25zdCBidXR0b25IZWlnaHQgPSAnMjVweCc7XG5jb25zdCBidXR0b25TdGFydCA9ICc1cHgnO1xuY29uc3QgYnV0dG9uVG9wID0gJzVweCc7XG5cbmxldCBjb25zb2xlTWVzc2FnZXMgPSBbXTtcbmNvbnN0IGNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuY29uc3QgY29uc29sZU9yaWdpbmFsID0ge307XG5cbmZ1bmN0aW9uIGNhcHR1cmVDb25zb2xlKGNvbnNvbGVFbG0sIG9wdGlvbnMpIHtcbiAgY29uc3QgeyBpbmRlbnQgPSAyLCBzaG93TGFzdE9ubHkgPSBmYWxzZSB9ID0gb3B0aW9ucztcbiAgY29uc3QgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgaWYgKHNob3dMYXN0T25seSkge1xuICAgICAgY29uc29sZU1lc3NhZ2VzID0gW3sgW2FjdGlvbl06IGFyZ3MgfV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGVNZXNzYWdlcy5wdXNoKHsgW2FjdGlvbl06IGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgY29uc29sZUVsbS5pbm5lckhUTUwgPSBjb25zb2xlTWVzc2FnZXMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0gT2JqZWN0LmtleXMoZW50cnkpWzBdO1xuICAgICAgY29uc3QgdmFsdWVzID0gZW50cnlbYWN0aW9uXTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB2YWx1ZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgW3VuZGVmaW5lZCwgbnVsbF0uaW5jbHVkZXMoaXRlbSkgfHxcbiAgICAgICAgICBbJ251bWJlcicsICdzdHJpbmcnLCAnZnVuY3Rpb24nXS5pbmNsdWRlcyh0eXBlb2YgaXRlbSlcbiAgICAgICAgKSA/XG4gICAgICAgICAgaXRlbSA6XG4gICAgICAgICAgWydNYXAnLCAnU2V0J10uaW5jbHVkZXMoaXRlbS5jb25zdHJ1Y3Rvci5uYW1lKSA/XG4gICAgICAgICAgICBgJHtpdGVtLmNvbnN0cnVjdG9yLm5hbWV9ICgke0pTT04uc3RyaW5naWZ5KFsuLi5pdGVtXSl9KWAgOlxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoaXRlbSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgdmFsdWUpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSwgaW5kZW50KTtcbiAgICAgIH0pLmpvaW4oJywgJyk7XG5cbiAgICAgIGNvbnN0IGNvbG9yID0ge1xuICAgICAgICBsb2c6ICcjMDAwJyxcbiAgICAgICAgd2FybjogJ29yYW5nZScsXG4gICAgICAgIGVycm9yOiAnZGFya3JlZCdcbiAgICAgIH1bYWN0aW9uXTtcblxuICAgICAgcmV0dXJuIGA8cHJlIHN0eWxlPVwiY29sb3I6ICR7Y29sb3J9XCI+JHttZXNzYWdlfTwvcHJlPmA7XG4gICAgfSkuam9pbignXFxuJyk7XG4gIH07XG4gIFsnbG9nJywgJ3dhcm4nLCAnZXJyb3InXS5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICBjb25zb2xlT3JpZ2luYWxbYWN0aW9uXSA9IGNvbnNvbGVbYWN0aW9uXTtcbiAgICBjb25zb2xlW2FjdGlvbl0gPSBoYW5kbGVyLmJpbmQoY29uc29sZSwgYWN0aW9uKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldnQpID0+IHtcbiAgICAvLyBlc2xpbnQgbm8tY29uc29sZTogMFxuICAgIGNvbnNvbGUuZXJyb3IoYFwiJHtldnQubWVzc2FnZX1cIiBmcm9tICR7ZXZ0LmZpbGVuYW1lfToke2V2dC5saW5lbm99YCk7XG4gICAgY29uc29sZS5lcnJvcihldnQsIGV2dC5lcnJvci5zdGFjayk7XG4gICAgLy8gZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuICBjb25zb2xlTG9nKCdjb25zb2xlIGNhcHR1cmVkJyk7XG4gIHJldHVybiBmdW5jdGlvbiByZWxlYXNlQ29uc29sZSgpIHtcbiAgICBbJ2xvZycsICd3YXJuJywgJ2Vycm9yJ10uZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICBjb25zb2xlW2FjdGlvbl0gPSBjb25zb2xlT3JpZ2luYWxbYWN0aW9uXTtcbiAgICB9KTtcbiAgICBjb25zb2xlTG9nKCdjb25zb2xlIHJlbGVhc2VkJyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnNvbGUoe1xuICBvcHRpb25zLFxuICBjb25zb2xlU3R5bGU6IHtcbiAgICBidG5TdGFydCA9IGJ1dHRvblN0YXJ0LCBidG5IZWlnaHQgPSBidXR0b25IZWlnaHQsXG4gICAgd2lkdGggPSBgY2FsYygxMDB2dyAtICR7YnRuU3RhcnR9IC0gMzBweClgLCBoZWlnaHQgPSAnNDAwcHgnLFxuICAgIGJhY2tncm91bmQgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xuICB9XG59KSB7XG4gIGNvbnN0IHsgcnRsID0gZmFsc2UgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGNvbnNvbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc29sZS5pZCA9ICdEQlVvblNjcmVlbkNvbnNvbGUnO1xuICBjb25zb2xlLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICB3aWR0aDogJHt3aWR0aH07XG4gICAgaGVpZ2h0OiAke2hlaWdodH07XG4gICAgdG9wOiAke2J0bkhlaWdodH07XG4gICAgJHtydGwgPyAncmlnaHQnIDogJ2xlZnQnfTogMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7YmFja2dyb3VuZH07XG4gICAgei1pbmRleDogOTk5OTtcbiAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2hcbiAgICBgO1xuICByZXR1cm4gY29uc29sZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHtcbiAgb3B0aW9ucyxcbiAgYnV0dG9uU3R5bGU6IHtcbiAgICBwb3NpdGlvbiA9ICdmaXhlZCcsXG4gICAgd2lkdGggPSAnMjVweCcsIGhlaWdodCA9IGJ1dHRvbkhlaWdodCwgdG9wID0gYnV0dG9uVG9wLCBzdGFydCA9IGJ1dHRvblN0YXJ0LFxuICAgIGJhY2tncm91bmQgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xuICB9XG59KSB7XG4gIGNvbnN0IHsgcnRsID0gZmFsc2UgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBidXR0b24uaWQgPSAnREJVb25TY3JlZW5Db25zb2xlVG9nZ2xlcic7XG4gIGJ1dHRvbi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcbiAgICB3aWR0aDogJHt3aWR0aH07XG4gICAgaGVpZ2h0OiAke2hlaWdodH07XG4gICAgdG9wOiAke3RvcH07XG4gICAgJHtydGwgPyAncmlnaHQnIDogJ2xlZnQnfTogJHtzdGFydH07XG4gICAgYmFja2dyb3VuZDogJHtiYWNrZ3JvdW5kfTtcbiAgICB6LWluZGV4OiA5OTk5O1xuICAgIGA7XG4gIHJldHVybiBidXR0b247XG59XG5cbi8qKlxub25TY3JlZW5Db25zb2xlKHtcbiAgYnV0dG9uU3R5bGUgPSB7IHBvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0LCB0b3AsIHN0YXJ0LCBiYWNrZ3JvdW5kIH0sXG4gIGNvbnNvbGVTdHlsZSA9IHsgd2lkdGgsIGhlaWdodCwgYmFja2dyb3VuZCB9LFxuICBvcHRpb25zID0geyBydGw6IGZhbHNlLCBpbmRlbnQsIHNob3dMYXN0T25seSB9XG59KVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uU2NyZWVuQ29uc29sZSh7XG4gIGJ1dHRvblN0eWxlID0ge30sXG4gIGNvbnNvbGVTdHlsZSA9IHt9LFxuICBvcHRpb25zID0ge31cbn0gPSB7fSkge1xuICBjb25zdCBidXR0b24gPSBjcmVhdGVCdXR0b24oe1xuICAgIG9wdGlvbnMsXG4gICAgYnV0dG9uU3R5bGVcbiAgfSk7XG4gIGNvbnN0IGNvbnNvbGUgPSBjcmVhdGVDb25zb2xlKHtcbiAgICBjb25zb2xlU3R5bGU6IHtcbiAgICAgIC4uLmNvbnNvbGVTdHlsZSxcbiAgICAgIGJ0bkhlaWdodDogYnV0dG9uU3R5bGUuaGVpZ2h0LFxuICAgICAgYnRuU3RhcnQ6IGJ1dHRvblN0eWxlLnN0YXJ0XG4gICAgfSxcbiAgICBvcHRpb25zXG4gIH0pO1xuXG4gIGNvbnNvbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoIWJ1dHRvbi5jb250YWlucyhjb25zb2xlKSkge1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGNvbnNvbGUpO1xuICAgICAgY29uc29sZS5zY3JvbGxUb3AgPSBjb25zb2xlLnNjcm9sbEhlaWdodCAtIGNvbnNvbGUuY2xpZW50SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b24ucmVtb3ZlQ2hpbGQoY29uc29sZSk7XG4gICAgfVxuICB9KTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIGNvbnN0IHJlbGVhc2VDb25zb2xlID0gY2FwdHVyZUNvbnNvbGUoY29uc29sZSwgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbGVhc2UoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChidXR0b24pO1xuICAgIHJlbGVhc2VDb25zb2xlKCk7XG4gIH07XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRlbXBsYXRlKHN0cmluZ3MsIC4uLmtleXMpIHtcbiAgcmV0dXJuICgoLi4udmFsdWVzKSA9PiB7XG4gICAgY29uc3QgZGljdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV0gfHwge307XG4gICAgY29uc3QgcmVzdWx0ID0gW3N0cmluZ3NbMF1dO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5LCBpKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5pc0ludGVnZXIoa2V5KSA/IHZhbHVlc1trZXldIDogZGljdFtrZXldO1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUsIHN0cmluZ3NbaSArIDFdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICB9KTtcbn1cbiIsIi8vIFV0aWxzXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi91dGlscy90ZW1wbGF0ZSc7XG5pbXBvcnQgb25TY3JlZW5Db25zb2xlIGZyb20gJy4vdXRpbHMvb25TY3JlZW5Db25zb2xlJztcblxuLy8gU2VydmljZXNcbmltcG9ydCBsb2NhbGVTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvTG9jYWxlU2VydmljZSc7XG5pbXBvcnQgaTE4blNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9JMThuU2VydmljZSc7XG5cbi8vIEhPQ1xuaW1wb3J0IGxvY2FsZUF3YXJlIGZyb20gJy4vSE9DL2xvY2FsZUF3YXJlJztcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IEhlbGxvIGZyb20gJy4vY29tcG9uZW50cy9IZWxsby9IZWxsbyc7XG5pbXBvcnQgTGlzdCBmcm9tICcuL2NvbXBvbmVudHMvTGlzdC9MaXN0JztcbmltcG9ydCBGb3JtSW5wdXROdW1iZXIgZnJvbSAnLi9jb21wb25lbnRzL0Zvcm1JbnB1dE51bWJlci9Gb3JtSW5wdXROdW1iZXInO1xuXG5cbmV4cG9ydCB7XG4gIC8vIFV0aWxzXG4gIHRlbXBsYXRlLFxuICBvblNjcmVlbkNvbnNvbGUsXG5cbiAgLy8gU2VydmljZXNcbiAgbG9jYWxlU2VydmljZSxcbiAgaTE4blNlcnZpY2UsXG5cbiAgLy8gSE9DXG4gIGxvY2FsZUF3YXJlLFxuXG4gIC8vIENvbXBvbmVudHNcbiAgSGVsbG8sXG4gIExpc3QsXG4gIEZvcm1JbnB1dE51bWJlclxufTtcbiJdfQ==
