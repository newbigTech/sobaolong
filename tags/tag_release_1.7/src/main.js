// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../theme/index.css'

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
import VueLazyload from 'vue-lazyload'

import 'element-ui/lib/theme-default/index.css'
import '@/assets/css/style.css'

Vue.config.productionTip = false
Vue.config.debug = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueLazyload)
// Vue.use(VueAxios, axios)
// axios.defaults.headers.common['Authorization'] = 'Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4ODg4XC9hcGlcL2FkbWluXC9sb2dpbiIsImlhdCI6MTQ5MzEyOTIxOCwiZXhwIjoxNDkzMTMyODE4LCJuYmYiOjE0OTMxMjkyMTgsImp0aSI6InA1Qm5aNDlKb2RIbnQ4TjkifQ.6yTMcPRK_gQNgCrxUB3Li9QMj1XRpTOh8m7RSF0qwHE}'
Vue.prototype.$axios = axios
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  console.log(error.response.status)
  if (error.response.status === 401) {
    router.push('/login')
    return
  }
  if (error.response.status === 500) {
    ElementUI.Message.error('服务器出错啦，请联系技术人员！')
    return
  }
  // Do something with response error
  return Promise.reject(error)
})

Vue.use(VueQuillEditor)
/* 地图组件：https://dafrok.github.io/vue-baidu-map/#/start/usage */
Vue.use(BaiduMap, {ak: 'EH07OrMrG9wr6sK9mqRa8meYx3MSGgep'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: vuexStore,
  template: '<App/>',
  components: { App },
  watch: {
    '$route': 'checkLogin'
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      // 检查是否存在token
      if (!this.$store.state.token) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login')
      } else {
        // 否则跳转到登录后的页面
        // this.$router.push('/')
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    var check = to.matched.some(record => {
      const menu = record.meta.accessMenu
      var result = false
      if (vuexStore.state.role.indexOf('superadmin') > 0) {
        result = true
      } else if (vuexStore.state.menus.indexOf(menu) > 0) {
        result = true
      }
      return result
    })
    if (!check) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
