import Vue from 'vue'
import Router from 'vue-router'

const Menubar = r => require.ensure([], () => r(require('@/components/Menubar')), 'group-main')
const Login = r => require.ensure([], () => r(require('@/components/Login')), 'group-main')
const LoginBody = r => require.ensure([], () => r(require('@/components/LoginBody')), 'group-main')
const Welcome = r => require.ensure([], () => r(require('@/components/Welcome')), 'group-main')

// 会员信息组件
const MemberSidebar = r => require.ensure([], () => r(require('@/components/member/MemberSidebar')), 'group-member')
const MemberList = r => require.ensure([], () => r(require('@/components/member/MemberList')), 'group-member')
const MemberDisabled = r => require.ensure([], () => r(require('@/components/member/MemberDisabled')), 'group-member')
const MemberEdit = r => require.ensure([], () => r(require('@/components/member/MemberEdit')), 'group-member')
const BankCardList = r => require.ensure([], () => r(require('@/components/member/BankCardList')), 'group-member')
const BankCardApplyList = r => require.ensure([], () => r(require('@/components/member/BankCardApplyList')), 'group-member')
const MemberNoSuperior = r => require.ensure([], () => r(require('@/components/member/MemberNoSuperior')), 'group-member')

// 会员积分
const MemberIntegral = r => require.ensure([], () => r(require('@/components/member/MemberIntegral')), 'group-member')

// 仪表盘组件
const DashBoardSidebar = r => require.ensure([], () => r(require('@/components/dashboard/DashBoardSidebar')), 'group-dashboard')
const DashBoard = r => require.ensure([], () => r(require('@/components/dashboard/DashBoard')), 'group-dashboard')

// 商家管理组件
const MerchantSidebar = r => require.ensure([], () => r(require('@/components/merchant/MerchantSidebar')), 'group-merchant')
const MerchantApplyList = r => require.ensure([], () => r(require('@/components/merchant/MerchantApplyList')), 'group-merchant')
const MerchantApplyEdit = r => require.ensure([], () => r(require('@/components/merchant/MerchantApplyEdit')), 'group-merchant')

const MerchantAuditList = r => require.ensure([], () => r(require('@/components/merchant/MerchantAuditList')), 'group-merchant')
const MerchantAuditEdit = r => require.ensure([], () => r(require('@/components/merchant/MerchantAuditEdit')), 'group-merchant')
const MerchantWaitOnline = r => require.ensure([], () => r(require('@/components/merchant/MerchantWaitOnline')), 'group-merchant')
const MerchantWaitOnlineEdit = r => require.ensure([], () => r(require('@/components/merchant/MerchantWaitOnlineEdit')), 'group-merchant')
const MerchantAuditRefused = r => require.ensure([], () => r(require('@/components/merchant/MerchantAuditRefused')), 'group-merchant')
const MerchantAuditPass = r => require.ensure([], () => r(require('@/components/merchant/MerchantAuditPass')), 'group-merchant')

const MerchantList = r => require.ensure([], () => r(require('@/components/merchant/MerchantList')), 'group-merchant')
const MerchantOffline = r => require.ensure([], () => r(require('@/components/merchant/MerchantOffline')), 'group-merchant')
const MerchantDisabled = r => require.ensure([], () => r(require('@/components/merchant/MerchantDisabled')), 'group-merchant')
const MerchantEdit = r => require.ensure([], () => r(require('@/components/merchant/MerchantEdit')), 'group-merchant')

// 财务组件
const FinanceSidebar = r => require.ensure([], () => r(require('@/components/finance/FinanceSidebar')), 'group-finance')
const WithdrawAudit = r => require.ensure([], () => r(require('@/components/finance/WithdrawAudit')), 'group-finance')
const WithdrawHandle = r => require.ensure([], () => r(require('@/components/finance/WithdrawHandle')), 'group-finance')
const WithdrawList = r => require.ensure([], () => r(require('@/components/finance/WithdrawList')), 'group-finance')
const OfflineTransferList = r => require.ensure([], () => r(require('@/components/finance/OfflineTransferList')), 'group-finance')
const OfflineTransferAudit = r => require.ensure([], () => r(require('@/components/finance/OfflineTransferAudit')), 'group-finance')
const OfflineTransferApply = r => require.ensure([], () => r(require('@/components/finance/OfflineTransferApply')), 'group-finance')

const OfflineRechargeList = r => require.ensure([], () => r(require('@/components/finance/OfflineRechargeList')), 'group-finance')
const OfflineRechargeAudit = r => require.ensure([], () => r(require('@/components/finance/OfflineRechargeAudit')), 'group-finance')
const OfflineRechargeApply = r => require.ensure([], () => r(require('@/components/finance/OfflineRechargeApply')), 'group-finance')

// 资讯公告组件
const InformSidebar = r => require.ensure([], () => r(require('@/components/inform/InformSidebar')), 'group-inform')
const AdvertiseList = r => require.ensure([], () => r(require('@/components/inform/AdvertiseList')), 'group-inform')
const AdvertiseDisabled = r => require.ensure([], () => r(require('@/components/inform/AdvertiseDisabled')), 'group-inform')
const AdvertiseCreate = r => require.ensure([], () => r(require('@/components/inform/AdvertiseCreate')), 'group-inform')
const AdvertiseEdit = r => require.ensure([], () => r(require('@/components/inform/AdvertiseEdit')), 'group-inform')
const NoticeList = r => require.ensure([], () => r(require('@/components/inform/NoticeList')), 'group-inform')
const NoticeDisabled = r => require.ensure([], () => r(require('@/components/inform/NoticeDisabled')), 'group-inform')
const NoticeEdit = r => require.ensure([], () => r(require('@/components/inform/NoticeEdit')), 'group-inform')
const NoticeCreate = r => require.ensure([], () => r(require('@/components/inform/NoticeCreate')), 'group-inform')
const NewsList = r => require.ensure([], () => r(require('@/components/inform/NewsList')), 'group-inform')
const NewsCreate = r => require.ensure([], () => r(require('@/components/inform/NewsCreate')), 'group-inform')
const NewsEdit = r => require.ensure([], () => r(require('@/components/inform/NewsEdit')), 'group-inform')
const NewsDisabled = r => require.ensure([], () => r(require('@/components/inform/NewsDisabled')), 'group-inform')

// 设置组件
const SettingSidebar = r => require.ensure([], () => r(require('@/components/setting/SettingSidebar')), 'group-setting')
const MerchantCategory = r => require.ensure([], () => r(require('@/components/setting/MerchantCategory')), 'group-setting')
const MCategoryCreate = r => require.ensure([], () => r(require('@/components/setting/MCategoryCreate')), 'group-setting')
const Tag = r => require.ensure([], () => r(require('@/components/setting/Tag')), 'group-setting')
const TagCreate = r => require.ensure([], () => r(require('@/components/setting/TagCreate')), 'group-setting')
const GlobalSetting = r => require.ensure([], () => r(require('@/components/setting/GlobalSetting')), 'group-setting')
const AppUpgrade = r => require.ensure([], () => r(require('@/components/setting/AppUpgrade')), 'group-setting')

const MerchantScale = r => require.ensure([], () => r(require('@/components/setting/MerchantScale')), 'group-setting')
const MerchantScaleCreate = r => require.ensure([], () => r(require('@/components/setting/MerchantScaleCreate')), 'group-setting')

// 系统管理组件
const SystemSidebar = r => require.ensure([], () => r(require('@/components/system/SystemSidebar')), 'group-system')
const Manager = r => require.ensure([], () => r(require('@/components/system/Manager')), 'group-system')
const ManagerCreate = r => require.ensure([], () => r(require('@/components/system/ManagerCreate')), 'group-system')
const Role = r => require.ensure([], () => r(require('@/components/system/Role')), 'group-system')
const RoleCreate = r => require.ensure([], () => r(require('@/components/system/RoleCreate')), 'group-system')
const Permission = r => require.ensure([], () => r(require('@/components/system/Permission')), 'group-system')
const PermissionCreate = r => require.ensure([], () => r(require('@/components/system/PermissionCreate')), 'group-system')
const PermissionRole = r => require.ensure([], () => r(require('@/components/system/PermissionRole')), 'group-system')

// 代理商组件
const AgentList = r => require.ensure([], () => r(require('@/components/agent/AgentList')), 'group-agent')
const AgentHandle = r => require.ensure([], () => r(require('@/components/agent/AgentHandle')), 'group-agent')
const AgentAudit = r => require.ensure([], () => r(require('@/components/agent/AgentAudit')), 'group-agent')
const AgentSidebar = r => require.ensure([], () => r(require('@/components/agent/AgentSidebar')), 'group-agent')
const SalesmanList = r => require.ensure([], () => r(require('@/components/agent/SalesmanList')), 'group-agent')
const AgentRecharge = r => require.ensure([], () => r(require('@/components/agent/AgentRecharge')), 'group-agent')
const AgentRechargeList = r => require.ensure([], () => r(require('@/components/agent/AgentRechargeList')), 'group-agent')

// 夺宝组件
const SnatchSidebar = r => require.ensure([], () => r(require('@/components/snatch/SnatchSidebar')), 'group-snatch')
const SnatchCategory = r => require.ensure([], () => r(require('@/components/snatch/SnatchCategory')), 'group-snatch')
const SnatchCategoryCreate = r => require.ensure([], () => r(require('@/components/snatch/SnatchCategoryCreate')), 'group-snatch')
const SnatchGoodsList = r => require.ensure([], () => r(require('@/components/snatch/SnatchGoodsList')), 'group-snatch')
const SnatchGoodsFinish = r => require.ensure([], () => r(require('@/components/snatch/SnatchGoodsFinish')), 'group-snatch')
const SnatchGoodsNotFinish = r => require.ensure([], () => r(require('@/components/snatch/SnatchGoodsNotFinish')), 'group-snatch')
const SnatchGoodsEdit = r => require.ensure([], () => r(require('@/components/snatch/SnatchGoodsEdit')), 'group-snatch')
const SnatchGoodsCreate = r => require.ensure([], () => r(require('@/components/snatch/SnatchGoodsCreate')), 'group-snatch')
const SnatchOrderList = r => require.ensure([], () => r(require('@/components/snatch/SnatchOrderList')), 'group-snatch')
const SnatchNoticeList = r => require.ensure([], () => r(require('@/components/snatch/SnatchNoticeList')), 'group-snatch')
const SnatchNoticeDisabled = r => require.ensure([], () => r(require('@/components/snatch/SnatchNoticeDisabled')), 'group-snatch')
const SnatchNoticeEdit = r => require.ensure([], () => r(require('@/components/snatch/SnatchNoticeEdit')), 'group-snatch')
const SnatchNoticeCreate = r => require.ensure([], () => r(require('@/components/snatch/SnatchNoticeCreate')), 'group-snatch')

// 信息查询
const InfosearchList = r => require.ensure([], () => r(require('@/components/infosearch/InfosearchList')), 'group-infosearch')
const Infosidebar = r => require.ensure([], () => r(require('@/components/infosearch/Infosidebar')), 'group-infosearch')
const AreaManagement = r => require.ensure([], () => r(require('@/components/infosearch/AreaManagement')), 'group-infosearch')
const AreaMember = r => require.ensure([], () => r(require('@/components/infosearch/AreaMember')), 'group-infosearch')
const BucklepointIncome = r => require.ensure([], () => r(require('@/components/infosearch/BucklepointIncome')), 'group-infosearch')
const CashAccount = r => require.ensure([], () => r(require('@/components/infosearch/CashAccount')), 'group-infosearch')
const DepositTotal = r => require.ensure([], () => r(require('@/components/infosearch/DepositTotal')), 'group-infosearch')
const IntegralAccount = r => require.ensure([], () => r(require('@/components/infosearch/IntegralAccount')), 'group-infosearch')
const MemberDetails = r => require.ensure([], () => r(require('@/components/infosearch/MemberDetails')), 'group-infosearch')
const PayDetails = r => require.ensure([], () => r(require('@/components/infosearch/PayDetails')), 'group-infosearch')
const RechargeDetails = r => require.ensure([], () => r(require('@/components/infosearch/RechargeDetails')), 'group-infosearch')
const ServicefeeIncome = r => require.ensure([], () => r(require('@/components/infosearch/ServicefeeIncome')), 'group-infosearch')
const TotalIncome = r => require.ensure([], () => r(require('@/components/infosearch/TotalIncome')), 'group-infosearch')
const TotalSpend = r => require.ensure([], () => r(require('@/components/infosearch/TotalSpend')), 'group-infosearch')
const TrainingIncome = r => require.ensure([], () => r(require('@/components/infosearch/TrainingIncome')), 'group-infosearch')
const TransferDetails = r => require.ensure([], () => r(require('@/components/infosearch/TransferDetails')), 'group-infosearch')
const TransferIncome = r => require.ensure([], () => r(require('@/components/infosearch/TransferIncome')), 'group-infosearch')
const RecommendInfo = r => require.ensure([], () => r(require('@/components/infosearch/RecommendInfo')), 'group-infosearch')
const DepositInfo = r => require.ensure([], () => r(require('@/components/infosearch/DepositInfo')), 'group-infosearch')
// 大学生计划
const StudentChecking = r => require.ensure([], () => r(require('@/components/member/StudentChecking')), 'group-member')
const StudentPass = r => require.ensure([], () => r(require('@/components/member/StudentPass')), 'group-member')
const StudentEdit = r => require.ensure([], () => r(require('@/components/member/StudentEdit')), 'group-member')
const StudentPassCheck = r => require.ensure([], () => r(require('@/components/member/StudentPassCheck')), 'group-member')
// 商城管理
const merchantManagement = r => require.ensure([], () => r(require('@/components/mallmanagement/merchantManagement')), 'mallmanagement')
const productDetail = r => require.ensure([], () => r(require('@/components/mallmanagement/merchantManagementProductDetails')), 'mallmanagement')
const mallSidebar = r => require.ensure([], () => r(require('@/components/mallmanagement/mallSidebar')), 'mallmanagement')
const orderManagement = r => require.ensure([], () => r(require('@/components/mallmanagement/orderManagement')), 'mallmanagement')
const goodsManagement = r => require.ensure([], () => r(require('@/components/mallmanagement/goodsManagement')), 'mallmanagement')
const onlineRetailersTotal = r => require.ensure([], () => r(require('@/components/mallmanagement/onlineRetailersTotal')), 'mallmanagement')
const recommendList = r => require.ensure([], () => r(require('@/components/mallmanagement/recommendList')), 'mallmanagement')
const goodsClass = r => require.ensure([], () => r(require('@/components/mallmanagement/goodsClass')), 'mallmanagement')
const addGoodsClass = r => require.ensure([], () => r(require('@/components/mallmanagement/addGoodsClass')), 'mallmanagement')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      components: {
        menubar: LoginBody,
        sidebar: LoginBody,
        content: Login
      }
    },
    {
      path: '/',
      name: 'Welcome',
      components: {
        menubar: Menubar,
        sidebar: LoginBody,
        content: Welcome
      }
    },

    // 仪表盘
    {
      path: '/dashboard/welcome',
      name: 'DashBoardWelcome',
      components: {
        menubar: Menubar,
        sidebar: DashBoardSidebar,
        content: Welcome
      }
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      components: {
        menubar: Menubar,
        sidebar: DashBoardSidebar,
        content: DashBoard
      }
    },

    // 会员信息
    {
      path: '/member/welcome',
      name: 'MemberWelcome',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: Welcome
      }
    },
    {
      path: '/member/list',
      name: 'MemberList',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: MemberList
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/disabled',
      name: 'MemberDisabled',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: MemberDisabled
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/edit',
      name: 'MemberEdit',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: MemberEdit
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/superior/non',
      name: 'MemberNoSuperior',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: MemberNoSuperior
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/withdraw/list',
      name: 'WithdrawCList',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: WithdrawList
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/bankcard/list',
      name: 'BankCardList',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: BankCardList
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/bankcard/apply/list',
      name: 'BankCardApplyList',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: BankCardApplyList
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },

    // 会员积分
    {
      path: '/member/integral',
      name: 'MemberIntegral',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: MemberIntegral
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },

    // 商家
    {
      path: '/merchant/welcome',
      name: 'MerchantWelcome',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: Welcome
      }
    },
    {
      path: '/merchant/apply/list',
      name: 'MerchantApplyList',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantApplyList
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/apply/edit',
      name: 'MerchantApplyEdit',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantApplyEdit
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },

    {
      path: '/merchant/audit/list',
      name: 'MerchantAuditList',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantAuditList
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/audit/edit',
      name: 'MerchantAuditEdit',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantAuditEdit
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/audit/pass',
      name: 'MerchantAuditPass',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantAuditPass
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/audit/refused',
      name: 'MerchantAuditRefused',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantAuditRefused
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/wait/online',
      name: 'MerchantWaitOnline',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantWaitOnline
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/wait/online/edit',
      name: 'MerchantWaitOnlineEdit',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantWaitOnlineEdit
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },

    {
      path: '/merchant/list',
      name: 'MerchantList',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantList
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/offline',
      name: 'MerchantOffline',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantOffline
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/disabled',
      name: 'MerchantDisabled',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantDisabled
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },
    {
      path: '/merchant/edit',
      name: 'MerchantEdit',
      components: {
        menubar: Menubar,
        sidebar: MerchantSidebar,
        content: MerchantEdit
      },
      meta: { requiresAuth: true, accessMenu: 'merchant' }
    },

    // 财务
    {
      path: '/finance/welcome',
      name: 'FinanceWelcome',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: Welcome
      }
    },
    {
      path: '/finance/member/withdraw/audit',
      name: 'WithdrawAudit',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: WithdrawAudit
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },
    {
      path: '/finance/member/withdraw/handle',
      name: 'WithdrawHandle',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: WithdrawHandle
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },
    {
      path: '/finance/member/withdraw/list',
      name: 'WithdrawList',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: WithdrawList
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },
    {
      path: '/finance/bankcard/list',
      name: 'FinanceBankCardList',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: BankCardList
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },
    // 后台转账
    {
      path: '/finance/transfer/list',
      name: 'OfflineTransferList',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: OfflineTransferList
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },
    {
      path: '/finance/transfer/audit',
      name: 'OfflineTransferAudit',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: OfflineTransferAudit
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },
    {
      path: '/finance/transfer/apply',
      name: 'OfflineTransferApply',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: OfflineTransferApply
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },

    // 后台充值
    {
      path: '/finance/recharge/list',
      name: 'OfflineRechargeList',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: OfflineRechargeList
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },
    {
      path: '/finance/recharge/audit',
      name: 'OfflineRechargeAudit',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: OfflineRechargeAudit
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },
    {
      path: '/finance/recharge/apply',
      name: 'OfflineRechargeApply',
      components: {
        menubar: Menubar,
        sidebar: FinanceSidebar,
        content: OfflineRechargeApply
      },
      meta: { requiresAuth: true, accessMenu: 'finance' }
    },

    // 广告
    {
      path: '/inform/welcome',
      name: 'InformWelcome',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: Welcome
      }
    },
    {
      path: '/inform/advertise/list',
      name: 'AdvertiseList',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: AdvertiseList
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/advertise/disabled',
      name: 'AdvertiseDisabled',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: AdvertiseDisabled
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/advertise/create',
      name: 'AdvertiseCreate',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: AdvertiseCreate
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/advertise/edit',
      name: 'AdvertiseEdit',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: AdvertiseEdit
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    // 公告
    {
      path: '/inform/notice/list',
      name: 'NoticeList',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: NoticeList
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/notice/disabled',
      name: 'NoticeDisabled',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: NoticeDisabled
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/notice/create',
      name: 'NoticeCreate',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: NoticeCreate
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/notice/edit',
      name: 'NoticeEdit',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: NoticeEdit
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },

    // 资讯
    {
      path: '/inform/news/list',
      name: 'NewsList',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: NewsList
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/news/create',
      name: 'NewsCreate',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: NewsCreate
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/news/edit',
      name: 'NewsEdit',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: NewsEdit
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },
    {
      path: '/inform/news/disabled',
      name: 'NewsDisabled',
      components: {
        menubar: Menubar,
        sidebar: InformSidebar,
        content: NewsDisabled
      },
      meta: { requiresAuth: true, accessMenu: 'inform' }
    },

    // 平台设置
    // 标签管理
    {
      path: '/setting/welcome',
      name: 'SettingWelcome',
      components: {
        menubar: Menubar,
        sidebar: SettingSidebar,
        content: Welcome
      }
    },
    {
      path: '/setting/tag/list',
      name: 'Tag',
      components: {
        menubar: Menubar,
        sidebar: SettingSidebar,
        content: Tag
      },
      meta: { requiresAuth: true, accessMenu: 'setting' }
    },
    {
      path: '/setting/tag/create',
      name: 'TagCreate',
      components: {
        menubar: Menubar,
        sidebar: SettingSidebar,
        content: TagCreate
      },
      meta: { requiresAuth: true, accessMenu: 'setting' }
    },

    // 商家类型设置
    {
      path: '/setting/merchant/category/list',
      name: 'MerchantCategory',
      components: {
        menubar: Menubar,
        sidebar: SettingSidebar,
        content: MerchantCategory
      },
      meta: { requiresAuth: true, accessMenu: 'setting' }
    },
    {
      path: '/setting/merchant/category/create',
      name: 'MCategoryCreate',
      components: {
        menubar: Menubar,
        sidebar: SettingSidebar,
        content: MCategoryCreate
      },
      meta: { requiresAuth: true, accessMenu: 'setting' }
    },
    {
      path: '/setting/scale/list',
      name: 'MerchantScale',
      components: {
        menubar: Menubar,
        sidebar: SettingSidebar,
        content: MerchantScale
      },
      meta: { requiresAuth: true, accessMenu: 'setting' }
    },
    {
      path: '/setting/scale/create',
      name: 'MerchantScaleCreate',
      components: {
        menubar: Menubar,
        sidebar: SettingSidebar,
        content: MerchantScaleCreate
      },
      meta: { requiresAuth: true, accessMenu: 'setting' }
    },

    // 系统设置
    {
      path: '/system/welcome',
      name: 'SystemWelcome',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: Welcome
      }
    },
    {
      path: '/system/global/setting',
      name: 'GlobalSetting',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: GlobalSetting
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },
    {
      path: '/system/app/upgrade',
      name: 'AppUpgrade',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: AppUpgrade
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },
    {
      path: '/system/manager',
      name: 'Manager',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: Manager
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },
    {
      path: '/system/manager/create',
      name: 'ManagerCreate',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: ManagerCreate
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },
    {
      path: '/system/role',
      name: 'Role',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: Role
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },
    {
      path: '/system/role/create',
      name: 'RoleCreate',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: RoleCreate
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },
    {
      path: '/system/permission',
      name: 'Permission',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: Permission
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },
    {
      path: '/system/permission/create',
      name: 'PermissionCreate',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: PermissionCreate
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },
    {
      path: '/system/permission/role',
      name: 'PermissionRole',
      components: {
        menubar: Menubar,
        sidebar: SystemSidebar,
        content: PermissionRole
      },
      meta: { requiresAuth: true, accessMenu: 'system' }
    },

    // 代理商管理
    {
      path: '/agent/welcome',
      name: 'AgentWelcome',
      components: {
        menubar: Menubar,
        sidebar: AgentSidebar,
        content: Welcome
      }
    },
    {
      path: '/agent/list',
      name: 'AgentList',
      components: {
        menubar: Menubar,
        sidebar: AgentSidebar,
        content: AgentList
      },
      meta: { requiresAuth: true, accessMenu: 'agent' }
    },
    {
      path: '/agent/handle',
      name: 'AgentHandle',
      components: {
        menubar: Menubar,
        sidebar: AgentSidebar,
        content: AgentHandle
      },
      meta: { requiresAuth: true, accessMenu: 'agent' }
    },
    {
      path: '/agent/audit',
      name: 'AgentAudit',
      components: {
        menubar: Menubar,
        sidebar: AgentSidebar,
        content: AgentAudit
      },
      meta: { requiresAuth: true, accessMenu: 'agent' }
    },
    {
      path: '/salesman/list',
      name: 'SalesmanList',
      components: {
        menubar: Menubar,
        sidebar: AgentSidebar,
        content: SalesmanList
      },
      meta: { requiresAuth: true, accessMenu: 'agent' }
    },
    {
      path: '/agent/recharge',
      name: 'AgentRecharge',
      components: {
        menubar: Menubar,
        sidebar: AgentSidebar,
        content: AgentRecharge
      },
      meta: { requiresAuth: true, accessMenu: 'agent' }
    },
    {
      path: '/agent/recharge/list',
      name: 'AgentRechargeList',
      components: {
        menubar: Menubar,
        sidebar: AgentSidebar,
        content: AgentRechargeList
      },
      meta: { requiresAuth: true, accessMenu: 'agent' }
    },

    // 夺宝商品分类
    {
      path: '/snatch/welcome',
      name: 'SnatchWelcome',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: Welcome
      }
    },
    {
      path: '/snatch/category',
      name: 'SnatchCategory',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchCategory
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },
    {
      path: '/snatch/category/create',
      name: 'SnatchCategoryCreate',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchCategoryCreate
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },

    // 夺宝商品
    {
      path: '/snatch/goods',
      name: 'SnatchGoodsList',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchGoodsList
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },
    {
      path: '/snatch/goods/finish',
      name: 'SnatchGoodsFinish',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchGoodsFinish
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },
    {
      path: '/snatch/goods/not/finish',
      name: 'SnatchGoodsNotFinish',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchGoodsNotFinish
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },
    {
      path: '/snatch/goods/create',
      name: 'SnatchGoodsCreate',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchGoodsCreate
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },
    {
      path: '/snatch/goods/edit',
      name: 'SnatchGoodsEdit',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchGoodsEdit
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },

    // 夺宝订单
    {
      path: '/snatch/order',
      name: 'SnatchOrderList',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchOrderList
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },

    // 夺宝公告
    {
      path: '/snatch/notice/list',
      name: 'SnatchNoticeList',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchNoticeList
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },
    {
      path: '/snatch/notice/disabled',
      name: 'SnatcNoticeDisabled',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchNoticeDisabled
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },
    {
      path: '/snatch/notice/create',
      name: 'SnatcNoticeCreate',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchNoticeCreate
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },
    {
      path: '/snatch/notice/edit',
      name: 'SnatchNoticeEdit',
      components: {
        menubar: Menubar,
        sidebar: SnatchSidebar,
        content: SnatchNoticeEdit
      },
      meta: { requiresAuth: true, accessMenu: 'snatch' }
    },

    // 信息查询
    {
      path: '/infosearch/welcome',
      name: 'InfoWelcome',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: Welcome
      }
    },
    {
      path: '/infosearch/list',
      name: 'InfoSearchList',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: InfosearchList
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/list',
      name: 'AreaMember',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: AreaMember
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/member',
      name: 'MemberDetails',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: MemberDetails
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/cash',
      name: 'CashAccount',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: CashAccount
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/integral',
      name: 'IntegralAccount',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: IntegralAccount
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/areamanagement',
      name: 'AreaManagement',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: AreaManagement
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/recharge',
      name: 'RechargeDetails',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: RechargeDetails
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/pay',
      name: 'PayDetails',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: PayDetails
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/transfer',
      name: 'TransferDetails',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: TransferDetails
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/totalincome',
      name: 'TotalIncome',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: TotalIncome
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/totalspend',
      name: 'TotalSpend',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: TotalSpend
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/training',
      name: 'TrainingIncome',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: TrainingIncome
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/servicefee',
      name: 'ServicefeeIncome',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: ServicefeeIncome
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/bucklepoint',
      name: 'BucklepointIncome',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: BucklepointIncome
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/transfer',
      name: 'TransferIncome',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: TransferIncome
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/deposit',
      name: 'DepositTotal',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: DepositTotal
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/recommend',
      name: 'RecommendInfo',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: RecommendInfo
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/infosearch/depositinfo',
      name: 'DepositInfo',
      components: {
        menubar: Menubar,
        sidebar: Infosidebar,
        content: DepositInfo
      },
      meta: { requiresAuth: true, accessMenu: 'infosearch' }
    },
    {
      path: '/member/student/checking',
      name: 'StudentChecking',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: StudentChecking
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/student/pass',
      name: 'StudentPass',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: StudentPass
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/student/edit',
      name: 'StudentEdit',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: StudentEdit
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    {
      path: '/member/studentpass/check',
      name: 'StudentPassCheck',
      components: {
        menubar: Menubar,
        sidebar: MemberSidebar,
        content: StudentPassCheck
      },
      meta: { requiresAuth: true, accessMenu: 'member' }
    },
    // 商城管理
    {
      path: '/mallmanagement/welcome',
      name: 'mallmanagement',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: Welcome
      }
    },
    {
      path: '/mallmanagement/merchantmanagement',
      name: 'merchantManagement',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: merchantManagement
      },
      meta: { requiresAuth: true, accessMenu: 'mallmanagement' }
    },
    {
      path: '/mallmanagement/merchantmanagement/productdetail',
      name: 'productDetail',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: productDetail
      },
      meta: { requiresAuth: true, accessMenu: 'mallmanagement' }
    },
    {
      path: '/mallmanagement/ordermanagement',
      name: 'orderManagement',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: orderManagement
      },
      meta: { requiresAuth: true, accessMenu: 'mallmanagement' }
    },
    {
      path: '/mallmanagement/goodsmanagement',
      name: 'goodsManagement',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: goodsManagement
      },
      meta: { requiresAuth: true, accessMenu: 'mallmanagement' }
    },
    {
      path: '/mallmanagement/onlineretailerstotal',
      name: 'onlineRetailersTotal',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: onlineRetailersTotal
      },
      meta: { requiresAuth: true, accessMenu: 'mallmanagement' }
    },
    {
      path: '/mallmanagement/recommendlist',
      name: 'recommendList',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: recommendList
      },
      meta: { requiresAuth: true, accessMenu: 'mallmanagement' }
    },
    {
      path: '/mallmanagement/goods/class',
      name: 'goodsClass',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: goodsClass
      },
      meta: { requiresAuth: true, accessMenu: 'mallmanagement' }
    },
    {
      path: '/mallmanagement/goods/class/create',
      name: 'goodsClass',
      components: {
        menubar: Menubar,
        sidebar: mallSidebar,
        content: addGoodsClass
      },
      meta: { requiresAuth: true, accessMenu: 'mallmanagement' }
    }
  ]
})
