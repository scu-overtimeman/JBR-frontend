// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import axios from './http'
// import VueAxios from 'vue-axios'
import store from './store/store'

//CSS
// Bootstrap Core CSS
import "../static/plugins/bootstrap/css/bootstrap.min.css"
// // chartist CSS
import "../static/plugins/chartist-js/dist/chartist.min.css"
import "../static/plugins/chartist-js/dist/chartist-init.css"
import "../static/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.css"
// // This page css - Morris CSS
import "../static/plugins/c3-master/c3.min.css"
// // Custom CSS
import "../static/css/style.css"
// // You can change the theme colors from here
import "../static/css/colors/blue.css"
import "../static/js/chartist"

Vue.prototype.HOME='/api'

// Vue.use(VueAxios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
