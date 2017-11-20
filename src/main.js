// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import '../static/flickity.css'
import App from './App'
import router from './router'
import store from './store'
import Icon from 'vue-awesome/components/Icon'
import VueAnalytics from 'vue-analytics'
import 'vue-awesome/icons'
import 'chart.js'
import CxltToastr from 'cxlt-vue2-toastr'

Vue.config.productionTip = false

Vue.component('icon', Icon)
Vue.use(VueAnalytics, {
  id: 'UA-101315491-1',
  router,
  autoTracking: {
    exception: true
  }
})

const toastrConfig = {
  position: 'top right',
  timeOut: 2000,
  progressBar: true,
  hideDuration: 500,
  closeButton: false,
  showMethod: 'flipInY',
  hideMethod: 'rotateOutUpRight'
}

Vue.use(CxltToastr, toastrConfig)

// FILTERS
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  mounted () {
    this.$toast.info({
      title: 'Hello',
      message: 'Welcome to Trackerstone'
    })
  }
})
