import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/Serie'
import SerieSet from '@/components/SerieSet'
import DeckTypeSet from '@/components/DeckTypeSet'
import 'bootstrap/dist/css/bootstrap.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

Vue.use(Router)
Vue.component('icon', Icon)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'serie',
      component: Serie
    },
    {
      path: '/set',
      name: 'serieSet',
      component: SerieSet
    },
    {
      path: '/deckTypes',
      name: 'deckTypesSet',
      component: DeckTypeSet
    }
  ]
})
