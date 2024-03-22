// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Fastclick from 'fastclick'
// import 'lib-flexible'
import '@/Style/Miten-ui.scss'

import Axios from './api/axios'

// 引入mint-ui组件
import { Popup, DatetimePicker, Toast, Spinner, Indicator } from 'mint-ui'
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Toast.name, Toast)
Vue.component(Spinner.name, Spinner)
Vue.component(Spinner.name, Indicator)
Vue.$toast = Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator

Vue.prototype.changtoast = function (title, showtime) {//changeData是函数名
  let time = showtime || 1800
  this.$toast({
    message: title,
    position: 'bottom',
    duration: time,
    position: 'middle'
  });
}

// 显示确认选择框
Vue.prototype.showConfirm = function (setting) {
  this.$store.dispatch('alertConfirm', setting)
}
// POST 请求
Vue.prototype.$post = (url, data) => Axios({
  url,
  data
})
// GET 请求
Vue.prototype.$get = (url, data) => Axios({
  url,
  data,
  config: { method: 'get' }
})

Vue.config.productionTip = false


// 解决手机端点击延迟300毫秒
Fastclick.attach(document.body)

/* eslint-disable no-new */
let Vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default Vm