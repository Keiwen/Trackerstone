// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from 'vue-awesome/components/Icon'
import VueCookie from 'vue-cookie'
import VueAnalytics from 'vue-analytics'
import 'vue-awesome/icons'
import 'bootstrap/dist/css/bootstrap.css'
import 'chart.js'
// TODO rework toastr
/*
I dont like s4l1h/vue-toastr because of its ugly/heavy usage like this.$root.$refs.toastr.e("ERRROR MESSAGE");
cxlt-vue2-toastr is better with its this.$toast.success({})
Anyway, these libs doesnt include all feature initially in codeseven jquery lib
Maybe we could fork this and complete it (check first one too)
btw, this.$toast is defined in index/main js of the src, like Vue.prototype.$toast
Note that cxlt include a lot of nice animation but on in, message can flash after animation before timeout
*/
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

Vue.config.productionTip = false

Vue.component('icon', Icon)
Vue.use(VueCookie)
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
  hideDuration: 500,
  closeButton: false,
  hideMethod: 'rotateOutUpRight'
}

Vue.use(CxltToastr, toastrConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
