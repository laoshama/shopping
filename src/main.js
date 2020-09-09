import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
//  配置全局地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前在请求头加上token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
