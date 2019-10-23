import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/serie/Serie'
import Settings from '@/components/settings/Settings'
import DeckTypeList from '@/components/deck/DeckTypeList'
import DeckTypeEdit from '@/components/deck/DeckTypeEdit'
import DeckList from '@/components/deck/DeckList'
import DeckEdit from '@/components/deck/DeckEdit'
import DeckChart from '@/components/deck/DeckChart'
import SerieChart from '@/components/serie/SerieChart'
import DeckTypeChart from '@/components/deck/DeckTypeChart'
import Arena from '@/components/serie/Arena'
import ArenaChart from '@/components/serie/ArenaChart'
import TipsMain from '@/components/tips/TipsMain'
import DeckTypeUpdateList from '@/components/settings/DeckTypeUpdateList'
import MyHeroes from '@/components/settings/MyHeroes'
import Pack from '@/components/pack/Pack'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { selector: to.hash }
    return { x: 0, y: 0 }
  },
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
      path: '/deckTypeEdit',
      name: 'deckTypeEdit',
      meta: {
        deckEditionRoute: true,
        backRoute: 'deckTypesList'
      },
      component: DeckTypeEdit
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
      path: '/deckEdit',
      name: 'deckEdit',
      meta: {
        deckEditionRoute: true,
        backRoute: 'deckList'
      },
      component: DeckEdit
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
    },
    {
      path: '/dtus',
      name: 'dtus',
      component: DeckTypeUpdateList
    },
    {
      path: '/myHeroes',
      name: 'myHeroes',
      component: MyHeroes
    },
    {
      path: '/pack',
      name: 'pack',
      component: Pack
    }
  ]
})
