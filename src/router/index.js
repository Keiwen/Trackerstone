import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/Serie'
import SerieSet from '@/components/SerieSet'
import DeckArchetypeSet from '@/components/DeckArchetypeSet'
import DeckList from '@/components/DeckList'
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
      path: '/deckArchetypes',
      name: 'deckArchetypesSet',
      component: DeckArchetypeSet
    },
    {
      path: '/deckList',
      name: 'deckList',
      component: DeckList
    }
  ]
})
