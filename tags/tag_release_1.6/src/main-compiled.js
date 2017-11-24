'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

require('../theme/index.css');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _elementUi = require('element-ui');

var _elementUi2 = _interopRequireDefault(_elementUi);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

var _vueBaiduMap = require('vue-baidu-map');

var _vueBaiduMap2 = _interopRequireDefault(_vueBaiduMap);

var _vueQuillEditor = require('vue-quill-editor');

var _vueQuillEditor2 = _interopRequireDefault(_vueQuillEditor);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _vueLazyload = require('vue-lazyload');

var _vueLazyload2 = _interopRequireDefault(_vueLazyload);

require('element-ui/lib/theme-default/index.css');

require('@/assets/css/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = false;
_vue2.default.config.debug = false;

_vue2.default.use(_elementUi2.default);
_vue2.default.use(_vueResource2.default);
_vue2.default.use(_vueLazyload2.default);

_vue2.default.prototype.$axios = _axios2.default;
_axios2.default.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error.response.status);
  if (error.response.status === 401) {
    _router2.default.push('/login');
    return;
  }
  if (error.response.status === 500) {
    _elementUi2.default.Message.error('服务器出错啦，请联系技术人员！');
    return;
  }

  return _promise2.default.reject(error);
});

_vue2.default.use(_vueQuillEditor2.default);

_vue2.default.use(_vueBaiduMap2.default, { ak: 'EH07OrMrG9wr6sK9mqRa8meYx3MSGgep' });

new _vue2.default({
  el: '#app',
  router: _router2.default,
  store: _store2.default,
  template: '<App/>',
  components: { App: _App2.default },
  watch: {
    '$route': 'checkLogin'
  },
  created: function created() {
    this.checkLogin();
  },

  methods: {
    checkLogin: function checkLogin() {
      if (!this.$store.state.token) {
        this.$router.push('/login');
      } else {}
    }
  }
});

_router2.default.beforeEach(function (to, from, next) {
  if (to.matched.some(function (record) {
    return record.meta.requiresAuth;
  })) {
    var check = to.matched.some(function (record) {
      var menu = record.meta.accessMenu;
      var result = false;
      if (_store2.default.state.role.indexOf('superadmin') > 0) {
        result = true;
      } else if (_store2.default.state.menus.indexOf(menu) > 0) {
        result = true;
      }
      return result;
    });
    if (!check) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

//# sourceMappingURL=main-compiled.js.map