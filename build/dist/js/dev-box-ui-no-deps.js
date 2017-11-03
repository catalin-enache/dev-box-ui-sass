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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormInput = require('../FormInput/FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _forceFloat = require('../../utils/internals/forceFloat');

var _forceFloat2 = _interopRequireDefault(_forceFloat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormInputNumber extends _react2.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value.toString()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const receivedValue = nextProps.value.toString();
    const internalValue = this.state.value;
    let valueToStore = Number(internalValue) === Number(receivedValue) ? internalValue : receivedValue;

    if (['-', '+'].includes(internalValue) && receivedValue === '0') {
      valueToStore = internalValue;
    }

    this.setState({
      value: valueToStore
    });
  }

  handleChange(value) {
    const valueToUse = (0, _forceFloat2.default)(value);

    this.setState({
      value: valueToUse
    }, () => {
      this.forceUpdate(); // reason: 123.4 => 1234 / 12.3.4 => 1234(no re-render)

      const usedValue = this.state.value;
      let valueToReport = usedValue;

      if (['-', '+'].includes(valueToReport)) {
        valueToReport = 0;
      }

      const valueAsNumber = Number(valueToReport);

      this.props.onChange(valueAsNumber);
    });
  }

  get value() {
    return this.state.value;
  }

  render() {
    return _react2.default.createElement(_FormInput2.default, _extends({}, this.props, {
      type: 'text',
      value: this.value,
      onChange: this.handleChange
    }));
  }
}

FormInputNumber.defaultProps = {
  value: 0,
  onChange: () => {}
};

FormInputNumber.propTypes = {
  value: _propTypes2.default.number,
  onChange: _propTypes2.default.func
};

exports.default = FormInputNumber;

},{"../../utils/internals/forceFloat":12,"../FormInput/FormInput":5,"prop-types":"prop-types","react":"react"}],7:[function(require,module,exports){
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

},{"../../HOC/localeAware":4,"../../utils/template":14,"../List/List":8,"../World/World":9,"./../../services/I18nService":10,"_process":1,"prop-types":"prop-types","react":"react","react-icons/lib/fa/spinner":3}],8:[function(require,module,exports){
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

},{"../../HOC/localeAware":4,"../../utils/template":14,"./../../services/I18nService":10,"_process":1,"prop-types":"prop-types","react":"react"}],9:[function(require,module,exports){
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
/**
 *
 * @param value String
 * @returns String
 */
function forceFloat(value) {
  let valueToUse = value;
  const indexOfPoint = valueToUse.indexOf('.');
  const lastIndexOfPoint = valueToUse.lastIndexOf('.');
  const hasMoreThanOnePoint = indexOfPoint !== lastIndexOfPoint;

  if (hasMoreThanOnePoint) {
    valueToUse = `${valueToUse.replace(/\./g, '')}.`;
  }

  let firstChar = valueToUse[0] || '';
  let lastChar = (valueToUse.length > 1 ? valueToUse[valueToUse.length - 1] : '') || '';
  let middleChars = valueToUse.substr(1, valueToUse.length - 2) || '';

  if (!firstChar.match(/[\d+-]/)) {
    firstChar = '';
  }

  middleChars = middleChars.replace(/[^\d.]/g, '');

  if (!lastChar.match(/[\d.KkMm]/)) {
    lastChar = '';
  } else if (lastChar.match(/[KkMm]/)) {
    if (middleChars === '.') {
      middleChars = '';
    } else if (middleChars === '' && ['+', '-'].includes(firstChar)) {
      lastChar = '';
    }
  } else if (lastChar === '.' && middleChars === '' && ['+', '-'].includes(firstChar)) {
    lastChar = '';
  }

  valueToUse = [firstChar, middleChars, lastChar].join('');

  if (lastChar.match(/[KkMm]/)) {
    valueToUse = (Number(`${firstChar}${middleChars}`) * (lastChar.match(/[Kk]/) ? 1000 : 1000000)).toString();
  }

  return valueToUse;
}

exports.default = forceFloat;

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./HOC/localeAware":4,"./components/FormInput/FormInput":5,"./components/FormInputNumber/FormInputNumber":6,"./components/Hello/Hello":7,"./components/List/List":8,"./services/I18nService":10,"./services/LocaleService":11,"./utils/onScreenConsole":13,"./utils/template":14}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWljb24tYmFzZS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtaWNvbnMvbGliL2ZhL3NwaW5uZXIuanMiLCJzcmMvbGliL0hPQy9sb2NhbGVBd2FyZS5qcyIsInNyYy9saWIvY29tcG9uZW50cy9Gb3JtSW5wdXQvRm9ybUlucHV0LmpzIiwic3JjL2xpYi9jb21wb25lbnRzL0Zvcm1JbnB1dE51bWJlci9Gb3JtSW5wdXROdW1iZXIuanMiLCJzcmMvbGliL2NvbXBvbmVudHMvSGVsbG8vSGVsbG8uanMiLCJzcmMvbGliL2NvbXBvbmVudHMvTGlzdC9MaXN0LmpzIiwic3JjL2xpYi9jb21wb25lbnRzL1dvcmxkL1dvcmxkLmpzIiwic3JjL2xpYi9zZXJ2aWNlcy9JMThuU2VydmljZS5qcyIsInNyYy9saWIvc2VydmljZXMvTG9jYWxlU2VydmljZS5qcyIsInNyYy9saWIvdXRpbHMvaW50ZXJuYWxzL2ZvcmNlRmxvYXQuanMiLCJzcmMvbGliL3V0aWxzL29uU2NyZWVuQ29uc29sZS5qcyIsInNyYy9saWIvdXRpbHMvdGVtcGxhdGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFzQyxLQUFLLEdBQUwsQ0FBcEQ7QUFDQSxhQUFPLElBQVAsQ0FBWSxLQUFaLEVBQW1CLFFBQVEsSUFBSSxDQUFaLENBQW5CO0FBQ0QsS0FIRDtBQUlBLFdBQU8sT0FBTyxJQUFQLENBQVksRUFBWixDQUFQO0FBQ0QsR0FSRDtBQVNEOzs7Ozs7Ozs7O0FDVkQ7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFKQTtRQVNFLFE7UUFDQSxlO1FBR0EsYTtRQUNBLFc7UUFHQSxXO1FBR0EsSztRQUNBLEk7UUFDQSxTO1FBQ0EsZTs7QUExQkY7OztBQUpBO0FBSkEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG52YXIgSWNvbkJhc2UgPSBmdW5jdGlvbiBJY29uQmFzZShfcmVmLCBfcmVmMikge1xuICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuICB2YXIgY29sb3IgPSBfcmVmLmNvbG9yO1xuICB2YXIgc2l6ZSA9IF9yZWYuc2l6ZTtcbiAgdmFyIHN0eWxlID0gX3JlZi5zdHlsZTtcbiAgdmFyIHdpZHRoID0gX3JlZi53aWR0aDtcbiAgdmFyIGhlaWdodCA9IF9yZWYuaGVpZ2h0O1xuXG4gIHZhciBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2NoaWxkcmVuJywgJ2NvbG9yJywgJ3NpemUnLCAnc3R5bGUnLCAnd2lkdGgnLCAnaGVpZ2h0J10pO1xuXG4gIHZhciBfcmVmMiRyZWFjdEljb25CYXNlID0gX3JlZjIucmVhY3RJY29uQmFzZTtcbiAgdmFyIHJlYWN0SWNvbkJhc2UgPSBfcmVmMiRyZWFjdEljb25CYXNlID09PSB1bmRlZmluZWQgPyB7fSA6IF9yZWYyJHJlYWN0SWNvbkJhc2U7XG5cbiAgdmFyIGNvbXB1dGVkU2l6ZSA9IHNpemUgfHwgcmVhY3RJY29uQmFzZS5zaXplIHx8ICcxZW0nO1xuICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3N2ZycsIF9leHRlbmRzKHtcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgcHJlc2VydmVBc3BlY3RSYXRpbzogJ3hNaWRZTWlkIG1lZXQnLFxuICAgIGhlaWdodDogaGVpZ2h0IHx8IGNvbXB1dGVkU2l6ZSxcbiAgICB3aWR0aDogd2lkdGggfHwgY29tcHV0ZWRTaXplXG4gIH0sIHJlYWN0SWNvbkJhc2UsIHByb3BzLCB7XG4gICAgc3R5bGU6IF9leHRlbmRzKHtcbiAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgY29sb3I6IGNvbG9yIHx8IHJlYWN0SWNvbkJhc2UuY29sb3JcbiAgICB9LCByZWFjdEljb25CYXNlLnN0eWxlIHx8IHt9LCBzdHlsZSlcbiAgfSkpO1xufTtcblxuSWNvbkJhc2UucHJvcFR5cGVzID0ge1xuICBjb2xvcjogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIHNpemU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXJdKSxcbiAgd2lkdGg6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXJdKSxcbiAgaGVpZ2h0OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyXSksXG4gIHN0eWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdFxufTtcblxuSWNvbkJhc2UuY29udGV4dFR5cGVzID0ge1xuICByZWFjdEljb25CYXNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnNoYXBlKEljb25CYXNlLnByb3BUeXBlcylcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEljb25CYXNlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEljb25CYXNlID0gcmVxdWlyZSgncmVhY3QtaWNvbi1iYXNlJyk7XG5cbnZhciBfcmVhY3RJY29uQmFzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEljb25CYXNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEZhU3Bpbm5lciA9IGZ1bmN0aW9uIEZhU3Bpbm5lcihwcm9wcykge1xuICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgX3JlYWN0SWNvbkJhc2UyLmRlZmF1bHQsXG4gICAgICAgIF9leHRlbmRzKHsgdmlld0JveDogJzAgMCA0MCA0MCcgfSwgcHJvcHMpLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdnJyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ20xMS43IDMxLjFxMCAxLjItMC44IDJ0LTIgMC45cS0xLjIgMC0yLTAuOXQtMC45LTJxMC0xLjIgMC45LTJ0Mi0wLjggMiAwLjggMC44IDJ6IG0xMS4yIDQuNnEwIDEuMi0wLjkgMnQtMiAwLjktMi0wLjktMC45LTIgMC45LTIgMi0wLjggMiAwLjggMC45IDJ6IG0tMTUuOC0xNS43cTAgMS4yLTAuOCAydC0yIDAuOS0yLTAuOS0wLjktMiAwLjktMiAyLTAuOSAyIDAuOSAwLjggMnogbTI2LjkgMTEuMXEwIDEuMi0wLjkgMnQtMiAwLjlxLTEuMiAwLTItMC45dC0wLjgtMiAwLjgtMiAyLTAuOCAyIDAuOCAwLjkgMnogbS0yMS41LTIyLjJxMCAxLjUtMS4xIDIuNXQtMi41IDEuMS0yLjUtMS4xLTEuMS0yLjUgMS4xLTIuNSAyLjUtMS4xIDIuNSAxLjEgMS4xIDIuNXogbTI2LjEgMTEuMXEwIDEuMi0wLjkgMnQtMiAwLjktMi0wLjktMC44LTIgMC44LTIgMi0wLjkgMiAwLjkgMC45IDJ6IG0tMTQuMy0xNS43cTAgMS44LTEuMyAzdC0zIDEuMy0zLTEuMy0xLjMtMyAxLjMtMy4xIDMtMS4yIDMgMS4zIDEuMyAzeiBtMTEuOCA0LjZxMCAyLjEtMS41IDMuNXQtMy41IDEuNXEtMi4xIDAtMy41LTEuNXQtMS41LTMuNXEwLTIuMSAxLjUtMy41dDMuNS0xLjVxMi4xIDAgMy41IDEuNXQxLjUgMy41eicgfSlcbiAgICAgICAgKVxuICAgICk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGYVNwaW5uZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGhvaXN0Tm9uUmVhY3RTdGF0aWNzIGZyb20gJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJztcbmltcG9ydCBsb2NhbGVTZXJ2aWNlIGZyb20gJy4vLi4vc2VydmljZXMvTG9jYWxlU2VydmljZSc7XG5pbXBvcnQgaTE4blNlcnZpY2UgZnJvbSAnLi8uLi9zZXJ2aWNlcy9JMThuU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvY2FsZUF3YXJlKENvbXBvbmVudCkge1xuICBjbGFzcyBMb2NhbGVBd2FyZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gICAgICB0aGlzLmhhbmRsZUxvY2FsZUNoYW5nZSA9IHRoaXMuaGFuZGxlTG9jYWxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnVucmVnaXN0ZXJMb2NhbGVDaGFuZ2UgPSBudWxsO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbG9jYWxlOiBsb2NhbGVTZXJ2aWNlLmxvY2FsZVxuICAgICAgfTtcbiAgICAgIHRoaXMuX21vdW50ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2NvbXBvbmVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFuZGxlTG9jYWxlQ2hhbmdlKGxvY2FsZSkge1xuICAgICAgdGhpcy5fbW91bnRlZCAmJiB0aGlzLnN0YXRlLmxvY2FsZSAhPT0gbG9jYWxlICYmIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsb2NhbGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy51bnJlZ2lzdGVyTG9jYWxlQ2hhbmdlID0gbG9jYWxlU2VydmljZS5vbkxvY2FsZUNoYW5nZSh0aGlzLmhhbmRsZUxvY2FsZUNoYW5nZSk7XG4gICAgICB0aGlzLl9tb3VudGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIHRoaXMuX21vdW50ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudW5yZWdpc3RlckxvY2FsZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHsgbG9jYWxlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbXBvbmVudCB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgIGxvY2FsZT17IGxvY2FsZSB9XG4gICAgICAgICAgdHJhbnNsYXRpb25zPXsgaTE4blNlcnZpY2UuY3VycmVudExhbmdUcmFuc2xhdGlvbnMgfVxuICAgICAgICAgIHJlZj17IGNvbXAgPT4gdGhpcy5fY29tcG9uZW50ID0gY29tcCB9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIExvY2FsZUF3YXJlLmRpc3BsYXlOYW1lID0gYExvY2FsZUF3YXJlKCR7XG4gICAgQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8XG4gICAgQ29tcG9uZW50Lm5hbWUgfHxcbiAgICAnQ29tcG9uZW50J1xuICB9KWA7XG5cbiAgcmV0dXJuIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKExvY2FsZUF3YXJlLCBDb21wb25lbnQpO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY24gZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIEZvcm1JbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IHByb3BzLnZhbHVlLnRvU3RyaW5nKClcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB2YWx1ZTogKG5leHRQcm9wcy52YWx1ZSB8fCAnJykudG9TdHJpbmcoKVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKGV2dCkge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGV2dC50YXJnZXQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB2YWx1ZVxuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGFzV2FybmluZywgaGFzRXJyb3IsIC4uLnJlc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaW5wdXRDbGFzc05hbWVzID0gY24oe1xuICAgICAgJ2RidS1mb3JtLWlucHV0JzogdHJ1ZSxcbiAgICAgICdkYnUtd2FybmluZyc6IGhhc1dhcm5pbmcsXG4gICAgICAnZGJ1LWVycm9yJzogaGFzRXJyb3IsXG4gICAgICAnZGJ1LXRoZW1lJzogdHJ1ZSxcbiAgICAgICdkYnUtcGF0Y2gnOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICBkYXRhLWNvbXBvbmVudC1pZD1cIkZvcm1JbnB1dFwiXG4gICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc05hbWVzfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5Gb3JtSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICB0eXBlOiAndGV4dCcsXG4gIHZhbHVlOiAnJyxcbiAgb25DaGFuZ2U6ICgpID0+IHt9XG59O1xuXG5Gb3JtSW5wdXQucHJvcFR5cGVzID0ge1xuICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICBQcm9wVHlwZXMubnVtYmVyXG4gIF0pLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGhhc1dhcm5pbmc6IFByb3BUeXBlcy5ib29sLFxuICBoYXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtSW5wdXQ7XG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Gb3JtSW5wdXQvRm9ybUlucHV0JztcbmltcG9ydCBmb3JjZUZsb2F0IGZyb20gJy4uLy4uL3V0aWxzL2ludGVybmFscy9mb3JjZUZsb2F0JztcblxuY2xhc3MgRm9ybUlucHV0TnVtYmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogcHJvcHMudmFsdWUudG9TdHJpbmcoKVxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCByZWNlaXZlZFZhbHVlID0gbmV4dFByb3BzLnZhbHVlLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgaW50ZXJuYWxWYWx1ZSA9IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgbGV0IHZhbHVlVG9TdG9yZSA9IE51bWJlcihpbnRlcm5hbFZhbHVlKSA9PT0gTnVtYmVyKHJlY2VpdmVkVmFsdWUpID8gaW50ZXJuYWxWYWx1ZSA6IHJlY2VpdmVkVmFsdWU7XG5cbiAgICBpZiAoWyctJywgJysnXS5pbmNsdWRlcyhpbnRlcm5hbFZhbHVlKSAmJiByZWNlaXZlZFZhbHVlID09PSAnMCcpIHtcbiAgICAgIHZhbHVlVG9TdG9yZSA9IGludGVybmFsVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB2YWx1ZTogdmFsdWVUb1N0b3JlXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UodmFsdWUpIHtcbiAgICBjb25zdCB2YWx1ZVRvVXNlID0gZm9yY2VGbG9hdCh2YWx1ZSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlOiB2YWx1ZVRvVXNlXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpOyAvLyByZWFzb246IDEyMy40ID0+IDEyMzQgLyAxMi4zLjQgPT4gMTIzNChubyByZS1yZW5kZXIpXG5cbiAgICAgIGNvbnN0IHVzZWRWYWx1ZSA9IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgICBsZXQgdmFsdWVUb1JlcG9ydCA9IHVzZWRWYWx1ZTtcblxuICAgICAgaWYgKFsnLScsICcrJ10uaW5jbHVkZXModmFsdWVUb1JlcG9ydCkpIHtcbiAgICAgICAgdmFsdWVUb1JlcG9ydCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbHVlQXNOdW1iZXIgPSBOdW1iZXIodmFsdWVUb1JlcG9ydCk7XG5cbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWVBc051bWJlcik7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxGb3JtSW5wdXRcbiAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgdmFsdWU9e3RoaXMudmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5Gb3JtSW5wdXROdW1iZXIuZGVmYXVsdFByb3BzID0ge1xuICB2YWx1ZTogMCxcbiAgb25DaGFuZ2U6ICgpID0+IHt9XG59O1xuXG5Gb3JtSW5wdXROdW1iZXIucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtSW5wdXROdW1iZXI7XG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhU3Bpbm5lciBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvc3Bpbm5lcic7XG5pbXBvcnQgTGlzdCBmcm9tICcuLi9MaXN0L0xpc3QnO1xuaW1wb3J0IFdvcmxkIGZyb20gJy4uL1dvcmxkL1dvcmxkJztcbmltcG9ydCBsb2NhbGVBd2FyZSBmcm9tICcuLi8uLi9IT0MvbG9jYWxlQXdhcmUnO1xuaW1wb3J0IGkxOG5TZXJ2aWNlIGZyb20gJy4vLi4vLi4vc2VydmljZXMvSTE4blNlcnZpY2UnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlJztcblxuaTE4blNlcnZpY2UucmVnaXN0ZXJUcmFuc2xhdGlvbnMoe1xuICBlbjoge1xuICAgIEhlbGxvOiB0ZW1wbGF0ZWBIZWxsbyAkeydhZ2UnfSAkeyduYW1lJ31gXG4gIH0sXG4gIHNwOiB7XG4gICAgSGVsbG86IHRlbXBsYXRlYEhvbGEgJHsnYWdlJ30gJHsnbmFtZSd9YFxuICB9XG59KTtcblxuY29uc3QgbGlzdEl0ZW1zID0gWydvbmUnLCAndHdvJ107XG5cblxuY2xhc3MgSGVsbG8gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBIZWxsbyBjb21wb25lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0cmFuc2xhdGlvbnMuSGVsbG8oeyBhZ2U6IDIyLCBuYW1lOiB0aGlzLnByb3BzLm5hbWUgfHwgJ05vYm9keScgfSl9XG4gICAgICAgIDxGYVNwaW5uZXIgLz5cbiAgICAgICAgPExpc3QgaXRlbXM9eyBsaXN0SXRlbXMgfS8+XG4gICAgICAgIDxMaXN0IGl0ZW1zPXsgbGlzdEl0ZW1zIH0vPlxuICAgICAgICA8V29ybGQgLz5cbiAgICAgICAgPFdvcmxkIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhlbGxvLnByb3BUeXBlcyA9IHtcbiAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvY2FsZUF3YXJlKEhlbGxvKTtcblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbG9jYWxlQXdhcmUgZnJvbSAnLi4vLi4vSE9DL2xvY2FsZUF3YXJlJztcbmltcG9ydCBpMThuU2VydmljZSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL0kxOG5TZXJ2aWNlJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZSc7XG5cbmkxOG5TZXJ2aWNlLnJlZ2lzdGVyVHJhbnNsYXRpb25zKHtcbiAgZW46IHtcbiAgICBsaXN0OiB0ZW1wbGF0ZWBsaXN0YFxuICB9LFxuICBzcDoge1xuICAgIGxpc3Q6IHRlbXBsYXRlYGxpc3RhYFxuICB9XG59KTtcblxuY2xhc3MgTGlzdCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8qIGVzbGludCBuby1jb25zb2xlOiAwICovXG4gICAgICAvLyBjb25zb2xlLmxvZygncmVuZGVyaW5nIExpc3QgY29tcG9uZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5wcm9wcy50cmFuc2xhdGlvbnMubGlzdCgpfVxuICAgICAgICA8dWw+XG4gICAgICAgICAge3RoaXMucHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4gPGxpIGtleT17aXRlbX0+e2l0ZW19PC9saT4pfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5MaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgaXRlbXM6IFtdXG59O1xuXG5MaXN0LnByb3BUeXBlcyA9IHtcbiAgaXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2NhbGVBd2FyZShMaXN0KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IExpc3QgZnJvbSAnLi4vTGlzdC9MaXN0JztcblxuY2xhc3MgV29ybGQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbmRlcmluZyBIZWxsbyBjb21wb25lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIFdvcmxkIC0tLS0tLS0tLS0tLVxuICAgICAgICA8TGlzdCBpdGVtcz17WydmaXZlJywgJ3NpeCddfS8+XG4gICAgICAgIDxMaXN0IGl0ZW1zPXtbJ2ZpdmUnLCAnc2l4J119Lz5cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbldvcmxkLnByb3BUeXBlcyA9IHtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvcmxkO1xuXG4iLCJpbXBvcnQgbG9jYWxlU2VydmljZSBmcm9tICcuL0xvY2FsZVNlcnZpY2UnO1xuXG5jb25zdCBlbXB0eU9iaiA9IHt9O1xuXG5jbGFzcyBJMThuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxvY2FsZVNlcnZpY2Uub25Mb2NhbGVDaGFuZ2UodGhpcy5faGFuZGxlTG9jYWxlQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2xvY2FsZSA9IGxvY2FsZVNlcnZpY2UubG9jYWxlO1xuICAgIHRoaXMuX3RyYW5zbGF0aW9ucyA9IHt9O1xuICB9XG5cbiAgX2hhbmRsZUxvY2FsZUNoYW5nZShsb2NhbGUpIHtcbiAgICB0aGlzLl9sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICBjbGVhclRyYW5zbGF0aW9ucyhsYW5nKSB7XG4gICAgZGVsZXRlIHRoaXMuX3RyYW5zbGF0aW9uc1tsYW5nXTtcbiAgfVxuXG4gIHJlZ2lzdGVyVHJhbnNsYXRpb25zKHRyYW5zbGF0aW9ucykge1xuICAgIHRoaXMuX3RyYW5zbGF0aW9ucyA9IE9iamVjdC5rZXlzKHRyYW5zbGF0aW9ucykucmVkdWNlKChhY2MsIGxhbmcpID0+IHtcbiAgICAgIGFjY1tsYW5nXSA9IHtcbiAgICAgICAgLi4udGhpcy5fdHJhbnNsYXRpb25zW2xhbmddLFxuICAgICAgICAuLi50cmFuc2xhdGlvbnNbbGFuZ11cbiAgICAgIH07XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRoaXMuX3RyYW5zbGF0aW9ucyk7XG4gIH1cblxuICB0cmFuc2xhdGUobXNnKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudExhbmdUcmFuc2xhdGlvbnNbbXNnXTtcbiAgfVxuXG4gIGdldCB0cmFuc2xhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0aW9ucztcbiAgfVxuXG4gIGdldCBjdXJyZW50TGFuZ1RyYW5zbGF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNsYXRpb25zW3RoaXMuX2xvY2FsZS5sYW5nXSB8fCBlbXB0eU9iajtcbiAgfVxufVxuXG5jb25zdCBpMThuU2VydmljZSA9IG5ldyBJMThuU2VydmljZSgpO1xuZXhwb3J0IGRlZmF1bHQgaTE4blNlcnZpY2U7XG4iLCJcbmNvbnN0IGRlZmF1bHRMb2NhbGUgPSB7XG4gIGRpcjogJ2x0cicsXG4gIGxhbmc6ICdlbidcbn07XG5cbmNsYXNzIExvY2FsZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MgPSBbXTtcbiAgICB0aGlzLl9sb2NhbGVBdHRycyA9IE9iamVjdC5rZXlzKGRlZmF1bHRMb2NhbGUpO1xuICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB0aGlzLl9sb2NhbGVBdHRycy5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKSkge1xuICAgICAgICB0aGlzLl9yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgZGVmYXVsdExvY2FsZVthdHRyXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fbG9jYWxlID0gdGhpcy5fbG9jYWxlQXR0cnMucmVkdWNlKChhY2MsIGF0dHIpID0+IHtcbiAgICAgIGFjY1thdHRyXSA9IHRoaXMuX3Jvb3RFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICAgIHRoaXMuX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5faGFuZGxlTXV0YXRpb25zLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX29ic2VydmVyLm9ic2VydmUodGhpcy5fcm9vdEVsZW1lbnQsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIF9oYW5kbGVNdXRhdGlvbnMobXV0YXRpb25zKSB7XG4gICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XG4gICAgICBjb25zdCBtdXRhdGlvbkF0dHJpYnV0ZU5hbWUgPSBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lO1xuICAgICAgaWYgKHRoaXMuX2xvY2FsZUF0dHJzLmluY2x1ZGVzKG11dGF0aW9uQXR0cmlidXRlTmFtZSkpIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlID0ge1xuICAgICAgICAgIC4uLnRoaXMuX2xvY2FsZSxcbiAgICAgICAgICBbbXV0YXRpb25BdHRyaWJ1dGVOYW1lXTogdGhpcy5fcm9vdEVsZW1lbnQuZ2V0QXR0cmlidXRlKG11dGF0aW9uQXR0cmlidXRlTmFtZSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGhpcy5fbG9jYWxlKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXQgbG9jYWxlKGxvY2FsZU9iaikge1xuICAgIE9iamVjdC5rZXlzKGxvY2FsZU9iaikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzLl9yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBsb2NhbGVPYmpba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgbG9jYWxlKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG4gIH1cblxuICBvbkxvY2FsZUNoYW5nZShjYWxsYmFjaykge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICBjYWxsYmFjayh0aGlzLmxvY2FsZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcy5maWx0ZXIoY2IgPT4gY2IgIT09IGNhbGxiYWNrKTtcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IGxvY2FsZVNlcnZpY2UgPSBuZXcgTG9jYWxlU2VydmljZSgpO1xuZXhwb3J0IGRlZmF1bHQgbG9jYWxlU2VydmljZTtcbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBTdHJpbmdcbiAqIEByZXR1cm5zIFN0cmluZ1xuICovXG5mdW5jdGlvbiBmb3JjZUZsb2F0KHZhbHVlKSB7XG4gIGxldCB2YWx1ZVRvVXNlID0gdmFsdWU7XG4gIGNvbnN0IGluZGV4T2ZQb2ludCA9IHZhbHVlVG9Vc2UuaW5kZXhPZignLicpO1xuICBjb25zdCBsYXN0SW5kZXhPZlBvaW50ID0gdmFsdWVUb1VzZS5sYXN0SW5kZXhPZignLicpO1xuICBjb25zdCBoYXNNb3JlVGhhbk9uZVBvaW50ID0gaW5kZXhPZlBvaW50ICE9PSBsYXN0SW5kZXhPZlBvaW50O1xuXG4gIGlmIChoYXNNb3JlVGhhbk9uZVBvaW50KSB7XG4gICAgdmFsdWVUb1VzZSA9IGAke3ZhbHVlVG9Vc2UucmVwbGFjZSgvXFwuL2csICcnKX0uYDtcbiAgfVxuXG4gIGxldCBmaXJzdENoYXIgPSB2YWx1ZVRvVXNlWzBdIHx8ICcnO1xuICBsZXQgbGFzdENoYXIgPSAodmFsdWVUb1VzZS5sZW5ndGggPiAxID8gdmFsdWVUb1VzZVt2YWx1ZVRvVXNlLmxlbmd0aCAtIDFdIDogJycpIHx8ICcnO1xuICBsZXQgbWlkZGxlQ2hhcnMgPSB2YWx1ZVRvVXNlLnN1YnN0cigxLCB2YWx1ZVRvVXNlLmxlbmd0aCAtIDIpIHx8ICcnO1xuXG4gIGlmICghZmlyc3RDaGFyLm1hdGNoKC9bXFxkKy1dLykpIHtcbiAgICBmaXJzdENoYXIgPSAnJztcbiAgfVxuXG4gIG1pZGRsZUNoYXJzID0gbWlkZGxlQ2hhcnMucmVwbGFjZSgvW15cXGQuXS9nLCAnJyk7XG5cbiAgaWYgKCFsYXN0Q2hhci5tYXRjaCgvW1xcZC5La01tXS8pKSB7XG4gICAgbGFzdENoYXIgPSAnJztcbiAgfSBlbHNlIGlmIChsYXN0Q2hhci5tYXRjaCgvW0trTW1dLykpIHtcbiAgICBpZiAobWlkZGxlQ2hhcnMgPT09ICcuJykge1xuICAgICAgbWlkZGxlQ2hhcnMgPSAnJztcbiAgICB9IGVsc2UgaWYgKG1pZGRsZUNoYXJzID09PSAnJyAmJiBbJysnLCAnLSddLmluY2x1ZGVzKGZpcnN0Q2hhcikpIHtcbiAgICAgIGxhc3RDaGFyID0gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKGxhc3RDaGFyID09PSAnLicgJiYgbWlkZGxlQ2hhcnMgPT09ICcnICYmIFsnKycsICctJ10uaW5jbHVkZXMoZmlyc3RDaGFyKSkge1xuICAgIGxhc3RDaGFyID0gJyc7XG4gIH1cblxuICB2YWx1ZVRvVXNlID0gW2ZpcnN0Q2hhciwgbWlkZGxlQ2hhcnMsIGxhc3RDaGFyXS5qb2luKCcnKTtcblxuICBpZiAobGFzdENoYXIubWF0Y2goL1tLa01tXS8pKSB7XG4gICAgdmFsdWVUb1VzZSA9IChOdW1iZXIoYCR7Zmlyc3RDaGFyfSR7bWlkZGxlQ2hhcnN9YCkgKiAobGFzdENoYXIubWF0Y2goL1tLa10vKSA/IDEwMDAgOiAxMDAwMDAwKSkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZVRvVXNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JjZUZsb2F0O1xuIiwiXG5jb25zdCBidXR0b25IZWlnaHQgPSAnMjVweCc7XG5jb25zdCBidXR0b25TdGFydCA9ICc1cHgnO1xuY29uc3QgYnV0dG9uVG9wID0gJzVweCc7XG5cbmxldCBjb25zb2xlTWVzc2FnZXMgPSBbXTtcbmNvbnN0IGNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuY29uc3QgY29uc29sZU9yaWdpbmFsID0ge307XG5cbmZ1bmN0aW9uIGNhcHR1cmVDb25zb2xlKGNvbnNvbGVFbG0sIG9wdGlvbnMpIHtcbiAgY29uc3QgeyBpbmRlbnQgPSAyLCBzaG93TGFzdE9ubHkgPSBmYWxzZSB9ID0gb3B0aW9ucztcbiAgY29uc3QgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgaWYgKHNob3dMYXN0T25seSkge1xuICAgICAgY29uc29sZU1lc3NhZ2VzID0gW3sgW2FjdGlvbl06IGFyZ3MgfV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGVNZXNzYWdlcy5wdXNoKHsgW2FjdGlvbl06IGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgY29uc29sZUVsbS5pbm5lckhUTUwgPSBjb25zb2xlTWVzc2FnZXMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0gT2JqZWN0LmtleXMoZW50cnkpWzBdO1xuICAgICAgY29uc3QgdmFsdWVzID0gZW50cnlbYWN0aW9uXTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB2YWx1ZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgW3VuZGVmaW5lZCwgbnVsbF0uaW5jbHVkZXMoaXRlbSkgfHxcbiAgICAgICAgICBbJ251bWJlcicsICdzdHJpbmcnLCAnZnVuY3Rpb24nXS5pbmNsdWRlcyh0eXBlb2YgaXRlbSlcbiAgICAgICAgKSA/XG4gICAgICAgICAgaXRlbSA6XG4gICAgICAgICAgWydNYXAnLCAnU2V0J10uaW5jbHVkZXMoaXRlbS5jb25zdHJ1Y3Rvci5uYW1lKSA/XG4gICAgICAgICAgICBgJHtpdGVtLmNvbnN0cnVjdG9yLm5hbWV9ICgke0pTT04uc3RyaW5naWZ5KFsuLi5pdGVtXSl9KWAgOlxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoaXRlbSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgdmFsdWUpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSwgaW5kZW50KTtcbiAgICAgIH0pLmpvaW4oJywgJyk7XG5cbiAgICAgIGNvbnN0IGNvbG9yID0ge1xuICAgICAgICBsb2c6ICcjMDAwJyxcbiAgICAgICAgd2FybjogJ29yYW5nZScsXG4gICAgICAgIGVycm9yOiAnZGFya3JlZCdcbiAgICAgIH1bYWN0aW9uXTtcblxuICAgICAgcmV0dXJuIGA8cHJlIHN0eWxlPVwiY29sb3I6ICR7Y29sb3J9XCI+JHttZXNzYWdlfTwvcHJlPmA7XG4gICAgfSkuam9pbignXFxuJyk7XG4gIH07XG4gIFsnbG9nJywgJ3dhcm4nLCAnZXJyb3InXS5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICBjb25zb2xlT3JpZ2luYWxbYWN0aW9uXSA9IGNvbnNvbGVbYWN0aW9uXTtcbiAgICBjb25zb2xlW2FjdGlvbl0gPSBoYW5kbGVyLmJpbmQoY29uc29sZSwgYWN0aW9uKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldnQpID0+IHtcbiAgICAvLyBlc2xpbnQgbm8tY29uc29sZTogMFxuICAgIGNvbnNvbGUuZXJyb3IoYFwiJHtldnQubWVzc2FnZX1cIiBmcm9tICR7ZXZ0LmZpbGVuYW1lfToke2V2dC5saW5lbm99YCk7XG4gICAgY29uc29sZS5lcnJvcihldnQsIGV2dC5lcnJvci5zdGFjayk7XG4gICAgLy8gZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuICBjb25zb2xlTG9nKCdjb25zb2xlIGNhcHR1cmVkJyk7XG4gIHJldHVybiBmdW5jdGlvbiByZWxlYXNlQ29uc29sZSgpIHtcbiAgICBbJ2xvZycsICd3YXJuJywgJ2Vycm9yJ10uZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICBjb25zb2xlW2FjdGlvbl0gPSBjb25zb2xlT3JpZ2luYWxbYWN0aW9uXTtcbiAgICB9KTtcbiAgICBjb25zb2xlTG9nKCdjb25zb2xlIHJlbGVhc2VkJyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnNvbGUoe1xuICBvcHRpb25zLFxuICBjb25zb2xlU3R5bGU6IHtcbiAgICBidG5TdGFydCA9IGJ1dHRvblN0YXJ0LCBidG5IZWlnaHQgPSBidXR0b25IZWlnaHQsXG4gICAgd2lkdGggPSBgY2FsYygxMDB2dyAtICR7YnRuU3RhcnR9IC0gMzBweClgLCBoZWlnaHQgPSAnNDAwcHgnLFxuICAgIGJhY2tncm91bmQgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xuICB9XG59KSB7XG4gIGNvbnN0IHsgcnRsID0gZmFsc2UgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGNvbnNvbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc29sZS5pZCA9ICdEQlVvblNjcmVlbkNvbnNvbGUnO1xuICBjb25zb2xlLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICB3aWR0aDogJHt3aWR0aH07XG4gICAgaGVpZ2h0OiAke2hlaWdodH07XG4gICAgdG9wOiAke2J0bkhlaWdodH07XG4gICAgJHtydGwgPyAncmlnaHQnIDogJ2xlZnQnfTogMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7YmFja2dyb3VuZH07XG4gICAgei1pbmRleDogOTk5OTtcbiAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2hcbiAgICBgO1xuICByZXR1cm4gY29uc29sZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHtcbiAgb3B0aW9ucyxcbiAgYnV0dG9uU3R5bGU6IHtcbiAgICBwb3NpdGlvbiA9ICdmaXhlZCcsXG4gICAgd2lkdGggPSAnMjVweCcsIGhlaWdodCA9IGJ1dHRvbkhlaWdodCwgdG9wID0gYnV0dG9uVG9wLCBzdGFydCA9IGJ1dHRvblN0YXJ0LFxuICAgIGJhY2tncm91bmQgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xuICB9XG59KSB7XG4gIGNvbnN0IHsgcnRsID0gZmFsc2UgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBidXR0b24uaWQgPSAnREJVb25TY3JlZW5Db25zb2xlVG9nZ2xlcic7XG4gIGJ1dHRvbi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcbiAgICB3aWR0aDogJHt3aWR0aH07XG4gICAgaGVpZ2h0OiAke2hlaWdodH07XG4gICAgdG9wOiAke3RvcH07XG4gICAgJHtydGwgPyAncmlnaHQnIDogJ2xlZnQnfTogJHtzdGFydH07XG4gICAgYmFja2dyb3VuZDogJHtiYWNrZ3JvdW5kfTtcbiAgICB6LWluZGV4OiA5OTk5O1xuICAgIGA7XG4gIHJldHVybiBidXR0b247XG59XG5cbi8qKlxub25TY3JlZW5Db25zb2xlKHtcbiAgYnV0dG9uU3R5bGUgPSB7IHBvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0LCB0b3AsIHN0YXJ0LCBiYWNrZ3JvdW5kIH0sXG4gIGNvbnNvbGVTdHlsZSA9IHsgd2lkdGgsIGhlaWdodCwgYmFja2dyb3VuZCB9LFxuICBvcHRpb25zID0geyBydGw6IGZhbHNlLCBpbmRlbnQsIHNob3dMYXN0T25seSB9XG59KVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uU2NyZWVuQ29uc29sZSh7XG4gIGJ1dHRvblN0eWxlID0ge30sXG4gIGNvbnNvbGVTdHlsZSA9IHt9LFxuICBvcHRpb25zID0ge31cbn0gPSB7fSkge1xuICBjb25zdCBidXR0b24gPSBjcmVhdGVCdXR0b24oe1xuICAgIG9wdGlvbnMsXG4gICAgYnV0dG9uU3R5bGVcbiAgfSk7XG4gIGNvbnN0IGNvbnNvbGUgPSBjcmVhdGVDb25zb2xlKHtcbiAgICBjb25zb2xlU3R5bGU6IHtcbiAgICAgIC4uLmNvbnNvbGVTdHlsZSxcbiAgICAgIGJ0bkhlaWdodDogYnV0dG9uU3R5bGUuaGVpZ2h0LFxuICAgICAgYnRuU3RhcnQ6IGJ1dHRvblN0eWxlLnN0YXJ0XG4gICAgfSxcbiAgICBvcHRpb25zXG4gIH0pO1xuXG4gIGNvbnNvbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoIWJ1dHRvbi5jb250YWlucyhjb25zb2xlKSkge1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGNvbnNvbGUpO1xuICAgICAgY29uc29sZS5zY3JvbGxUb3AgPSBjb25zb2xlLnNjcm9sbEhlaWdodCAtIGNvbnNvbGUuY2xpZW50SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b24ucmVtb3ZlQ2hpbGQoY29uc29sZSk7XG4gICAgfVxuICB9KTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIGNvbnN0IHJlbGVhc2VDb25zb2xlID0gY2FwdHVyZUNvbnNvbGUoY29uc29sZSwgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbGVhc2UoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChidXR0b24pO1xuICAgIHJlbGVhc2VDb25zb2xlKCk7XG4gIH07XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRlbXBsYXRlKHN0cmluZ3MsIC4uLmtleXMpIHtcbiAgcmV0dXJuICgoLi4udmFsdWVzKSA9PiB7XG4gICAgY29uc3QgZGljdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV0gfHwge307XG4gICAgY29uc3QgcmVzdWx0ID0gW3N0cmluZ3NbMF1dO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5LCBpKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5pc0ludGVnZXIoa2V5KSA/IHZhbHVlc1trZXldIDogZGljdFtrZXldO1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUsIHN0cmluZ3NbaSArIDFdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICB9KTtcbn1cbiIsIi8vIFV0aWxzXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi91dGlscy90ZW1wbGF0ZSc7XG5pbXBvcnQgb25TY3JlZW5Db25zb2xlIGZyb20gJy4vdXRpbHMvb25TY3JlZW5Db25zb2xlJztcblxuLy8gU2VydmljZXNcbmltcG9ydCBsb2NhbGVTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvTG9jYWxlU2VydmljZSc7XG5pbXBvcnQgaTE4blNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9JMThuU2VydmljZSc7XG5cbi8vIEhPQ1xuaW1wb3J0IGxvY2FsZUF3YXJlIGZyb20gJy4vSE9DL2xvY2FsZUF3YXJlJztcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IEhlbGxvIGZyb20gJy4vY29tcG9uZW50cy9IZWxsby9IZWxsbyc7XG5pbXBvcnQgTGlzdCBmcm9tICcuL2NvbXBvbmVudHMvTGlzdC9MaXN0JztcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi9jb21wb25lbnRzL0Zvcm1JbnB1dC9Gb3JtSW5wdXQnO1xuaW1wb3J0IEZvcm1JbnB1dE51bWJlciBmcm9tICcuL2NvbXBvbmVudHMvRm9ybUlucHV0TnVtYmVyL0Zvcm1JbnB1dE51bWJlcic7XG5cblxuZXhwb3J0IHtcbiAgLy8gVXRpbHNcbiAgdGVtcGxhdGUsXG4gIG9uU2NyZWVuQ29uc29sZSxcblxuICAvLyBTZXJ2aWNlc1xuICBsb2NhbGVTZXJ2aWNlLFxuICBpMThuU2VydmljZSxcblxuICAvLyBIT0NcbiAgbG9jYWxlQXdhcmUsXG5cbiAgLy8gQ29tcG9uZW50c1xuICBIZWxsbyxcbiAgTGlzdCxcbiAgRm9ybUlucHV0LFxuICBGb3JtSW5wdXROdW1iZXJcbn07XG4iXX0=
