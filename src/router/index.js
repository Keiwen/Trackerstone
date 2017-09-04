import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/serie/Serie'
import SerieSet from '@/components/serie/SerieSet'
import DeckTypeList from '@/components/deck/DeckTypeList'
import DeckList from '@/components/deck/DeckList'
import DeckChart from '@/components/deck/DeckChart'
import SerieChart from '@/components/serie/SerieChart'
import DeckTypeChart from '@/components/deck/DeckTypeChart'
import Arena from '@/components/serie/Arena'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'serie',
      component: Serie
    },
    {
      path: '/arena',
      name: 'arena',
      component: Arena
    },
    {
      path: '/set',
      name: 'serieSet',
      component: SerieSet
    },
    {
      path: '/deckTypes',
      name: 'deckTypesList',
      component: DeckTypeList
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
    },
    {
      path: '/serieChart',
      name: 'serieChart',
      component: SerieChart
    },
    {
      path: '/deckTypeChart',
      name: 'deckTypeChart',
      component: DeckTypeChart
    }
  ]
})
