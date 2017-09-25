import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/serie/Serie'
import Settings from '@/components/settings/Settings'
import DeckTypeList from '@/components/deck/DeckTypeList'
import DeckList from '@/components/deck/DeckList'
import DeckChart from '@/components/deck/DeckChart'
import SerieChart from '@/components/serie/SerieChart'
import DeckTypeChart from '@/components/deck/DeckTypeChart'
import Arena from '@/components/serie/Arena'
import ArenaChart from '@/components/serie/ArenaChart'

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
      path: '/settings',
      name: 'settings',
      component: Settings
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
      path: '/arenaChart',
      name: 'arenaChart',
      component: ArenaChart
    },
    {
      path: '/deckTypeChart',
      name: 'deckTypeChart',
      component: DeckTypeChart
    }
  ]
})
