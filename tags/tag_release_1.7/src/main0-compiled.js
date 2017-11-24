'use strict';

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

require('element-ui/lib/theme-default/index.css');

require('@/assets/css/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = false;

_vue2.default.use(_elementUi2.default);
_vue2.default.use(_vueResource2.default);

_vue2.default.prototype.$axios = _axios2.default;
_vue2.default.use(_vueQuillEditor2.default);

_vue2.default.use(_vueBaiduMap2.default, { ak: 'EH07OrMrG9wr6sK9mqRa8meYx3MSGgep' });

_vue2.default.prototype.setCookie = function (cName, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = cName + '=' + escape(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
};

function getCookie(name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  var arr = document.cookie.match(reg);
  if (arr) {
    return arr[2];
  } else {
    return null;
  }
}
_vue2.default.prototype.getCookie = getCookie;

_vue2.default.prototype.delCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
  }
};

new _vue2.default({
  el: '#app',
  router: _router2.default,
  store: _store2.default,
  template: '<App/>',
  components: { App: _App2.default },
  created: function created() {
    this.checkLogin();
  },

  methods: {
    checkLogin: function checkLogin() {
      if (!this.getCookie('session')) {
        this.$router.push('/login');
      } else {}
    }
  }
});

//# sourceMappingURL=main0-compiled.js.map