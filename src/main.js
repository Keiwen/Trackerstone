// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from 'vue-awesome/components/Icon'
import VueCookie from 'vue-cookie'
import 'vue-awesome/icons'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

Vue.component('icon', Icon)
Vue.use(VueCookie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
