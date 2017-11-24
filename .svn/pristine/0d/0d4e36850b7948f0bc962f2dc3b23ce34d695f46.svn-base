// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
// import VueAxios from 'vue-axios'
// import VueAuth from '@websanova/vue-auth'
import vuexStore from './store/store'
import BaiduMap from 'vue-baidu-map'
import VueQuillEditor from 'vue-quill-editor'
import App from './App'

import 'element-ui/lib/theme-default/index.css'
import '@/assets/css/style.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
// Vue.use(VueAxios, axios)
// axios.defaults.headers.common['Authorization'] = 'Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4ODg4XC9hcGlcL2FkbWluXC9sb2dpbiIsImlhdCI6MTQ5MzEyOTIxOCwiZXhwIjoxNDkzMTMyODE4LCJuYmYiOjE0OTMxMjkyMTgsImp0aSI6InA1Qm5aNDlKb2RIbnQ4TjkifQ.6yTMcPRK_gQNgCrxUB3Li9QMj1XRpTOh8m7RSF0qwHE}'
Vue.prototype.$axios = axios
Vue.use(VueQuillEditor)
/* 地图组件：https://dafrok.github.io/vue-baidu-map/#/start/usage */
Vue.use(BaiduMap, {ak: 'EH07OrMrG9wr6sK9mqRa8meYx3MSGgep'})

// 设置cookie,增加到vue实例方便全局调用
// vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
// 当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (cName, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 获取cookie、
function getCookie (name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}
Vue.prototype.getCookie = getCookie

// 删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: vuexStore,
  template: '<App/>',
  components: { App },
  // watch: {
  //   '$route': 'checkLogin'
  // },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      // 检查是否存在session
      // console.log(this.getCookie('session'))
      if (!this.getCookie('session')) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login')
      } else {
        // 否则跳转到登录后的页面
        // this.$router.push('/')
      }
    }
  }
})
