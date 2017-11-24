import Vue from 'vue'
import Vuex from 'vuex'
import { MEMBER_INFO, MERCHANT_INFO, ADVERTISE_INFO, NOTICE_INFO, NEWS_INFO, LOGIN_TOKEN, LOGIN_ROLE, PERMISSION_ROLE,
         MENU_OPTIONS, LOGIN_MENUS, MERCHANT_APPLY_INFO, SNATCH_GOODS, SNATCH_NOTICE_INFO, STUDENT_INFO, MERCHANT_MANAGEMENT_INFO } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    role: [],
    menus: '',
    tableHeight: 641,
    member: {},
    merchant: {},
    merchantApply: {},
    snatchGoods: {},
    advertise: {},
    notice: {},
    snatchNotice: {},
    news: {},
    permissionRole: {},
    menuOptions: [],
    student: {},
    id: {},
    withdrawStatus: [
      {value: 0, label: '待审核'},
      {value: 2, label: '提现失败'},
      {value: 3, label: '提现成功'},
      {value: 4, label: '待付款'}],
    rechargeExplain: [
      {value: 0, label: '常规充值'},
      {value: 1, label: '公司赠送'}],
    rechargeType: [
      {value: 0, label: '现金充值'},
      {value: 1, label: '积分充值'}],
    merchantOrderStatus: [
      {value: 0, label: '等待付款'},
      {value: 1, label: '等待审核'},
      {value: 2, label: '订单异常'},
      {value: 3, label: '等待核实'},
      {value: 4, label: '返现中'},
      {value: 5, label: '返现完成'}],
    payStatus: [
      {value: 0, label: '等待支付'},
      {value: 1, label: '支付成功'},
      {value: 2, label: '支付失败'}],
    payWay: [
      {value: 0, label: '线下'},
      {value: 1, label: '微信'},
      {value: 2, label: '支付宝'},
      {value: 3, label: '余额'}],
    adTypes: [
      {value: 0, label: '图片广告'},
      {value: 1, label: '详细内容'}],
    adLocations: [
      {value: 0, label: '页头'},
      {value: 1, label: '页中'},
      {value: 2, label: '页尾'}],
    shopTypes: [
      {value: 1, label: '区代理'},
      {value: 2, label: '市代理'},
      {value: 3, label: '省代理'},
      {value: 4, label: '国代理'}],
    adStatus: [
      {value: 0, label: '等待'},
      {value: 1, label: '上架'},
      {value: 2, label: '下架'}],
    noticeType: [
      {value: 0, label: '系统'},
      {value: 1, label: '个人'},
      {value: 2, label: '商户'},
      {value: 3, label: '消费者'},
      {value: 4, label: '区代理'},
      {value: 5, label: '省代理'}],
    snatchNoticeType: [
      {value: 0, label: '系统'},
      {value: 1, label: '个人'}],
    returnType: [
      {value: 0, label: '消费者推荐奖励'},
      {value: 1, label: '商家推荐奖励'},
      {value: 2, label: '消费者返现'},
      {value: 3, label: '商家返现'}],
    returnStatus: [
      {value: 0, label: '等待领取'},
      {value: 1, label: '已过期'},
      {value: 2, label: '成功领取'}],
    snatchStatus: [
      {value: 2, label: '正在进行'},
      {value: 3, label: '等待开奖'}]
  },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [MEMBER_INFO] (state, member) {
      // mutate state
      state.member = member
    },
    [MERCHANT_INFO] (state, merchant) {
      // mutate state
      state.merchant = merchant
      // console.log(state.merchant)
    },
    [MERCHANT_APPLY_INFO] (state, merchantApply) {
      // mutate state
      state.merchantApply = merchantApply
      // console.log(state.merchantApply)
    },
    [ADVERTISE_INFO] (state, advertise) {
      // mutate state
      state.advertise = advertise
    },
    [NOTICE_INFO] (state, notice) {
      // mutate state
      state.notice = notice
    },
    [NEWS_INFO] (state, news) {
      // mutate state
      state.news = news
    },
    [SNATCH_GOODS] (state, goods) {
      // mutate state
      state.snatchGoods = goods
    },
    [LOGIN_TOKEN] (state, token) {
      // mutate state
      state.token = token
    },
    [LOGIN_ROLE] (state, role) {
      // mutate state
      state.role = '__' + role
      // console.log(state.role)
    },
    [LOGIN_MENUS] (state, menus) {
      // mutate state
      state.menus = '__' + menus
    },
    [PERMISSION_ROLE] (state, role) {
      // mutate state
      state.permissionRole = role
      // console.log(state.role)
    },
    [MENU_OPTIONS] (state, menus) {
      // mutate state
      state.menuOptions = menus
    },
    [SNATCH_NOTICE_INFO] (state, notice) {
      // mutate state
      state.snatchNotice = notice
    },
    [STUDENT_INFO] (state, student) {
      // mutate state
      state.student = student
    },
    [MERCHANT_MANAGEMENT_INFO] (state, id) {
      // mutate state
      state.id = id
    }
  }
})
