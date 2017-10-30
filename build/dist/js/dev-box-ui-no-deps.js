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

},{"./../services/I18nService":10,"./../services/LocaleService":11,"hoist-non-react-statics":"hoist-non-react-statics","react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

class FormInput extends _react2.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value.toString()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: (nextProps.value || '').toString()
    });
  }

  handleChange(evt) {
    const { value } = evt.target;
    this.setState({
      value
    }, () => {
      this.props.onChange(value);
    });
  }

  render() {
    const _props = this.props,
          { hasWarning, hasError } = _props,
          rest = _objectWithoutProperties(_props, ['hasWarning', 'hasError']);
    const inputClassNames = (0, _classnames2.default)({
      'dbu-form-input': true,
      'dbu-warning': hasWarning,
      'dbu-error': hasError,
      'dbu-theme': true,
      'dbu-patch': true
    });
    return _react2.default.createElement('input', _extends({
      'data-component-id': 'FormInput',
      className: inputClassNames
    }, rest, {
      value: this.state.value,
      onChange: this.handleChange
    }));
  }
}

FormInput.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {}
};

FormInput.propTypes = {
  type: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  onChange: _propTypes2.default.func,
  hasWarning: _propTypes2.default.bool,
  hasError: _propTypes2.default.bool
};

exports.default = FormInput;

},{"classnames":"classnames","prop-types":"prop-types","react":"react"}],6:[function(require,module,exports){
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

},{"../../HOC/localeAware":4,"prop-types":"prop-types","react":"react"}],7:[function(require,module,exports){
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
    Hello: _template2.default`Hello ${'age'} ${'name'}`
  },
  sp: {
    Hello: _template2.default`Hola ${'age'} ${'name'}`
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

},{"../../HOC/localeAware":4,"../../utils/template":13,"../List/List":8,"../World/World":9,"./../../services/I18nService":10,"_process":1,"prop-types":"prop-types","react":"react","react-icons/lib/fa/spinner":3}],8:[function(require,module,exports){
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
    list: _template2.default`list`
  },
  sp: {
    list: _template2.default`lista`
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
  items: _propTypes2.default.array,
  translations: _propTypes2.default.object
};

exports.default = (0, _localeAware2.default)(List);

}).call(this,require('_process'))

},{"../../HOC/localeAware":4,"../../utils/template":13,"./../../services/I18nService":10,"_process":1,"prop-types":"prop-types","react":"react"}],9:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
// import PropTypes from 'prop-types';


World.propTypes = {};

exports.default = World;

}).call(this,require('_process'))

},{"../List/List":8,"_process":1,"react":"react"}],10:[function(require,module,exports){
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

},{"./LocaleService":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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
exports.FormInputNumber = exports.FormInput = exports.List = exports.Hello = exports.localeAware = exports.i18nService = exports.localeService = exports.onScreenConsole = exports.template = undefined;

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

var _FormInput = require('./components/FormInput/FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _FormInputNumber = require('./components/FormInputNumber/FormInputNumber');

var _FormInputNumber2 = _interopRequireDefault(_FormInputNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components
exports.template = _template2.default;
exports.onScreenConsole = _onScreenConsole2.default;
exports.localeService = _LocaleService2.default;
exports.i18nService = _I18nService2.default;
exports.localeAware = _localeAware2.default;
exports.Hello = _Hello2.default;
exports.List = _List2.default;
exports.FormInput = _FormInput2.default;
exports.FormInputNumber = _FormInputNumber2.default;

// HOC


// Services
// Utils

},{"./HOC/localeAware":4,"./components/FormInput/FormInput":5,"./components/FormInputNumber/FormInputNumber":6,"./components/Hello/Hello":7,"./components/List/List":8,"./services/I18nService":10,"./services/LocaleService":11,"./utils/onScreenConsole":12,"./utils/template":13}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWljb24tYmFzZS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtaWNvbnMvbGliL2ZhL3NwaW5uZXIuanMiLCJzcmMvbGliL0hPQy9sb2NhbGVBd2FyZS5qcyIsInNyYy9saWIvY29tcG9uZW50cy9Gb3JtSW5wdXQvRm9ybUlucHV0LmpzIiwic3JjL2xpYi9jb21wb25lbnRzL0Zvcm1JbnB1dE51bWJlci9Gb3JtSW5wdXROdW1iZXIuanMiLCJzcmMvbGliL2NvbXBvbmVudHMvSGVsbG8vSGVsbG8uanMiLCJzcmMvbGliL2NvbXBvbmVudHMvTGlzdC9MaXN0LmpzIiwic3JjL2xpYi9jb21wb25lbnRzL1dvcmxkL1dvcmxkLmpzIiwic3JjL2xpYi9zZXJ2aWNlcy9JMThuU2VydmljZS5qcyIsInNyYy9saWIvc2VydmljZXMvTG9jYWxlU2VydmljZS5qcyIsInNyYy9saWIvdXRpbHMvb25TY3JlZW5Db25zb2xlLmpzIiwic3JjL2xpYi91dGlscy90ZW1wbGF0ZS5qcyIsInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7Ozs7OztBQUpBO1FBU0UsUTtRQUNBLGU7UUFHQSxhO1FBQ0EsVztRQUdBLFc7UUFHQSxLO1FBQ0EsSTtRQUNBLFM7UUFDQSxlOztBQTFCRjs7O0FBSkE7QUFKQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgX3Byb3BUeXBlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9wVHlwZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbnZhciBJY29uQmFzZSA9IGZ1bmN0aW9uIEljb25CYXNlKF9yZWYsIF9yZWYyKSB7XG4gIHZhciBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW47XG4gIHZhciBjb2xvciA9IF9yZWYuY29sb3I7XG4gIHZhciBzaXplID0gX3JlZi5zaXplO1xuICB2YXIgc3R5bGUgPSBfcmVmLnN0eWxlO1xuICB2YXIgd2lkdGggPSBfcmVmLndpZHRoO1xuICB2YXIgaGVpZ2h0ID0gX3JlZi5oZWlnaHQ7XG5cbiAgdmFyIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnY2hpbGRyZW4nLCAnY29sb3InLCAnc2l6ZScsICdzdHlsZScsICd3aWR0aCcsICdoZWlnaHQnXSk7XG5cbiAgdmFyIF9yZWYyJHJlYWN0SWNvbkJhc2UgPSBfcmVmMi5yZWFjdEljb25CYXNlO1xuICB2YXIgcmVhY3RJY29uQmFzZSA9IF9yZWYyJHJlYWN0SWNvbkJhc2UgPT09IHVuZGVmaW5lZCA/IHt9IDogX3JlZjIkcmVhY3RJY29uQmFzZTtcblxuICB2YXIgY29tcHV0ZWRTaXplID0gc2l6ZSB8fCByZWFjdEljb25CYXNlLnNpemUgfHwgJzFlbSc7XG4gIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnc3ZnJywgX2V4dGVuZHMoe1xuICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiAneE1pZFlNaWQgbWVldCcsXG4gICAgaGVpZ2h0OiBoZWlnaHQgfHwgY29tcHV0ZWRTaXplLFxuICAgIHdpZHRoOiB3aWR0aCB8fCBjb21wdXRlZFNpemVcbiAgfSwgcmVhY3RJY29uQmFzZSwgcHJvcHMsIHtcbiAgICBzdHlsZTogX2V4dGVuZHMoe1xuICAgICAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gICAgICBjb2xvcjogY29sb3IgfHwgcmVhY3RJY29uQmFzZS5jb2xvclxuICAgIH0sIHJlYWN0SWNvbkJhc2Uuc3R5bGUgfHwge30sIHN0eWxlKVxuICB9KSk7XG59O1xuXG5JY29uQmFzZS5wcm9wVHlwZXMgPSB7XG4gIGNvbG9yOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgc2l6ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlcl0pLFxuICB3aWR0aDogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlcl0pLFxuICBoZWlnaHQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXJdKSxcbiAgc3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XG59O1xuXG5JY29uQmFzZS5jb250ZXh0VHlwZXMgPSB7XG4gIHJlYWN0SWNvbkJhc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoSWNvbkJhc2UucHJvcFR5cGVzKVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gSWNvbkJhc2U7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0SWNvbkJhc2UgPSByZXF1aXJlKCdyZWFjdC1pY29uLWJhc2UnKTtcblxudmFyIF9yZWFjdEljb25CYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0SWNvbkJhc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRmFTcGlubmVyID0gZnVuY3Rpb24gRmFTcGlubmVyKHByb3BzKSB7XG4gICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBfcmVhY3RJY29uQmFzZTIuZGVmYXVsdCxcbiAgICAgICAgX2V4dGVuZHMoeyB2aWV3Qm94OiAnMCAwIDQwIDQwJyB9LCBwcm9wcyksXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2cnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnbTExLjcgMzEuMXEwIDEuMi0wLjggMnQtMiAwLjlxLTEuMiAwLTItMC45dC0wLjktMnEwLTEuMiAwLjktMnQyLTAuOCAyIDAuOCAwLjggMnogbTExLjIgNC42cTAgMS4yLTAuOSAydC0yIDAuOS0yLTAuOS0wLjktMiAwLjktMiAyLTAuOCAyIDAuOCAwLjkgMnogbS0xNS44LTE1LjdxMCAxLjItMC44IDJ0LTIgMC45LTItMC45LTAuOS0yIDAuOS0yIDItMC45IDIgMC45IDAuOCAyeiBtMjYuOSAxMS4xcTAgMS4yLTAuOSAydC0yIDAuOXEtMS4yIDAtMi0wLjl0LTAuOC0yIDAuOC0yIDItMC44IDIgMC44IDAuOSAyeiBtLTIxLjUtMjIuMnEwIDEuNS0xLjEgMi41dC0yLjUgMS4xLTIuNS0xLjEtMS4xLTIuNSAxLjEtMi41IDIuNS0xLjEgMi41IDEuMSAxLjEgMi41eiBtMjYuMSAxMS4xcTAgMS4yLTAuOSAydC0yIDAuOS0yLTAuOS0wLjgtMiAwLjgtMiAyLTAuOSAyIDAuOSAwLjkgMnogbS0xNC4zLTE1LjdxMCAxLjgtMS4zIDN0LTMgMS4zLTMtMS4zLTEuMy0zIDEuMy0zLjEgMy0xLjIgMyAxLjMgMS4zIDN6IG0xMS44IDQuNnEwIDIuMS0xLjUgMy41dC0zLjUgMS41cS0yLjEgMC0zLjUtMS41dC0xLjUtMy41cTAtMi4xIDEuNS0zLjV0My41LTEuNXEyLjEgMCAzLjUgMS41dDEuNSAzLjV6JyB9KVxuICAgICAgICApXG4gICAgKTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZhU3Bpbm5lcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaG9pc3ROb25SZWFjdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuaW1wb3J0IGxvY2FsZVNlcnZpY2UgZnJvbSAnLi8uLi9zZXJ2aWNlcy9Mb2NhbGVTZXJ2aWNlJztcbmltcG9ydCBpMThuU2VydmljZSBmcm9tICcuLy4uL3NlcnZpY2VzL0kxOG5TZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9jYWxlQXdhcmUoQ29tcG9uZW50KSB7XG4gIGNsYXNzIExvY2FsZUF3YXJlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAgIHRoaXMuaGFuZGxlTG9jYWxlQ2hhbmdlID0gdGhpcy5oYW5kbGVMb2NhbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMudW5yZWdpc3RlckxvY2FsZUNoYW5nZSA9IG51bGw7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBsb2NhbGU6IGxvY2FsZVNlcnZpY2UubG9jYWxlXG4gICAgICB9O1xuICAgICAgdGhpcy5fbW91bnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fY29tcG9uZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYW5kbGVMb2NhbGVDaGFuZ2UobG9jYWxlKSB7XG4gICAgICB0aGlzLl9tb3VudGVkICYmIHRoaXMuc3RhdGUubG9jYWxlICE9PSBsb2NhbGUgJiYgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxvY2FsZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLnVucmVnaXN0ZXJMb2NhbGVDaGFuZ2UgPSBsb2NhbGVTZXJ2aWNlLm9uTG9jYWxlQ2hhbmdlKHRoaXMuaGFuZGxlTG9jYWxlQ2hhbmdlKTtcbiAgICAgIHRoaXMuX21vdW50ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5fbW91bnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy51bnJlZ2lzdGVyTG9jYWxlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgeyBsb2NhbGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29tcG9uZW50IHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgbG9jYWxlPXsgbG9jYWxlIH1cbiAgICAgICAgICB0cmFuc2xhdGlvbnM9eyBpMThuU2VydmljZS5jdXJyZW50TGFuZ1RyYW5zbGF0aW9ucyB9XG4gICAgICAgICAgcmVmPXsgY29tcCA9PiB0aGlzLl9jb21wb25lbnQgPSBjb21wIH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgTG9jYWxlQXdhcmUuZGlzcGxheU5hbWUgPSBgTG9jYWxlQXdhcmUoJHtcbiAgICBDb21wb25lbnQuZGlzcGxheU5hbWUgfHxcbiAgICBDb21wb25lbnQubmFtZSB8fFxuICAgICdDb21wb25lbnQnXG4gIH0pYDtcblxuICByZXR1cm4gaG9pc3ROb25SZWFjdFN0YXRpY3MoTG9jYWxlQXdhcmUsIENvbXBvbmVudCk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbiBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRm9ybUlucHV0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogcHJvcHMudmFsdWUudG9TdHJpbmcoKVxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlOiAobmV4dFByb3BzLnZhbHVlIHx8ICcnKS50b1N0cmluZygpXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoZXZ0KSB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZ0LnRhcmdldDtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoYXNXYXJuaW5nLCBoYXNFcnJvciwgLi4ucmVzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbnB1dENsYXNzTmFtZXMgPSBjbih7XG4gICAgICAnZGJ1LWZvcm0taW5wdXQnOiB0cnVlLFxuICAgICAgJ2RidS13YXJuaW5nJzogaGFzV2FybmluZyxcbiAgICAgICdkYnUtZXJyb3InOiBoYXNFcnJvcixcbiAgICAgICdkYnUtdGhlbWUnOiB0cnVlLFxuICAgICAgJ2RidS1wYXRjaCc6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIGRhdGEtY29tcG9uZW50LWlkPVwiRm9ybUlucHV0XCJcbiAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzTmFtZXN9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbkZvcm1JbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gIHR5cGU6ICd0ZXh0JyxcbiAgdmFsdWU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge31cbn07XG5cbkZvcm1JbnB1dC5wcm9wVHlwZXMgPSB7XG4gIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIFByb3BUeXBlcy5udW1iZXJcbiAgXSksXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgaGFzV2FybmluZzogUHJvcFR5cGVzLmJvb2wsXG4gIGhhc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1JbnB1dDtcblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbG9jYWxlQXdhcmUgZnJvbSAnLi4vLi4vSE9DL2xvY2FsZUF3YXJlJztcblxuY2xhc3MgRm9ybUlucHV0TnVtYmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogcHJvcHMudmFsdWUgfHwgMFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKGV2dCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdmFsdWU6IGV2dC50YXJnZXQudmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBuYW1lXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Gb3JtSW5wdXROdW1iZXIucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2NhbGVBd2FyZShGb3JtSW5wdXROdW1iZXIpO1xuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBGYVNwaW5uZXIgZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3NwaW5uZXInO1xuaW1wb3J0IExpc3QgZnJvbSAnLi4vTGlzdC9MaXN0JztcbmltcG9ydCBXb3JsZCBmcm9tICcuLi9Xb3JsZC9Xb3JsZCc7XG5pbXBvcnQgbG9jYWxlQXdhcmUgZnJvbSAnLi4vLi4vSE9DL2xvY2FsZUF3YXJlJztcbmltcG9ydCBpMThuU2VydmljZSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL0kxOG5TZXJ2aWNlJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZSc7XG5cbmkxOG5TZXJ2aWNlLnJlZ2lzdGVyVHJhbnNsYXRpb25zKHtcbiAgZW46IHtcbiAgICBIZWxsbzogdGVtcGxhdGVgSGVsbG8gJHsnYWdlJ30gJHsnbmFtZSd9YFxuICB9LFxuICBzcDoge1xuICAgIEhlbGxvOiB0ZW1wbGF0ZWBIb2xhICR7J2FnZSd9ICR7J25hbWUnfWBcbiAgfVxufSk7XG5cbmNvbnN0IGxpc3RJdGVtcyA9IFsnb25lJywgJ3R3byddO1xuXG5cbmNsYXNzIEhlbGxvIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRyYW5zbGF0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLyogZXNsaW50IG5vLWNvbnNvbGU6IDAgKi9cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcgSGVsbG8gY29tcG9uZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dHJhbnNsYXRpb25zLkhlbGxvKHsgYWdlOiAyMiwgbmFtZTogdGhpcy5wcm9wcy5uYW1lIHx8ICdOb2JvZHknIH0pfVxuICAgICAgICA8RmFTcGlubmVyIC8+XG4gICAgICAgIDxMaXN0IGl0ZW1zPXsgbGlzdEl0ZW1zIH0vPlxuICAgICAgICA8TGlzdCBpdGVtcz17IGxpc3RJdGVtcyB9Lz5cbiAgICAgICAgPFdvcmxkIC8+XG4gICAgICAgIDxXb3JsZCAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IZWxsby5wcm9wVHlwZXMgPSB7XG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2NhbGVBd2FyZShIZWxsbyk7XG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGxvY2FsZUF3YXJlIGZyb20gJy4uLy4uL0hPQy9sb2NhbGVBd2FyZSc7XG5pbXBvcnQgaTE4blNlcnZpY2UgZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9JMThuU2VydmljZSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGUnO1xuXG5pMThuU2VydmljZS5yZWdpc3RlclRyYW5zbGF0aW9ucyh7XG4gIGVuOiB7XG4gICAgbGlzdDogdGVtcGxhdGVgbGlzdGBcbiAgfSxcbiAgc3A6IHtcbiAgICBsaXN0OiB0ZW1wbGF0ZWBsaXN0YWBcbiAgfVxufSk7XG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBMaXN0IGNvbXBvbmVudCcpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMucHJvcHMudHJhbnNsYXRpb25zLmxpc3QoKX1cbiAgICAgICAgPHVsPlxuICAgICAgICAgIHt0aGlzLnByb3BzLml0ZW1zLm1hcChpdGVtID0+IDxsaSBrZXk9e2l0ZW19PntpdGVtfTwvbGk+KX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGl0ZW1zOiBbXVxufTtcblxuTGlzdC5wcm9wVHlwZXMgPSB7XG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLm9iamVjdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9jYWxlQXdhcmUoTGlzdCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBMaXN0IGZyb20gJy4uL0xpc3QvTGlzdCc7XG5cbmNsYXNzIFdvcmxkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLyogZXNsaW50IG5vLWNvbnNvbGU6IDAgKi9cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcgSGVsbG8gY29tcG9uZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICBXb3JsZCAtLS0tLS0tLS0tLS1cbiAgICAgICAgPExpc3QgaXRlbXM9e1snZml2ZScsICdzaXgnXX0vPlxuICAgICAgICA8TGlzdCBpdGVtcz17WydmaXZlJywgJ3NpeCddfS8+XG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Xb3JsZC5wcm9wVHlwZXMgPSB7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXb3JsZDtcblxuIiwiaW1wb3J0IGxvY2FsZVNlcnZpY2UgZnJvbSAnLi9Mb2NhbGVTZXJ2aWNlJztcblxuY29uc3QgZW1wdHlPYmogPSB7fTtcblxuY2xhc3MgSTE4blNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsb2NhbGVTZXJ2aWNlLm9uTG9jYWxlQ2hhbmdlKHRoaXMuX2hhbmRsZUxvY2FsZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9sb2NhbGUgPSBsb2NhbGVTZXJ2aWNlLmxvY2FsZTtcbiAgICB0aGlzLl90cmFuc2xhdGlvbnMgPSB7fTtcbiAgfVxuXG4gIF9oYW5kbGVMb2NhbGVDaGFuZ2UobG9jYWxlKSB7XG4gICAgdGhpcy5fbG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgY2xlYXJUcmFuc2xhdGlvbnMobGFuZykge1xuICAgIGRlbGV0ZSB0aGlzLl90cmFuc2xhdGlvbnNbbGFuZ107XG4gIH1cblxuICByZWdpc3RlclRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnMpIHtcbiAgICB0aGlzLl90cmFuc2xhdGlvbnMgPSBPYmplY3Qua2V5cyh0cmFuc2xhdGlvbnMpLnJlZHVjZSgoYWNjLCBsYW5nKSA9PiB7XG4gICAgICBhY2NbbGFuZ10gPSB7XG4gICAgICAgIC4uLnRoaXMuX3RyYW5zbGF0aW9uc1tsYW5nXSxcbiAgICAgICAgLi4udHJhbnNsYXRpb25zW2xhbmddXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0aGlzLl90cmFuc2xhdGlvbnMpO1xuICB9XG5cbiAgdHJhbnNsYXRlKG1zZykge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRMYW5nVHJhbnNsYXRpb25zW21zZ107XG4gIH1cblxuICBnZXQgdHJhbnNsYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2xhdGlvbnM7XG4gIH1cblxuICBnZXQgY3VycmVudExhbmdUcmFuc2xhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0aW9uc1t0aGlzLl9sb2NhbGUubGFuZ10gfHwgZW1wdHlPYmo7XG4gIH1cbn1cblxuY29uc3QgaTE4blNlcnZpY2UgPSBuZXcgSTE4blNlcnZpY2UoKTtcbmV4cG9ydCBkZWZhdWx0IGkxOG5TZXJ2aWNlO1xuIiwiXG5jb25zdCBkZWZhdWx0TG9jYWxlID0ge1xuICBkaXI6ICdsdHInLFxuICBsYW5nOiAnZW4nXG59O1xuXG5jbGFzcyBMb2NhbGVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0gW107XG4gICAgdGhpcy5fbG9jYWxlQXR0cnMgPSBPYmplY3Qua2V5cyhkZWZhdWx0TG9jYWxlKTtcbiAgICB0aGlzLl9yb290RWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdGhpcy5fbG9jYWxlQXR0cnMuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cikpIHtcbiAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGRlZmF1bHRMb2NhbGVbYXR0cl0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2xvY2FsZSA9IHRoaXMuX2xvY2FsZUF0dHJzLnJlZHVjZSgoYWNjLCBhdHRyKSA9PiB7XG4gICAgICBhY2NbYXR0cl0gPSB0aGlzLl9yb290RWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuX2hhbmRsZU11dGF0aW9ucy5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMuX3Jvb3RFbGVtZW50LCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBfaGFuZGxlTXV0YXRpb25zKG11dGF0aW9ucykge1xuICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuICAgICAgY29uc3QgbXV0YXRpb25BdHRyaWJ1dGVOYW1lID0gbXV0YXRpb24uYXR0cmlidXRlTmFtZTtcbiAgICAgIGlmICh0aGlzLl9sb2NhbGVBdHRycy5pbmNsdWRlcyhtdXRhdGlvbkF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsZSA9IHtcbiAgICAgICAgICAuLi50aGlzLl9sb2NhbGUsXG4gICAgICAgICAgW211dGF0aW9uQXR0cmlidXRlTmFtZV06IHRoaXMuX3Jvb3RFbGVtZW50LmdldEF0dHJpYnV0ZShtdXRhdGlvbkF0dHJpYnV0ZU5hbWUpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRoaXMuX2xvY2FsZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0IGxvY2FsZShsb2NhbGVPYmopIHtcbiAgICBPYmplY3Qua2V5cyhsb2NhbGVPYmopLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgbG9jYWxlT2JqW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGxvY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICB9XG5cbiAgb25Mb2NhbGVDaGFuZ2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgY2FsbGJhY2sodGhpcy5sb2NhbGUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZmlsdGVyKGNiID0+IGNiICE9PSBjYWxsYmFjayk7XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBsb2NhbGVTZXJ2aWNlID0gbmV3IExvY2FsZVNlcnZpY2UoKTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsZVNlcnZpY2U7XG4iLCJcbmNvbnN0IGJ1dHRvbkhlaWdodCA9ICcyNXB4JztcbmNvbnN0IGJ1dHRvblN0YXJ0ID0gJzVweCc7XG5jb25zdCBidXR0b25Ub3AgPSAnNXB4JztcblxubGV0IGNvbnNvbGVNZXNzYWdlcyA9IFtdO1xuY29uc3QgY29uc29sZUxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5jb25zdCBjb25zb2xlT3JpZ2luYWwgPSB7fTtcblxuZnVuY3Rpb24gY2FwdHVyZUNvbnNvbGUoY29uc29sZUVsbSwgb3B0aW9ucykge1xuICBjb25zdCB7IGluZGVudCA9IDIsIHNob3dMYXN0T25seSA9IGZhbHNlIH0gPSBvcHRpb25zO1xuICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlcihhY3Rpb24sIC4uLmFyZ3MpIHtcbiAgICBpZiAoc2hvd0xhc3RPbmx5KSB7XG4gICAgICBjb25zb2xlTWVzc2FnZXMgPSBbeyBbYWN0aW9uXTogYXJncyB9XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZU1lc3NhZ2VzLnB1c2goeyBbYWN0aW9uXTogYXJncyB9KTtcbiAgICB9XG5cbiAgICBjb25zb2xlRWxtLmlubmVySFRNTCA9IGNvbnNvbGVNZXNzYWdlcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBPYmplY3Qua2V5cyhlbnRyeSlbMF07XG4gICAgICBjb25zdCB2YWx1ZXMgPSBlbnRyeVthY3Rpb25dO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbHVlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBbdW5kZWZpbmVkLCBudWxsXS5pbmNsdWRlcyhpdGVtKSB8fFxuICAgICAgICAgIFsnbnVtYmVyJywgJ3N0cmluZycsICdmdW5jdGlvbiddLmluY2x1ZGVzKHR5cGVvZiBpdGVtKVxuICAgICAgICApID9cbiAgICAgICAgICBpdGVtIDpcbiAgICAgICAgICBbJ01hcCcsICdTZXQnXS5pbmNsdWRlcyhpdGVtLmNvbnN0cnVjdG9yLm5hbWUpID9cbiAgICAgICAgICAgIGAke2l0ZW0uY29uc3RydWN0b3IubmFtZX0gKCR7SlNPTi5zdHJpbmdpZnkoWy4uLml0ZW1dKX0pYCA6XG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShpdGVtLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKHR5cGVvZiB2YWx1ZSkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LCBpbmRlbnQpO1xuICAgICAgfSkuam9pbignLCAnKTtcblxuICAgICAgY29uc3QgY29sb3IgPSB7XG4gICAgICAgIGxvZzogJyMwMDAnLFxuICAgICAgICB3YXJuOiAnb3JhbmdlJyxcbiAgICAgICAgZXJyb3I6ICdkYXJrcmVkJ1xuICAgICAgfVthY3Rpb25dO1xuXG4gICAgICByZXR1cm4gYDxwcmUgc3R5bGU9XCJjb2xvcjogJHtjb2xvcn1cIj4ke21lc3NhZ2V9PC9wcmU+YDtcbiAgICB9KS5qb2luKCdcXG4nKTtcbiAgfTtcbiAgWydsb2cnLCAnd2FybicsICdlcnJvciddLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgIGNvbnNvbGVPcmlnaW5hbFthY3Rpb25dID0gY29uc29sZVthY3Rpb25dO1xuICAgIGNvbnNvbGVbYWN0aW9uXSA9IGhhbmRsZXIuYmluZChjb25zb2xlLCBhY3Rpb24pO1xuICB9KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGV2dCkgPT4ge1xuICAgIC8vIGVzbGludCBuby1jb25zb2xlOiAwXG4gICAgY29uc29sZS5lcnJvcihgXCIke2V2dC5tZXNzYWdlfVwiIGZyb20gJHtldnQuZmlsZW5hbWV9OiR7ZXZ0LmxpbmVub31gKTtcbiAgICBjb25zb2xlLmVycm9yKGV2dCwgZXZ0LmVycm9yLnN0YWNrKTtcbiAgICAvLyBldnQucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gIGNvbnNvbGVMb2coJ2NvbnNvbGUgY2FwdHVyZWQnKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbGVhc2VDb25zb2xlKCkge1xuICAgIFsnbG9nJywgJ3dhcm4nLCAnZXJyb3InXS5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICAgIGNvbnNvbGVbYWN0aW9uXSA9IGNvbnNvbGVPcmlnaW5hbFthY3Rpb25dO1xuICAgIH0pO1xuICAgIGNvbnNvbGVMb2coJ2NvbnNvbGUgcmVsZWFzZWQnKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29uc29sZSh7XG4gIG9wdGlvbnMsXG4gIGNvbnNvbGVTdHlsZToge1xuICAgIGJ0blN0YXJ0ID0gYnV0dG9uU3RhcnQsIGJ0bkhlaWdodCA9IGJ1dHRvbkhlaWdodCxcbiAgICB3aWR0aCA9IGBjYWxjKDEwMHZ3IC0gJHtidG5TdGFydH0gLSAzMHB4KWAsIGhlaWdodCA9ICc0MDBweCcsXG4gICAgYmFja2dyb3VuZCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXG4gIH1cbn0pIHtcbiAgY29uc3QgeyBydGwgPSBmYWxzZSB9ID0gb3B0aW9ucztcbiAgY29uc3QgY29uc29sZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zb2xlLmlkID0gJ0RCVW9uU2NyZWVuQ29uc29sZSc7XG4gIGNvbnNvbGUuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW46IDBweDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHdpZHRoOiAke3dpZHRofTtcbiAgICBoZWlnaHQ6ICR7aGVpZ2h0fTtcbiAgICB0b3A6ICR7YnRuSGVpZ2h0fTtcbiAgICAke3J0bCA/ICdyaWdodCcgOiAnbGVmdCd9OiAwcHg7XG4gICAgYmFja2dyb3VuZDogJHtiYWNrZ3JvdW5kfTtcbiAgICB6LWluZGV4OiA5OTk5O1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaFxuICAgIGA7XG4gIHJldHVybiBjb25zb2xlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCdXR0b24oe1xuICBvcHRpb25zLFxuICBidXR0b25TdHlsZToge1xuICAgIHBvc2l0aW9uID0gJ2ZpeGVkJyxcbiAgICB3aWR0aCA9ICcyNXB4JywgaGVpZ2h0ID0gYnV0dG9uSGVpZ2h0LCB0b3AgPSBidXR0b25Ub3AsIHN0YXJ0ID0gYnV0dG9uU3RhcnQsXG4gICAgYmFja2dyb3VuZCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXG4gIH1cbn0pIHtcbiAgY29uc3QgeyBydGwgPSBmYWxzZSB9ID0gb3B0aW9ucztcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGJ1dHRvbi5pZCA9ICdEQlVvblNjcmVlbkNvbnNvbGVUb2dnbGVyJztcbiAgYnV0dG9uLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgcG9zaXRpb246ICR7cG9zaXRpb259O1xuICAgIHdpZHRoOiAke3dpZHRofTtcbiAgICBoZWlnaHQ6ICR7aGVpZ2h0fTtcbiAgICB0b3A6ICR7dG9wfTtcbiAgICAke3J0bCA/ICdyaWdodCcgOiAnbGVmdCd9OiAke3N0YXJ0fTtcbiAgICBiYWNrZ3JvdW5kOiAke2JhY2tncm91bmR9O1xuICAgIHotaW5kZXg6IDk5OTk7XG4gICAgYDtcbiAgcmV0dXJuIGJ1dHRvbjtcbn1cblxuLyoqXG5vblNjcmVlbkNvbnNvbGUoe1xuICBidXR0b25TdHlsZSA9IHsgcG9zaXRpb24sIHdpZHRoLCBoZWlnaHQsIHRvcCwgc3RhcnQsIGJhY2tncm91bmQgfSxcbiAgY29uc29sZVN0eWxlID0geyB3aWR0aCwgaGVpZ2h0LCBiYWNrZ3JvdW5kIH0sXG4gIG9wdGlvbnMgPSB7IHJ0bDogZmFsc2UsIGluZGVudCwgc2hvd0xhc3RPbmx5IH1cbn0pXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25TY3JlZW5Db25zb2xlKHtcbiAgYnV0dG9uU3R5bGUgPSB7fSxcbiAgY29uc29sZVN0eWxlID0ge30sXG4gIG9wdGlvbnMgPSB7fVxufSA9IHt9KSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGNyZWF0ZUJ1dHRvbih7XG4gICAgb3B0aW9ucyxcbiAgICBidXR0b25TdHlsZVxuICB9KTtcbiAgY29uc3QgY29uc29sZSA9IGNyZWF0ZUNvbnNvbGUoe1xuICAgIGNvbnNvbGVTdHlsZToge1xuICAgICAgLi4uY29uc29sZVN0eWxlLFxuICAgICAgYnRuSGVpZ2h0OiBidXR0b25TdHlsZS5oZWlnaHQsXG4gICAgICBidG5TdGFydDogYnV0dG9uU3R5bGUuc3RhcnRcbiAgICB9LFxuICAgIG9wdGlvbnNcbiAgfSk7XG5cbiAgY29uc29sZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICghYnV0dG9uLmNvbnRhaW5zKGNvbnNvbGUpKSB7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoY29uc29sZSk7XG4gICAgICBjb25zb2xlLnNjcm9sbFRvcCA9IGNvbnNvbGUuc2Nyb2xsSGVpZ2h0IC0gY29uc29sZS5jbGllbnRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbi5yZW1vdmVDaGlsZChjb25zb2xlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgY29uc3QgcmVsZWFzZUNvbnNvbGUgPSBjYXB0dXJlQ29uc29sZShjb25zb2xlLCBvcHRpb25zKTtcblxuICByZXR1cm4gZnVuY3Rpb24gcmVsZWFzZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJ1dHRvbik7XG4gICAgcmVsZWFzZUNvbnNvbGUoKTtcbiAgfTtcbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5ncywgLi4ua2V5cykge1xuICByZXR1cm4gKCguLi52YWx1ZXMpID0+IHtcbiAgICBjb25zdCBkaWN0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXSB8fCB7fTtcbiAgICBjb25zdCByZXN1bHQgPSBbc3RyaW5nc1swXV07XG4gICAga2V5cy5mb3JFYWNoKChrZXksIGkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gTnVtYmVyLmlzSW50ZWdlcihrZXkpID8gdmFsdWVzW2tleV0gOiBkaWN0W2tleV07XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSwgc3RyaW5nc1tpICsgMV0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XG4gIH0pO1xufVxuIiwiLy8gVXRpbHNcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3V0aWxzL3RlbXBsYXRlJztcbmltcG9ydCBvblNjcmVlbkNvbnNvbGUgZnJvbSAnLi91dGlscy9vblNjcmVlbkNvbnNvbGUnO1xuXG4vLyBTZXJ2aWNlc1xuaW1wb3J0IGxvY2FsZVNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9Mb2NhbGVTZXJ2aWNlJztcbmltcG9ydCBpMThuU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL0kxOG5TZXJ2aWNlJztcblxuLy8gSE9DXG5pbXBvcnQgbG9jYWxlQXdhcmUgZnJvbSAnLi9IT0MvbG9jYWxlQXdhcmUnO1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgSGVsbG8gZnJvbSAnLi9jb21wb25lbnRzL0hlbGxvL0hlbGxvJztcbmltcG9ydCBMaXN0IGZyb20gJy4vY29tcG9uZW50cy9MaXN0L0xpc3QnO1xuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuL2NvbXBvbmVudHMvRm9ybUlucHV0L0Zvcm1JbnB1dCc7XG5pbXBvcnQgRm9ybUlucHV0TnVtYmVyIGZyb20gJy4vY29tcG9uZW50cy9Gb3JtSW5wdXROdW1iZXIvRm9ybUlucHV0TnVtYmVyJztcblxuXG5leHBvcnQge1xuICAvLyBVdGlsc1xuICB0ZW1wbGF0ZSxcbiAgb25TY3JlZW5Db25zb2xlLFxuXG4gIC8vIFNlcnZpY2VzXG4gIGxvY2FsZVNlcnZpY2UsXG4gIGkxOG5TZXJ2aWNlLFxuXG4gIC8vIEhPQ1xuICBsb2NhbGVBd2FyZSxcblxuICAvLyBDb21wb25lbnRzXG4gIEhlbGxvLFxuICBMaXN0LFxuICBGb3JtSW5wdXQsXG4gIEZvcm1JbnB1dE51bWJlclxufTtcbiJdfQ==
