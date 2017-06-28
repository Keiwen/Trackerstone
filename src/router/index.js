import Vue from 'vue'
import Router from 'vue-router'
import Serie from '@/components/serie/Serie'
import SerieSet from '@/components/serie/SerieSet'
import DeckTypeSet from '@/components/deck/DeckTypeSet'
import DeckList from '@/components/deck/DeckList'
import DeckChart from '@/components/deck/DeckChart'
import SerieChart from '@/components/serie/SerieChart'

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
    },
    {
      path: '/serieChart',
      name: 'serieChart',
      component: SerieChart
    }
  ]
})
