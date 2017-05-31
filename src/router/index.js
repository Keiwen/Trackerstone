import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/Serie'
import 'bootstrap/dist/css/bootstrap.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

Vue.use(Router)
Vue.component('icon', Icon)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Serie',
      component: Serie
    }
  ]
})
