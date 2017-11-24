'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _getters = require('./getters');

var getters = _interopRequireWildcard(_getters);

var _cart = require('./modules/cart');

var _cart2 = _interopRequireDefault(_cart);

var _products = require('./modules/products');

var _products2 = _interopRequireDefault(_products);

var _logger = require('../../../src/plugins/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var debug = process.env.NODE_ENV !== 'production';

exports.default = new _vuex2.default.Store({
  actions: actions,
  getters: getters,
  modules: {
    cart: _cart2.default,
    products: _products2.default
  },
  strict: debug,
  plugins: debug ? [(0, _logger2.default)()] : []
});

//# sourceMappingURL=index-compiled.js.map