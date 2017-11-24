'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var APP_URL = exports.APP_URL = 'http://slb.sobolong.cn:8888';
var API_URL = exports.API_URL = APP_URL + '/api';

var MEMBER_LIST_URL = exports.MEMBER_LIST_URL = API_URL + '/admin/member/list/0';
var MEMBER_EDIT_URL = exports.MEMBER_EDIT_URL = API_URL + '/admin/member/edit';
var MEMBER_STATUS_URL = exports.MEMBER_STATUS_URL = API_URL + '/admin/member/status';
var MEMBER_DISABLED_LIST_URL = exports.MEMBER_DISABLED_LIST_URL = API_URL + '/admin/member/list/1';
var MEMBER_BANKCARD_LIST_URL = exports.MEMBER_BANKCARD_LIST_URL = API_URL + '/admin/bankcard/list';
var MEMBER_SEARCH_URL = exports.MEMBER_SEARCH_URL = API_URL + '/admin/member/search';
var BANKCARD_SEARCH_URL = exports.BANKCARD_SEARCH_URL = API_URL + '/admin/bankcard/search';

var MEMBER_INTEGRAL_LIST = exports.MEMBER_INTEGRAL_LIST = API_URL + '/admin/member/integral/list';

var MERCHANT_APPLY_LIST = exports.MERCHANT_APPLY_LIST = API_URL + '/admin/merchant/apply/list';
var MERCHANT_APPLY_INFO = exports.MERCHANT_APPLY_INFO = API_URL + '/admin/merchant/apply/info';
var MERCHANT_APPLY_EDIT = exports.MERCHANT_APPLY_EDIT = API_URL + '/admin/merchant/apply/edit';
var MERCHANT_APPLY_IMAGE_UPLOAD = exports.MERCHANT_APPLY_IMAGE_UPLOAD = API_URL + '/admin/merchant/apply/image/upload';
var MERCHANT_APPLY_IMAGE_DEL = exports.MERCHANT_APPLY_IMAGE_DEL = API_URL + '/admin/merchant/apply/image/delete';
var MERCHANT_APPLY_SEARCH = exports.MERCHANT_APPLY_SEARCH = API_URL + '/admin/merchant/apply/search';

var MERCHANT_AUDIT_LIST = exports.MERCHANT_AUDIT_LIST = API_URL + '/admin/merchant/audit/list';
var MERCHANT_AUDIT_INFO = exports.MERCHANT_AUDIT_INFO = API_URL + '/admin/merchant/audit/info';
var MERCHANT_AUDIT_EDIT = exports.MERCHANT_AUDIT_EDIT = API_URL + '/admin/merchant/audit/edit';
var MERCHANT_AUDIT_SEARCH = exports.MERCHANT_AUDIT_SEARCH = API_URL + '/admin/merchant/audit/search';

var MERCHANT_LIST = exports.MERCHANT_LIST = API_URL + '/admin/merchant/list';
var MERCHANT_DISABLED_LIST = exports.MERCHANT_DISABLED_LIST = API_URL + '/admin/merchant/list/2';
var MERCHANT_REFUSED_LIST = exports.MERCHANT_REFUSED_LIST = API_URL + '/admin/merchant/audit/2';
var MERCHANT_STATUS = exports.MERCHANT_STATUS = API_URL + '/admin/merchant/status';
var MERCHANT_INFO = exports.MERCHANT_INFO = API_URL + '/admin/merchant/info';
var MERCHANT_EDIT_URL = exports.MERCHANT_EDIT_URL = API_URL + '/admin/merchant/edit';
var MERCHANT_SEARCH_URL = exports.MERCHANT_SEARCH_URL = API_URL + '/admin/merchant/search';

var MERCHANT_IMAGE_UPLOAD_URL = exports.MERCHANT_IMAGE_UPLOAD_URL = API_URL + '/admin/merchant/image/upload';
var MERCHANT_SLIDER_IMG_URL = exports.MERCHANT_SLIDER_IMG_URL = API_URL + '/admin/merchant/slider/upload';
var MERCHANT_IMAGE_DEL_URL = exports.MERCHANT_IMAGE_DEL_URL = API_URL + '/admin/merchant/image/delete';
var MERCHANT_SLIDER_DEL_URL = exports.MERCHANT_SLIDER_DEL_URL = API_URL + '/admin/merchant/slider/delete';

var MERCHANT_WAIT_ONLINE = exports.MERCHANT_WAIT_ONLINE = API_URL + '/admin/merchant/wait/online';
var MERCHANT_WAIT_ONLINE_INFO = exports.MERCHANT_WAIT_ONLINE_INFO = API_URL + '/admin/merchant/wait/online/info';
var MERCHANT_ONLINE = exports.MERCHANT_ONLINE = API_URL + '/admin/merchant/online';
var MERCHANT_WAIT_ONLINE_IMAGE_UPLOAD = exports.MERCHANT_WAIT_ONLINE_IMAGE_UPLOAD = API_URL + '/admin/merchant/wait/online/image/upload';
var MERCHANT_WAIT_ONLINE_SLIDER_IMG = exports.MERCHANT_WAIT_ONLINE_SLIDER_IMG = API_URL + '/admin/merchant/wait/online/slider/upload';
var MERCHANT_WAIT_ONLINE_IMAGE_DEL = exports.MERCHANT_WAIT_ONLINE_IMAGE_DEL = API_URL + '/admin/merchant/wait/online/image/delete';
var MERCHANT_WAIT_ONLINE_SLIDER_DEL = exports.MERCHANT_WAIT_ONLINE_SLIDER_DEL = API_URL + '/admin/merchant/wait/online/slider/delete';

var MEMBER_RECHARGE_LIST = exports.MEMBER_RECHARGE_LIST = API_URL + '/admin/member/recharge/list';
var MEMBER_RECHARGE = exports.MEMBER_RECHARGE = API_URL + '/admin/member/recharge';
var MEMBER_RECHARGE_USERINFO = exports.MEMBER_RECHARGE_USERINFO = API_URL + '/admin/member/recharge/userinfo';
var MEMBER_RECHARGE_SEARCH = exports.MEMBER_RECHARGE_SEARCH = API_URL + '/admin/member/recharge/search';

var WITHDRAW_LIST_URL = exports.WITHDRAW_LIST_URL = API_URL + '/admin/withdraw/list';
var WITHDRAW_APPLY_URL = exports.WITHDRAW_APPLY_URL = API_URL + '/admin/withdraw/apply';
var WITHDRAW_STATUS_URL = exports.WITHDRAW_STATUS_URL = API_URL + '/admin/withdraw/status';
var WITHDRAW_SEARCH_URL = exports.WITHDRAW_SEARCH_URL = API_URL + '/admin/withdraw/search';

var BAIDU_MAP_URL = exports.BAIDU_MAP_URL = 'http://api.map.baidu.com';
var MEMBER_WITHDRAW_URL = exports.MEMBER_WITHDRAW_URL = API_URL + '/admin/withdraw/list';

var CONSUMPTION_AUDIT_URL = exports.CONSUMPTION_AUDIT_URL = API_URL + '/admin/consumption/order/audit';
var CONSUMPTION_ORDER_STATUS_URL = exports.CONSUMPTION_ORDER_STATUS_URL = API_URL + '/admin/consumption/order/status';
var CONSUMPTION_ORDER_AUDIT = exports.CONSUMPTION_ORDER_AUDIT = API_URL + '/admin/consumption/order/audit';
var CONSUMPTION_ORDER_URL = exports.CONSUMPTION_ORDER_URL = API_URL + '/admin/consumption/order/list';
var CONSUMPTION_ORDER_PAY_URL = exports.CONSUMPTION_ORDER_PAY_URL = API_URL + '/admin/consumption/pay/list';
var CONSUMPTION_ORDER_SEARCH_URL = exports.CONSUMPTION_ORDER_SEARCH_URL = API_URL + '/admin/consumption/order/search';
var CONSUMPTION_ORDER_PAY_SEARCH_URL = exports.CONSUMPTION_ORDER_PAY_SEARCH_URL = API_URL + '/admin/consumption/pay/search';

var ADV_IMAGE_UPLOAD_URL = exports.ADV_IMAGE_UPLOAD_URL = API_URL + '/admin/adv/image/upload';
var ADV_IMAGE_DELETE_URL = exports.ADV_IMAGE_DELETE_URL = API_URL + '/admin/adv/image/delete';
var ADV_LIST_URL = exports.ADV_LIST_URL = API_URL + '/admin/adv/list';
var ADV_CREATE_URL = exports.ADV_CREATE_URL = API_URL + '/admin/adv/create';
var ADV_EDIT_URL = exports.ADV_EDIT_URL = API_URL + '/admin/adv/edit';
var ADV_SEARCH_URL = exports.ADV_SEARCH_URL = API_URL + '/admin/adv/search';
var ADV_STATUS_URL = exports.ADV_STATUS_URL = API_URL + '/admin/adv/status';

var NOTICE_LIST_URL = exports.NOTICE_LIST_URL = API_URL + '/admin/notice/list/1';
var NOTICE_DISABLED_URL = exports.NOTICE_DISABLED_URL = API_URL + '/admin/notice/list/0';
var NOTICE_EDIT_URL = exports.NOTICE_EDIT_URL = API_URL + '/admin/notice/edit';
var NOTICE_CREATE_URL = exports.NOTICE_CREATE_URL = API_URL + '/admin/notice/create';
var NOTICE_STATUS_URL = exports.NOTICE_STATUS_URL = API_URL + '/admin/notice/status';
var NOTICE_SEARCH_URL = exports.NOTICE_SEARCH_URL = API_URL + '/admin/notice/search';

var NEWS_LIST_URL = exports.NEWS_LIST_URL = API_URL + '/admin/news/list/1';
var NEWS_DISABLED_URL = exports.NEWS_DISABLED_URL = API_URL + '/admin/news/list/0';
var NEWS_CREATE_URL = exports.NEWS_CREATE_URL = API_URL + '/admin/news/create';
var NEWS_EDIT_URL = exports.NEWS_EDIT_URL = API_URL + '/admin/news/edit';
var NEWS_SEARCH_URL = exports.NEWS_SEARCH_URL = API_URL + '/admin/news/search';
var NEWS_STATUS_URL = exports.NEWS_STATUS_URL = API_URL + '/admin/news/status';
var NEWS_SEARCH_RECOMMEND_URL = exports.NEWS_SEARCH_RECOMMEND_URL = API_URL + '/admin/news/search/recommends';
var NEWS_IMAGE_UPLOAD_URL = exports.NEWS_IMAGE_UPLOAD_URL = API_URL + '/admin/news/image/upload';
var NEWS_IMAGE_DELETE_URL = exports.NEWS_IMAGE_DELETE_URL = API_URL + '/admin/news/image/delete';

var TAG_LIST_URL = exports.TAG_LIST_URL = API_URL + '/admin/tag/list';
var TAG_CREATE_URL = exports.TAG_CREATE_URL = API_URL + '/admin/tag/create';
var TAG_EDIT_URL = exports.TAG_EDIT_URL = API_URL + '/admin/tag/edit';
var TAG_IMAGE_UPLOAD_URL = exports.TAG_IMAGE_UPLOAD_URL = API_URL + '/admin/tag/image/upload';
var TAG_IMAGE_DELETE_URL = exports.TAG_IMAGE_DELETE_URL = API_URL + '/admin/tag/image/delete';
var TAG_SHOW_URL = exports.TAG_SHOW_URL = API_URL + '/admin/tag/show';

var XINCOIN_LIST_URL = exports.XINCOIN_LIST_URL = API_URL + '/admin/reward/xincoin/list';
var XINCOIN_SEND_URL = exports.XINCOIN_SEND_URL = API_URL + '/admin/reward/xincoin/send';
var XINCOIN_SEARCH_URL = exports.XINCOIN_SEARCH_URL = API_URL + '/admin/xincoin/search';

var MERCHANT_CATEGORY_LIST_URL = exports.MERCHANT_CATEGORY_LIST_URL = API_URL + '/admin/merchant/category/list';
var MERCHANT_CATEGORY_CREATE_URL = exports.MERCHANT_CATEGORY_CREATE_URL = API_URL + '/admin/merchant/category/create';
var MERCHANT_CATEGORY_EDIT_URL = exports.MERCHANT_CATEGORY_EDIT_URL = API_URL + '/admin/merchant/category/edit';
var MERCHANT_CATEGORY_IMAGE_UPLOAD_URL = exports.MERCHANT_CATEGORY_IMAGE_UPLOAD_URL = API_URL + '/admin/merchant/category/image/upload';
var MERCHANT_CATEGORY_IMAGE_DELETE_URL = exports.MERCHANT_CATEGORY_IMAGE_DELETE_URL = API_URL + '/admin/merchant/category/image/delete';
var MERCHANT_CATEGORY_SHOW_URL = exports.MERCHANT_CATEGORY_SHOW_URL = API_URL + '/admin/merchant/category/show';

var MERCHANT_SCALE_LIST = exports.MERCHANT_SCALE_LIST = API_URL + '/admin/merchant/scale/list';
var MERCHANT_SCALE_EDIT = exports.MERCHANT_SCALE_EDIT = API_URL + '/admin/merchant/scale/edit';
var MERCHANT_SCALE_CREATE = exports.MERCHANT_SCALE_CREATE = API_URL + '/admin/merchant/scale/create';
var MERCHANT_SCALE_SHOW = exports.MERCHANT_SCALE_SHOW = API_URL + '/admin/merchant/scale/show';

var SYSTEM_MANAGER_LIST = exports.SYSTEM_MANAGER_LIST = API_URL + '/admin/system/manager/list';
var SYSTEM_MANAGER_REGISTER = exports.SYSTEM_MANAGER_REGISTER = API_URL + '/admin/system/manager/register';
var SYSTEM_MANAGER_EDIT = exports.SYSTEM_MANAGER_EDIT = API_URL + '/admin/system/manager/edit';
var SYSTEM_MANAGER_PERSONAL = exports.SYSTEM_MANAGER_PERSONAL = API_URL + '/admin/system/manager/personal';
var SYSTEM_MANAGER_ENABLED = exports.SYSTEM_MANAGER_ENABLED = API_URL + '/admin/system/manager/enabled';

var SYSTEM_ROLE_LIST = exports.SYSTEM_ROLE_LIST = API_URL + '/admin/system/role/list';
var SYSTEM_ROLE_EDIT = exports.SYSTEM_ROLE_EDIT = API_URL + '/admin/system/role/edit';
var SYSTEM_ROLE_CREATE = exports.SYSTEM_ROLE_CREATE = API_URL + '/admin/system/role/create';
var SYSTEM_ROLE_USER = exports.SYSTEM_ROLE_USER = API_URL + '/admin/system/manager/roleuser';

var SYSTEM_PERMISSION_LIST = exports.SYSTEM_PERMISSION_LIST = API_URL + '/admin/system/permission/list';
var SYSTEM_PERMISSION_EDIT = exports.SYSTEM_PERMISSION_EDIT = API_URL + '/admin/system/permission/edit';
var SYSTEM_PERMISSION_CREATE = exports.SYSTEM_PERMISSION_CREATE = API_URL + '/admin/system/permission/create';
var SYSTEM_PERMISSION_ALLOC = exports.SYSTEM_PERMISSION_ALLOC = API_URL + '/admin/system/permission/alloc';

var AUTOCOMPLETE_AREA = exports.AUTOCOMPLETE_AREA = API_URL + '/admin/autocomplete/area';
var AUTOCOMPLETE_MERCHANT = exports.AUTOCOMPLETE_MERCHANT = API_URL + '/admin/autocomplete/merchant';
var AUTOCOMPLETE_USER_PHONE = exports.AUTOCOMPLETE_USER_PHONE = API_URL + '/admin/autocomplete/user/phone';
var AUTOCOMPLETE_MERCHANT_PHONE = exports.AUTOCOMPLETE_MERCHANT_PHONE = API_URL + '/admin/autocomplete/merchant/phone';

var LOGIN = exports.LOGIN = API_URL + '/admin/login';

var DASHBOARD_ORDER = exports.DASHBOARD_ORDER = API_URL + '/admin/dashboard/order';
var DASHBOARD_MEMBER = exports.DASHBOARD_MEMBER = API_URL + '/admin/dashboard/member';
var DASHBOARD_MERCHANT = exports.DASHBOARD_MERCHANT = API_URL + '/admin/dashboard/merchant';

var SETTING_MENUS = exports.SETTING_MENUS = API_URL + '/admin/setting/menus';

var AGENT_LIST = exports.AGENT_LIST = API_URL + '/admin/agent/list';
var AGENT_EDIT = exports.AGENT_EDIT = API_URL + '/admin/agent/edit';
var AGENT_STATUS = exports.AGENT_STATUS = API_URL + '/admin/agent/status';

var SALESMAN_LIST = exports.SALESMAN_LIST = API_URL + '/admin/salesman/list';

var AGENT_SEARCH = exports.AGENT_SEARCH = API_URL + '/admin/agent/search';
var AGENT_AUDIT_SEARCH = exports.AGENT_AUDIT_SEARCH = API_URL + '/admin/agent/audit/search';
var SALESMAN_SEARCH = exports.SALESMAN_SEARCH = API_URL + '/admin/salesman/search';

//# sourceMappingURL=app-urls-compiled.js.map