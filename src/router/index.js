import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/Serie'
import SerieSet from '@/components/SerieSet'
import DeckTypeSet from '@/components/DeckTypeSet'
import DeckList from '@/components/DeckList'
import DeckChart from '@/components/DeckChart'

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
      path: '/deckTypes',
      name: 'deckTypesSet',
      component: DeckTypeSet
    },
    {
      path: '/deckList',
      name: 'deckList',
      component: DeckList
    },
    {
      path: '/deckChart',
      name: 'deckChart',
      component: DeckChart
    }
  ]
})
