/**
 * Created by passerby on 2017/3/30.
 */

// export const APP_URL = 'http://localhost:8888'
// 测试
// export const APP_URL = 'http://www.sobolong.cn:8888'
// 生产
export const APP_URL = 'http://slbback.sobolong.cn:8888'
export const API_URL = APP_URL + '/api'

// 商城板块 生产
export const GOODS_APP_URL = 'https://slb.sobolong.cn:8443/SoBoLongShop'
// 商城板块 测试
// export const GOODS_APP_URL = 'http://39.108.103.235:8901/SoBoLongShop'

// 会员管理
export const MEMBER_LIST_URL = API_URL + '/admin/member/list/0'
export const MEMBER_USERINFO = API_URL + '/admin/member/userinfo'
export const MEMBER_EDIT_URL = API_URL + '/admin/member/edit'
export const MEMBER_STATUS_URL = API_URL + '/admin/member/status'
export const MEMBER_DISABLED_LIST_URL = API_URL + '/admin/member/list/1'
export const MEMBER_SEARCH_URL = API_URL + '/admin/member/search'

export const MEMBER_PROTECT_RESET = API_URL + '/admin/member/protect/reset'

export const MEMBER_BANKCARD_LIST_URL = API_URL + '/admin/bankcard/list'
export const BANKCARD_SEARCH_URL = API_URL + '/admin/bankcard/search'

export const BANKCARD_APPLY_LIST = API_URL + '/admin/bankcard/apply/list'
export const BANKCARD_APPLY_SEARCH = API_URL + '/admin/bankcard/apply/search'
export const BANKCARD_AUDIT = API_URL + '/admin/bankcard/apply/audit'

// 会员推荐人信息
export const MEMBER_NO_SUPERIOR = API_URL + '/admin/member/superior/non'
export const MEMBER_SUPERIOR_ALLOC = API_URL + '/admin/member/superior/allocate'
export const MEMBER_SUPERIOR_SEARCH = API_URL + '/admin/member/superior/search'

// 会员积分
export const MEMBER_INTEGRAL_LIST = API_URL + '/admin/member/integral/list'
export const MEMBER_INTEGRAL_SEARCH = API_URL + '/admin/member/integral/search'

// 商家申请
export const MERCHANT_APPLY_LIST = API_URL + '/admin/merchant/apply/list'
export const MERCHANT_APPLY_INFO = API_URL + '/admin/merchant/apply/info'
export const MERCHANT_APPLY_AUDIT_INFO = API_URL + '/admin/merchant/apply/audit/info'
export const MERCHANT_APPLY_EDIT = API_URL + '/admin/merchant/apply/edit'
export const MERCHANT_APPLY_IMAGE_UPLOAD = API_URL + '/admin/merchant/apply/image/upload'
export const MERCHANT_APPLY_IMAGE_DEL = API_URL + '/admin/merchant/apply/image/delete'
export const MERCHANT_APPLY_SEARCH = API_URL + '/admin/merchant/apply/search'

// 商家审核
export const MERCHANT_AUDIT_LIST = API_URL + '/admin/merchant/audit/list'
export const MERCHANT_AUDIT_INFO = API_URL + '/admin/merchant/audit/info'
export const MERCHANT_AUDIT_EDIT = API_URL + '/admin/merchant/audit/edit'
export const MERCHANT_AUDIT_SEARCH = API_URL + '/admin/merchant/audit/search'

// 商家管理
export const MERCHANT_LIST = API_URL + '/admin/merchant/list'
export const MERCHANT_DISABLED_LIST = API_URL + '/admin/merchant/list/2'
export const MERCHANT_REFUSED_LIST = API_URL + '/admin/merchant/audit/2'
export const MERCHANT_STATUS = API_URL + '/admin/merchant/status'
export const MERCHANT_INFO = API_URL + '/admin/merchant/info'
export const MERCHANT_EDIT_URL = API_URL + '/admin/merchant/edit'
export const MERCHANT_SEARCH_URL = API_URL + '/admin/merchant/search'

export const MERCHANT_IMAGE_UPLOAD_URL = API_URL + '/admin/merchant/image/upload'
export const MERCHANT_SLIDER_IMG_URL = API_URL + '/admin/merchant/slider/upload'
export const MERCHANT_IMAGE_DEL_URL = API_URL + '/admin/merchant/image/delete'
export const MERCHANT_SLIDER_DEL_URL = API_URL + '/admin/merchant/slider/delete'

// 待上线商家
export const MERCHANT_WAIT_ONLINE = API_URL + '/admin/merchant/wait/online'
export const MERCHANT_WAIT_ONLINE_INFO = API_URL + '/admin/merchant/wait/online/info'
export const MERCHANT_WAIT_ONLINE_SEARCH = API_URL + '/admin/merchant/wait/online/search'
export const MERCHANT_ONLINE = API_URL + '/admin/merchant/online'
export const MERCHANT_WAIT_ONLINE_IMAGE_UPLOAD = API_URL + '/admin/merchant/wait/online/image/upload'
export const MERCHANT_WAIT_ONLINE_SLIDER_IMG = API_URL + '/admin/merchant/wait/online/slider/upload'
export const MERCHANT_WAIT_ONLINE_IMAGE_DEL = API_URL + '/admin/merchant/wait/online/image/delete'
export const MERCHANT_WAIT_ONLINE_SLIDER_DEL = API_URL + '/admin/merchant/wait/online/slider/delete'

// 商家充值
export const MEMBER_RECHARGE_LIST = API_URL + '/admin/member/recharge/list'
export const MEMBER_RECHARGE_USERINFO = API_URL + '/admin/member/recharge/userinfo'
export const MEMBER_RECHARGE_SEARCH = API_URL + '/admin/member/recharge/search'

// 财务管理
export const WITHDRAW_LIST_URL = API_URL + '/admin/withdraw/list'
export const WITHDRAW_APPLY_URL = API_URL + '/admin/withdraw/apply'
export const WITHDRAW_AUDIT = API_URL + '/admin/withdraw/audit'
export const WITHDRAW_HANDLE_LIST = API_URL + '/admin/withdraw/handle/list'
export const WITHDRAW_HANDLE = API_URL + '/admin/withdraw/handle'
export const WITHDRAW_STATUS_URL = API_URL + '/admin/withdraw/status'
export const WITHDRAW_SEARCH_URL = API_URL + '/admin/withdraw/search'
export const WITHDRAW_EXPORT = API_URL + '/admin/withdraw/export'

export const BAIDU_MAP_URL = 'http://api.map.baidu.com'
export const MEMBER_WITHDRAW_URL = API_URL + '/admin/withdraw/list'

// 后台转账
export const OFFLINE_TRANSFER_LIST = API_URL + '/admin/offline/transfer/list'
export const OFFLINE_TRANSFER_AUDIT_LIST = API_URL + '/admin/offline/transfer/audit/list'
export const OFFLINE_TRANSFER_SEARCH = API_URL + '/admin/offline/transfer/search'
export const OFFLINE_TRANSFER_AUDIT = API_URL + '/admin/offline/transfer/audit'
export const OFFLINE_TRANSFER_APPLY = API_URL + '/admin/offline/transfer/apply'

// 后台充值
export const OFFLINE_RECHARGE_LIST = API_URL + '/admin/offline/recharge/list'
export const OFFLINE_RECHARGE_AUDIT_LIST = API_URL + '/admin/offline/recharge/audit/list'
export const OFFLINE_RECHARGE_SEARCH = API_URL + '/admin/offline/recharge/search'
export const OFFLINE_RECHARGE_AUDIT = API_URL + '/admin/offline/recharge/audit'
export const OFFLINE_RECHARGE_APPLY = API_URL + '/admin/offline/recharge/apply'

// 消费订单相关
export const CONSUMPTION_AUDIT_URL = API_URL + '/admin/consumption/order/audit'
export const CONSUMPTION_ORDER_STATUS_URL = API_URL + '/admin/consumption/order/status'
export const CONSUMPTION_ORDER_AUDIT = API_URL + '/admin/consumption/order/audit'
export const CONSUMPTION_ORDER_URL = API_URL + '/admin/consumption/order/list'
export const CONSUMPTION_ORDER_PAY_URL = API_URL + '/admin/consumption/pay/list'
export const CONSUMPTION_ORDER_SEARCH_URL = API_URL + '/admin/consumption/order/search'
export const CONSUMPTION_ORDER_PAY_SEARCH_URL = API_URL + '/admin/consumption/pay/search'

// 广告管理
export const ADV_IMAGE_UPLOAD_URL = API_URL + '/admin/adv/image/upload'
export const ADV_IMAGE_DELETE_URL = API_URL + '/admin/adv/image/delete'
export const ADV_LIST_URL = API_URL + '/admin/adv/list'
export const ADV_CREATE_URL = API_URL + '/admin/adv/create'
export const ADV_EDIT_URL = API_URL + '/admin/adv/edit'
export const ADV_SEARCH_URL = API_URL + '/admin/adv/search'
export const ADV_STATUS_URL = API_URL + '/admin/adv/status'

// 公告管理
export const NOTICE_LIST_URL = API_URL + '/admin/notice/list/1'
export const NOTICE_DISABLED_URL = API_URL + '/admin/notice/list/0'
export const NOTICE_EDIT_URL = API_URL + '/admin/notice/edit'
export const NOTICE_CREATE_URL = API_URL + '/admin/notice/create'
export const NOTICE_STATUS_URL = API_URL + '/admin/notice/status'
export const NOTICE_SEARCH_URL = API_URL + '/admin/notice/search'

// 资讯管理
export const NEWS_LIST_URL = API_URL + '/admin/news/list/1'
export const NEWS_DISABLED_URL = API_URL + '/admin/news/list/0'
export const NEWS_STATUS = API_URL + '/admin/news/status'
export const NEWS_CREATE_URL = API_URL + '/admin/news/create'
export const NEWS_EDIT_URL = API_URL + '/admin/news/edit'
export const NEWS_SEARCH_URL = API_URL + '/admin/news/search'
export const NEWS_STATUS_URL = API_URL + '/admin/news/status'
export const NEWS_SEARCH_RECOMMEND_URL = API_URL + '/admin/news/search/recommends'
export const NEWS_IMAGE_UPLOAD_URL = API_URL + '/admin/news/image/upload'
export const NEWS_IMAGE_DELETE_URL = API_URL + '/admin/news/image/delete'

// 标签管理
export const TAG_LIST_URL = API_URL + '/admin/tag/list'
export const TAG_CREATE_URL = API_URL + '/admin/tag/create'
export const TAG_EDIT_URL = API_URL + '/admin/tag/edit'
export const TAG_IMAGE_UPLOAD_URL = API_URL + '/admin/tag/image/upload'
export const TAG_IMAGE_DELETE_URL = API_URL + '/admin/tag/image/delete'
export const TAG_SHOW_URL = API_URL + '/admin/tag/show'

// 激励奖励
export const XINCOIN_LIST_URL = API_URL + '/admin/reward/xincoin/list'
export const XINCOIN_SEND_URL = API_URL + '/admin/reward/xincoin/send'
export const XINCOIN_SEARCH_URL = API_URL + '/admin/xincoin/search'

// 平台设置
export const MERCHANT_CATEGORY_LIST_URL = API_URL + '/admin/merchant/category/list'
export const MERCHANT_CATEGORY_CREATE_URL = API_URL + '/admin/merchant/category/create'
export const MERCHANT_CATEGORY_EDIT_URL = API_URL + '/admin/merchant/category/edit'
export const MERCHANT_CATEGORY_IMAGE_UPLOAD_URL = API_URL + '/admin/merchant/category/image/upload'
export const MERCHANT_CATEGORY_IMAGE_DELETE_URL = API_URL + '/admin/merchant/category/image/delete'
export const MERCHANT_CATEGORY_SHOW_URL = API_URL + '/admin/merchant/category/show'

export const MERCHANT_SCALE_LIST = API_URL + '/admin/merchant/scale/list'
export const MERCHANT_SCALE_EDIT = API_URL + '/admin/merchant/scale/edit'
export const MERCHANT_SCALE_CREATE = API_URL + '/admin/merchant/scale/create'
export const MERCHANT_SCALE_SHOW = API_URL + '/admin/merchant/scale/show'

// 系统管理
export const SYSTEM_MANAGER_LIST = API_URL + '/admin/system/manager/list'
export const SYSTEM_MANAGER_REGISTER = API_URL + '/admin/system/manager/register'
export const SYSTEM_MANAGER_EDIT = API_URL + '/admin/system/manager/edit'
export const SYSTEM_MANAGER_PERSONAL = API_URL + '/admin/system/manager/personal'
export const SYSTEM_MANAGER_ENABLED = API_URL + '/admin/system/manager/enabled'

export const SYSTEM_ROLE_LIST = API_URL + '/admin/system/role/list'
export const SYSTEM_ROLE_EDIT = API_URL + '/admin/system/role/edit'
export const SYSTEM_ROLE_CREATE = API_URL + '/admin/system/role/create'
export const SYSTEM_ROLE_USER = API_URL + '/admin/system/manager/roleuser'

export const SYSTEM_PERMISSION_LIST = API_URL + '/admin/system/permission/list'
export const SYSTEM_PERMISSION_EDIT = API_URL + '/admin/system/permission/edit'
export const SYSTEM_PERMISSION_CREATE = API_URL + '/admin/system/permission/create'
export const SYSTEM_PERMISSION_ALLOC = API_URL + '/admin/system/permission/alloc'

// 搜索自动完成
export const AUTOCOMPLETE_AREA = API_URL + '/admin/autocomplete/area'
export const AUTOCOMPLETE_MERCHANT = API_URL + '/admin/autocomplete/merchant'
export const AUTOCOMPLETE_USER_PHONE = API_URL + '/admin/autocomplete/user/phone'
export const AUTOCOMPLETE_MERCHANT_PHONE = API_URL + '/admin/autocomplete/merchant/phone'

// 登录
export const LOGIN = API_URL + '/admin/login'

// 统计信息
export const DASHBOARD_STATISTIC = API_URL + '/admin/dashboard/statistic'
export const DASHBOARD_MEMBER = API_URL + '/admin/dashboard/member'
export const DASHBOARD_MERCHANT = API_URL + '/admin/dashboard/merchant'
export const DASHBOARD_SEARCH = API_URL + '/admin/dashboard/statistic'

// 字典设置
export const SETTING_MENUS = API_URL + '/admin/setting/menus'
export const SETTING_AGENT_SCALE = API_URL + '/admin/setting/agent/scale'

/*
 * 代理商
 */
export const AGENT_LIST = API_URL + '/admin/agent/list'
export const AGENT_EDIT = API_URL + '/admin/agent/edit'
export const AGENT_AUDIT = API_URL + '/admin/agent/audit'
export const AGENT_STATUS = API_URL + '/admin/agent/status'
export const AGENT_DISABLE = API_URL + '/admin/agent/disable'
export const AGENT_FREEZE = API_URL + '/admin/agent/freeze'
export const AGENT_RECHARGE = API_URL + '/admin/agent/recharge'
export const AGENT_RECHARGE_LIST = API_URL + '/admin/agent/recharge/list'
export const AGENT_RECHARGE_SEARCH = API_URL + '/admin/agent/recharge/search'
export const SALESMAN_LIST = API_URL + '/admin/salesman/list'
export const AGENT_SEARCH = API_URL + '/admin/agent/search'
export const AGENT_AUDIT_SEARCH = API_URL + '/admin/agent/audit/search'
export const SALESMAN_SEARCH = API_URL + '/admin/salesman/search'

/*
 * 夺宝
 */
// 商品分类
export const SNATCH_CATEGORY_LIST = API_URL + '/admin/snatch/category/list'
export const SNATCH_CATEGORY_CREATE = API_URL + '/admin/snatch/category/create'
export const SNATCH_CATEGORY_EDIT = API_URL + '/admin/snatch/category/edit'
export const SNATCH_CATEGORY_IMAGE_UPLOAD = API_URL + '/admin/snatch/category/image/upload'
export const SNATCH_CATEGORY_IMAGE_DELETE = API_URL + '/admin/snatch/category/image/delete'
export const SNATCH_CATEGORY_SHOW = API_URL + '/admin/snatch/category/show'

// 夺宝商品
export const SNATCH_GOODS_LIST = API_URL + '/admin/snatch/goods/list'
export const SNATCH_GOODS_INFO = API_URL + '/admin/snatch/goods/info'
export const SNATCH_IMAGE_UPLOAD = API_URL + '/admin/snatch/goods/image/upload'
export const SNATCH_IMAGE_DELETE = API_URL + '/admin/snatch/goods/image/delete'
export const SNATCH_GOODS_EDIT = API_URL + '/admin/snatch/goods/edit'
export const SNATCH_GOODS_SEARCH = API_URL + '/admin/snatch/goods/search'
export const SNATCH_GOODS_CREATE = API_URL + '/admin/snatch/goods/create'
export const SNATCH_GOODS_CATEGORY = API_URL + '/admin/snatch/goods/category'
export const SNATCH_RECEIVE = API_URL + '/admin/snatch/goods/received'

export const SNATCH_RUN_LOTTERY = API_URL + '/admin/snatch/runlottery'
export const SNATCH_REINFORCE = API_URL + '/admin/snatch/reinforce'
export const SNATCH_REFUND = API_URL + '/admin/snatch/refund'

// 夺宝订单
export const SNATCH_ORDER_LIST = API_URL + '/admin/snatch/order/list'
export const SNATCH_ORDER_USER = API_URL + '/admin/snatch/order/user'
export const SNATCH_ORDER_SEARCH = API_URL + '/admin/snatch/order/search'

// 夺宝公告
export const SNATCH_NOTICE_LIST = API_URL + '/admin/snatch/notice/list/1'
export const SNATCH_NOTICE_DISABLED = API_URL + '/admin/snatch/notice/list/0'
export const SNATCH_NOTICE_EDIT = API_URL + '/admin/snatch/notice/edit'
export const SNATCH_NOTICE_CREATE = API_URL + '/admin/snatch/notice/create'
export const SNATCH_NOTICE_STATUS = API_URL + '/admin/snatch/notice/status'
export const SNATCH_NOTICE_SEARCH = API_URL + '/admin/snatch/notice/search'

// =========================================================================================

// 信息查询
export const INFOSEARCH_LIST = API_URL + '/admin/member/getMemerSummary'

// 客户明细
export const MEMBERDETAILS_SEARCH = API_URL + '/admin/member/getMemberInfo'

// 客户现金账户查询
export const CASHINFO_SEARCH = API_URL + '/admin/member/getMembeCashInfo'

// 客户积分账户查询
export const INTEGRAL_SEARCH = API_URL + '/admin/member/getMemberIntegralInfo'

// 区域经营情况
export const AREAMANAGE_SEARCH = API_URL + '/admin/member/getMemberBusiness'
// 充值明细
export const RECHARGE_SEARCH = API_URL + '/admin/member/getMangeRecharge'
// 消费明细
export const PAY_SEARCH = API_URL + '/admin/member/getMangeChant'
// 转账明细
export const TRANSFER_SEARCH = API_URL + '/admin/member/getMangeTransfer'
// 培训费收入
export const TRAINING_SEARCH = API_URL + '/admin/member/getTrain'
// 代理商保证金汇总
export const DEPOSIT_SEARCH = API_URL + '/admin/member/getAgentMarginSum'
// 推荐明细
export const VIPRECOMMEND_SEARCH = API_URL + '/admin/member/getSpreadDetail'
// 保证金详情
export const DEPOSITDETAIL_SEARCH = API_URL + '/admin/member/getAgentDetail'
// 平台总收入
export const TOTALINCOME_SEARCH = API_URL + '/admin/member/getIncomeSum'
// 大学生计划
export const GET_STUDENTINFO = API_URL + '/admin/MemberCheck/getStudents'
export const SET_STUDENTINFO = API_URL + '/admin/MemberCheck/setStudents'

// 商城板块
export const GET_LIST = GOODS_APP_URL + '/admin/member/shoporder/get_list.jhtml'
// /admin/member/merchant/manager.jhtml
export const GET_MERCHANT_MANAGER = GOODS_APP_URL + '/admin/member/merchant/manager.jhtml'
// 商品管理默认查询
export const GET_GOODS_BY_MERCHANT = GOODS_APP_URL + '/admin/member/merchant/goods_by_merchant.jhtml'
// 电商统计
export const GET__RETAILERS_COUNT = GOODS_APP_URL + '/admin/member/count.jhtml'
// 商户管理-禁用/启用
export const GET__MERCHANT_DISABLE = GOODS_APP_URL + '/admin/member/merchant/disable.jhtml'

export const SEARCH_GOODSALL = GOODS_APP_URL + '/admin/member/goods/list_all'
// 商品名称查询
export const SEARCH_GOODSNAMES = GOODS_APP_URL + '/admin/member/goods/list_by_name'
export const SEARCH_GOODSINFOMORE = GOODS_APP_URL + '/admin/member/goods/get_detail'
// 按商家查询
export const SEARCH_GOODSBYMERCHANT = GOODS_APP_URL + '/admin/member/goods/list_by_merchant'
// 删除
export const DELATE_GOODS = GOODS_APP_URL + '/admin/member/goods/delete'
// 商品恢复
export const RECOVERY_GOODS = GOODS_APP_URL + '/admin/member/goods/recover'
// 商品分类
export const GET_GOODSCLASS = GOODS_APP_URL + '/admin/category/get_list'
// 创建商品分类
export const CREATE_GOODSCLASS = GOODS_APP_URL + '/admin/category/create'
// 上传图片url
export const GOODS_UPLOAD = 'http://119.29.163.170:8080/SoBoLongWeb/manage/file/upload.jhtml'
// 商品分类编辑
export const MODIFY_GOODSCLASS = GOODS_APP_URL + '/admin/category/update'
// 手动刷新数据
export const REFRESH_MALLDATA = GOODS_APP_URL + '/admin/es/refresh'
