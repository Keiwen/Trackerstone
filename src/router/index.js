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
import TipsMain from '@/components/tips/TipsMain'

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
      meta: {
        chartRoute: true,
        backRoute: 'deckList'
      },
      component: DeckChart
    },
    {
      path: '/serieChart',
      name: 'serieChart',
      meta: {
        chartRoute: true,
        backRoute: 'serie'
      },
      component: SerieChart
    },
    {
      path: '/arenaChart',
      name: 'arenaChart',
      meta: {
        chartRoute: true,
        backRoute: 'arena'
      },
      component: ArenaChart
    },
    {
      path: '/deckTypeChart',
      name: 'deckTypeChart',
      meta: {
        chartRoute: true,
        backRoute: 'deckTypesList'
      },
      component: DeckTypeChart
    },
    {
      path: '/tips',
      name: 'tips',
      component: TipsMain
    }
  ]
})
