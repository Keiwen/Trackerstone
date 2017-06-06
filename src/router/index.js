import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/Serie'
import SerieSet from '@/components/SerieSet'
import DeckArchetypeSet from '@/components/DeckArchetypeSet'
import DeckList from '@/components/DeckList'

Vue.use(Router)

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
