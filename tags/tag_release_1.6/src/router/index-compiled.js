'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menubar = function Menubar(r) {
  return require.ensure([], function () {
    return r(require('@/components/Menubar'));
  }, 'group-main');
};
var Login = function Login(r) {
  return require.ensure([], function () {
    return r(require('@/components/Login'));
  }, 'group-main');
};
var LoginBody = function LoginBody(r) {
  return require.ensure([], function () {
    return r(require('@/components/LoginBody'));
  }, 'group-main');
};

var MemberSidebar = function MemberSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/member/MemberSidebar'));
  }, 'group-member');
};
var MemberList = function MemberList(r) {
  return require.ensure([], function () {
    return r(require('@/components/member/MemberList'));
  }, 'group-member');
};
var MemberDisabled = function MemberDisabled(r) {
  return require.ensure([], function () {
    return r(require('@/components/member/MemberDisabled'));
  }, 'group-member');
};
var MemberEdit = function MemberEdit(r) {
  return require.ensure([], function () {
    return r(require('@/components/member/MemberEdit'));
  }, 'group-member');
};
var BankCardList = function BankCardList(r) {
  return require.ensure([], function () {
    return r(require('@/components/member/BankCardList'));
  }, 'group-member');
};

var MemberIntegral = function MemberIntegral(r) {
  return require.ensure([], function () {
    return r(require('@/components/member/MemberIntegral'));
  }, 'group-member');
};

var DashBoardSidebar = function DashBoardSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/dashboard/DashBoardSidebar'));
  }, 'group-dashboard');
};
var DashBoard = function DashBoard(r) {
  return require.ensure([], function () {
    return r(require('@/components/dashboard/DashBoard'));
  }, 'group-dashboard');
};

var MerchantSidebar = function MerchantSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantSidebar'));
  }, 'group-merchant');
};
var MerchantApplyList = function MerchantApplyList(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantApplyList'));
  }, 'group-merchant');
};
var MerchantApplyEdit = function MerchantApplyEdit(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantApplyEdit'));
  }, 'group-merchant');
};

var MerchantAuditList = function MerchantAuditList(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantAuditList'));
  }, 'group-merchant');
};
var MerchantAuditEdit = function MerchantAuditEdit(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantAuditEdit'));
  }, 'group-merchant');
};
var MerchantWaitOnline = function MerchantWaitOnline(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantWaitOnline'));
  }, 'group-merchant');
};
var MerchantWaitOnlineEdit = function MerchantWaitOnlineEdit(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantWaitOnlineEdit'));
  }, 'group-merchant');
};
var MerchantAuditRefused = function MerchantAuditRefused(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantAuditRefused'));
  }, 'group-merchant');
};
var MerchantAuditPass = function MerchantAuditPass(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantAuditPass'));
  }, 'group-merchant');
};

var MerchantList = function MerchantList(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantList'));
  }, 'group-merchant');
};
var MerchantOffline = function MerchantOffline(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantOffline'));
  }, 'group-merchant');
};
var MerchantDisabled = function MerchantDisabled(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantDisabled'));
  }, 'group-merchant');
};
var MerchantEdit = function MerchantEdit(r) {
  return require.ensure([], function () {
    return r(require('@/components/merchant/MerchantEdit'));
  }, 'group-merchant');
};

var FinanceSidebar = function FinanceSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/finance/FinanceSidebar'));
  }, 'group-finance');
};

var WithdrawCAudit = function WithdrawCAudit(r) {
  return require.ensure([], function () {
    return r(require('@/components/withdraw/WithdrawCAudit'));
  }, 'group-withdraw');
};
var WithdrawCList = function WithdrawCList(r) {
  return require.ensure([], function () {
    return r(require('@/components/withdraw/WithdrawCList'));
  }, 'group-withdraw');
};
var WithdrawMAudit = function WithdrawMAudit(r) {
  return require.ensure([], function () {
    return r(require('@/components/withdraw/WithdrawMAudit'));
  }, 'group-withdraw');
};
var WithdrawMList = function WithdrawMList(r) {
  return require.ensure([], function () {
    return r(require('@/components/withdraw/WithdrawMList'));
  }, 'group-withdraw');
};

var InformSidebar = function InformSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/InformSidebar'));
  }, 'group-inform');
};
var AdvertiseList = function AdvertiseList(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/AdvertiseList'));
  }, 'group-inform');
};
var AdvertiseDisabled = function AdvertiseDisabled(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/AdvertiseDisabled'));
  }, 'group-inform');
};
var AdvertiseCreate = function AdvertiseCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/AdvertiseCreate'));
  }, 'group-inform');
};
var AdvertiseEdit = function AdvertiseEdit(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/AdvertiseEdit'));
  }, 'group-inform');
};
var NoticeList = function NoticeList(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/NoticeList'));
  }, 'group-inform');
};
var NoticeDisabled = function NoticeDisabled(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/NoticeDisabled'));
  }, 'group-inform');
};
var NoticeEdit = function NoticeEdit(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/NoticeEdit'));
  }, 'group-inform');
};
var NoticeCreate = function NoticeCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/NoticeCreate'));
  }, 'group-inform');
};
var NewsList = function NewsList(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/NewsList'));
  }, 'group-inform');
};
var NewsCreate = function NewsCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/NewsCreate'));
  }, 'group-inform');
};
var NewsEdit = function NewsEdit(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/NewsEdit'));
  }, 'group-inform');
};
var NewsDisabled = function NewsDisabled(r) {
  return require.ensure([], function () {
    return r(require('@/components/inform/NewsDisabled'));
  }, 'group-inform');
};

var BusinessSidebar = function BusinessSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/business/BusinessSidebar'));
  }, 'group-business');
};
var ConsumptionOrderAudit = function ConsumptionOrderAudit(r) {
  return require.ensure([], function () {
    return r(require('@/components/business/ConsumptionOrderAudit'));
  }, 'group-business');
};
var ConsumptionOrderList = function ConsumptionOrderList(r) {
  return require.ensure([], function () {
    return r(require('@/components/business/ConsumptionOrderList'));
  }, 'group-business');
};
var ConsumptionOrderPay = function ConsumptionOrderPay(r) {
  return require.ensure([], function () {
    return r(require('@/components/business/ConsumptionOrderPay'));
  }, 'group-business');
};
var MemberRechargeList = function MemberRechargeList(r) {
  return require.ensure([], function () {
    return r(require('@/components/business/MemberRechargeList'));
  }, 'group-business');
};
var MemberRecharge = function MemberRecharge(r) {
  return require.ensure([], function () {
    return r(require('@/components/business/MemberRecharge'));
  }, 'group-business');
};

var SettingSidebar = function SettingSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/SettingSidebar'));
  }, 'group-setting');
};
var MerchantCategory = function MerchantCategory(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/MerchantCategory'));
  }, 'group-setting');
};
var MCategoryCreate = function MCategoryCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/MCategoryCreate'));
  }, 'group-setting');
};
var Tag = function Tag(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/Tag'));
  }, 'group-setting');
};
var TagCreate = function TagCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/TagCreate'));
  }, 'group-setting');
};
var GlobalSetting = function GlobalSetting(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/GlobalSetting'));
  }, 'group-setting');
};
var AppUpgrade = function AppUpgrade(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/AppUpgrade'));
  }, 'group-setting');
};

var MerchantScale = function MerchantScale(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/MerchantScale'));
  }, 'group-setting');
};
var MerchantScaleCreate = function MerchantScaleCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/setting/MerchantScaleCreate'));
  }, 'group-setting');
};

var SystemSidebar = function SystemSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/system/SystemSidebar'));
  }, 'group-system');
};
var Manager = function Manager(r) {
  return require.ensure([], function () {
    return r(require('@/components/system/Manager'));
  }, 'group-system');
};
var ManagerCreate = function ManagerCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/system/ManagerCreate'));
  }, 'group-system');
};
var Role = function Role(r) {
  return require.ensure([], function () {
    return r(require('@/components/system/Role'));
  }, 'group-system');
};
var RoleCreate = function RoleCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/system/RoleCreate'));
  }, 'group-system');
};
var Permission = function Permission(r) {
  return require.ensure([], function () {
    return r(require('@/components/system/Permission'));
  }, 'group-system');
};
var PermissionCreate = function PermissionCreate(r) {
  return require.ensure([], function () {
    return r(require('@/components/system/PermissionCreate'));
  }, 'group-system');
};
var PermissionRole = function PermissionRole(r) {
  return require.ensure([], function () {
    return r(require('@/components/system/PermissionRole'));
  }, 'group-system');
};

var AgentList = function AgentList(r) {
  return require.ensure([], function () {
    return r(require('@/components/agent/AgentList'));
  }, 'group-system');
};
var AgentAudit = function AgentAudit(r) {
  return require.ensure([], function () {
    return r(require('@/components/agent/AgentAudit'));
  }, 'group-system');
};
var AgentSidebar = function AgentSidebar(r) {
  return require.ensure([], function () {
    return r(require('@/components/agent/AgentSidebar'));
  }, 'group-system');
};
var SalesmanList = function SalesmanList(r) {
  return require.ensure([], function () {
    return r(require('@/components/agent/SalesmanList'));
  }, 'group-system');
};

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  routes: [{
    path: '/login',
    name: 'Login',
    components: {
      menubar: LoginBody,
      sidebar: LoginBody,
      content: Login
    }
  }, {
    path: '/',
    name: 'DashBoard',
    components: {
      menubar: Menubar,
      sidebar: DashBoardSidebar,
      content: DashBoard
    }
  }, {
    path: '/member/list',
    name: 'MemberList',
    components: {
      menubar: Menubar,
      sidebar: MemberSidebar,
      content: MemberList
    },
    meta: { requiresAuth: true, accessMenu: 'member' }
  }, {
    path: '/member/disabled',
    name: 'MemberDisabled',
    components: {
      menubar: Menubar,
      sidebar: MemberSidebar,
      content: MemberDisabled
    },
    meta: { requiresAuth: true, accessMenu: 'member' }
  }, {
    path: '/member/edit',
    name: 'MemberEdit',
    components: {
      menubar: Menubar,
      sidebar: MemberSidebar,
      content: MemberEdit
    },
    meta: { requiresAuth: true, accessMenu: 'member' }
  }, {
    path: '/member/withdraw/list',
    name: 'WithdrawCuList',
    components: {
      menubar: Menubar,
      sidebar: MemberSidebar,
      content: WithdrawCList
    },
    meta: { requiresAuth: true, accessMenu: 'member' }
  }, {
    path: '/member/bankcard/list',
    name: 'BankCardList',
    components: {
      menubar: Menubar,
      sidebar: MemberSidebar,
      content: BankCardList
    },
    meta: { requiresAuth: true, accessMenu: 'member' }
  }, {
    path: '/member/withdraw/audit',
    name: 'WithdrawCuAudit',
    components: {
      menubar: Menubar,
      sidebar: MemberSidebar,
      content: WithdrawCAudit
    },
    meta: { requiresAuth: true, accessMenu: 'member' }
  }, {
    path: '/member/integral',
    name: 'MemberIntegral',
    components: {
      menubar: Menubar,
      sidebar: MemberSidebar,
      content: MemberIntegral
    },
    meta: { requiresAuth: true, accessMenu: 'member' }
  }, {
    path: '/merchant/apply/list',
    name: 'MerchantApplyList',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantApplyList
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/apply/edit',
    name: 'MerchantApplyEdit',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantApplyEdit
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/audit/list',
    name: 'MerchantAuditList',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantAuditList
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/audit/edit',
    name: 'MerchantAuditEdit',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantAuditEdit
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/audit/pass',
    name: 'MerchantAuditPass',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantAuditPass
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/audit/refused',
    name: 'MerchantAuditRefused',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantAuditRefused
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/wait/online',
    name: 'MerchantWaitOnline',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantWaitOnline
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/wait/online/edit',
    name: 'MerchantWaitOnlineEdit',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantWaitOnlineEdit
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/list',
    name: 'MerchantList',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantList
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/offline',
    name: 'MerchantOffline',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantOffline
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/disabled',
    name: 'MerchantDisabled',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantDisabled
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/edit',
    name: 'MerchantEdit',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: MerchantEdit
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/merchant/withdraw/list',
    name: 'WithdrawMeList',
    components: {
      menubar: Menubar,
      sidebar: MerchantSidebar,
      content: WithdrawMList
    },
    meta: { requiresAuth: true, accessMenu: 'merchant' }
  }, {
    path: '/business/order/audit',
    name: 'ConsumptionOrderAudit',
    components: {
      menubar: Menubar,
      sidebar: BusinessSidebar,
      content: ConsumptionOrderAudit
    },
    meta: { requiresAuth: true, accessMenu: 'business' }
  }, {
    path: '/business/order/list',
    name: 'ConsumptionOrderList',
    components: {
      menubar: Menubar,
      sidebar: BusinessSidebar,
      content: ConsumptionOrderList
    },
    meta: { requiresAuth: true, accessMenu: 'business' }
  }, {
    path: '/business/order/pay',
    name: 'ConsumptionOrderPay',
    components: {
      menubar: Menubar,
      sidebar: BusinessSidebar,
      content: ConsumptionOrderPay
    },
    meta: { requiresAuth: true, accessMenu: 'business' }
  }, {
    path: '/business/recharge/list',
    name: 'MemberRechargeList',
    components: {
      menubar: Menubar,
      sidebar: BusinessSidebar,
      content: MemberRechargeList
    },
    meta: { requiresAuth: true, accessMenu: 'business' }
  }, {
    path: '/business/recharge',
    name: 'MemberRecharge',
    components: {
      menubar: Menubar,
      sidebar: BusinessSidebar,
      content: MemberRecharge
    },
    meta: { requiresAuth: true, accessMenu: 'business' }
  }, {
    path: '/finance/member/withdraw/audit',
    name: 'WithdrawCAudit',
    components: {
      menubar: Menubar,
      sidebar: FinanceSidebar,
      content: WithdrawCAudit
    },
    meta: { requiresAuth: true, accessMenu: 'finance' }
  }, {
    path: '/finance/member/withdraw/list',
    name: 'WithdrawCList',
    components: {
      menubar: Menubar,
      sidebar: FinanceSidebar,
      content: WithdrawCList
    },
    meta: { requiresAuth: true, accessMenu: 'finance' }
  }, {
    path: '/finance/merchant/withdraw/audit',
    name: 'WithdrawMAudit',
    components: {
      menubar: Menubar,
      sidebar: FinanceSidebar,
      content: WithdrawMAudit
    },
    meta: { requiresAuth: true, accessMenu: 'finance' }
  }, {
    path: '/finance/merchant/withdraw/list',
    name: 'WithdrawMList',
    components: {
      menubar: Menubar,
      sidebar: FinanceSidebar,
      content: WithdrawMList
    },
    meta: { requiresAuth: true, accessMenu: 'finance' }
  }, {
    path: '/finance/recharge/list',
    name: 'FinanceRechargeList',
    components: {
      menubar: Menubar,
      sidebar: FinanceSidebar,
      content: MemberRechargeList
    },
    meta: { requiresAuth: true, accessMenu: 'finance' }
  }, {
    path: '/finance/order/pay',
    name: 'FinanceOrderPay',
    components: {
      menubar: Menubar,
      sidebar: FinanceSidebar,
      content: ConsumptionOrderPay
    },
    meta: { requiresAuth: true, accessMenu: 'finance' }
  }, {
    path: '/finance/bankcard/list',
    name: 'FinanceBankCardList',
    components: {
      menubar: Menubar,
      sidebar: FinanceSidebar,
      content: BankCardList
    },
    meta: { requiresAuth: true, accessMenu: 'finance' }
  }, {
    path: '/inform/advertise/list',
    name: 'AdvertiseList',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: AdvertiseList
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/advertise/disabled',
    name: 'AdvertiseDisabled',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: AdvertiseDisabled
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/advertise/create',
    name: 'AdvertiseCreate',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: AdvertiseCreate
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/advertise/edit',
    name: 'AdvertiseEdit',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: AdvertiseEdit
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/notice/list',
    name: 'NoticeList',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: NoticeList
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/notice/disabled',
    name: 'NoticeDisabled',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: NoticeDisabled
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/notice/create',
    name: 'NoticeCreate',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: NoticeCreate
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/notice/edit',
    name: 'NoticeEdit',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: NoticeEdit
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/news/list',
    name: 'NewsList',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: NewsList
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/news/create',
    name: 'NewsCreate',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: NewsCreate
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/news/edit',
    name: 'NewsEdit',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: NewsEdit
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/inform/news/disabled',
    name: 'NewsDisabled',
    components: {
      menubar: Menubar,
      sidebar: InformSidebar,
      content: NewsDisabled
    },
    meta: { requiresAuth: true, accessMenu: 'inform' }
  }, {
    path: '/setting/tag/list',
    name: 'Tag',
    components: {
      menubar: Menubar,
      sidebar: SettingSidebar,
      content: Tag
    },
    meta: { requiresAuth: true, accessMenu: 'setting' }
  }, {
    path: '/setting/tag/create',
    name: 'TagCreate',
    components: {
      menubar: Menubar,
      sidebar: SettingSidebar,
      content: TagCreate
    },
    meta: { requiresAuth: true, accessMenu: 'setting' }
  }, {
    path: '/setting/merchant/category/list',
    name: 'MerchantCategory',
    components: {
      menubar: Menubar,
      sidebar: SettingSidebar,
      content: MerchantCategory
    },
    meta: { requiresAuth: true, accessMenu: 'setting' }
  }, {
    path: '/setting/merchant/category/create',
    name: 'MCategoryCreate',
    components: {
      menubar: Menubar,
      sidebar: SettingSidebar,
      content: MCategoryCreate
    },
    meta: { requiresAuth: true, accessMenu: 'setting' }
  }, {
    path: '/setting/scale/list',
    name: 'MerchantScale',
    components: {
      menubar: Menubar,
      sidebar: SettingSidebar,
      content: MerchantScale
    },
    meta: { requiresAuth: true, accessMenu: 'setting' }
  }, {
    path: '/setting/scale/create',
    name: 'MerchantScaleCreate',
    components: {
      menubar: Menubar,
      sidebar: SettingSidebar,
      content: MerchantScaleCreate
    },
    meta: { requiresAuth: true, accessMenu: 'setting' }
  }, {
    path: '/system/global/setting',
    name: 'GlobalSetting',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: GlobalSetting
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/system/app/upgrade',
    name: 'AppUpgrade',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: AppUpgrade
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/system/manager',
    name: 'Manager',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: Manager
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/system/manager/create',
    name: 'ManagerCreate',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: ManagerCreate
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/system/role',
    name: 'Role',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: Role
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/system/role/create',
    name: 'RoleCreate',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: RoleCreate
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/system/permission',
    name: 'Permission',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: Permission
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/system/permission/create',
    name: 'PermissionCreate',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: PermissionCreate
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/system/permission/role',
    name: 'PermissionRole',
    components: {
      menubar: Menubar,
      sidebar: SystemSidebar,
      content: PermissionRole
    },
    meta: { requiresAuth: true, accessMenu: 'system' }
  }, {
    path: '/agent/list',
    name: 'AgentList',
    components: {
      menubar: Menubar,
      sidebar: AgentSidebar,
      content: AgentList
    },
    meta: { requiresAuth: true, accessMenu: 'agent' }
  }, {
    path: '/agent/audit',
    name: 'AgentAudit',
    components: {
      menubar: Menubar,
      sidebar: AgentSidebar,
      content: AgentAudit
    },
    meta: { requiresAuth: true, accessMenu: 'agent' }
  }, {
    path: '/salesman/list',
    name: 'SalesmanList',
    components: {
      menubar: Menubar,
      sidebar: AgentSidebar,
      content: SalesmanList
    },
    meta: { requiresAuth: true, accessMenu: 'agent' }
  }]
});

//# sourceMappingURL=index-compiled.js.map