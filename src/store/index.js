
import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import serie from './modules/serie'
import deck from './modules/deck'
import history from './modules/history'
import createLogger from '../../node_modules/vuex/src/plugins/logger'
import * as types from './mutation-types'

import persistedState from 'vuex-persistedstate'
// tried to store in cookie with import Cookie from 'vue-cookie' but not well updated

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const persistOptions = {
  key: 'trackerstone'
}

export default new Vuex.Store({
  getters: {
    classStats: (state, getters) => {
      // clone classes to manipulate it, or it will change state directly
      let stats = JSON.parse(JSON.stringify(getters.classes))
      for (let hsClass in stats) {
        if (stats.hasOwnProperty(hsClass)) {
          stats[hsClass]['playedWith'] = getters.getGamesWithClass(hsClass).length
          stats[hsClass]['wonWith'] = getters.getGamesWonWithClass(hsClass).length
          stats[hsClass]['playedVs'] = getters.getGamesVsClass(hsClass).length
          stats[hsClass]['wonVs'] = getters.getGamesWonVsClass(hsClass).length
        }
      }
      return stats
    },
    deckStats: (state, getters) => {
      // clone classes to manipulate it, or it will change state directly
      let stats = JSON.parse(JSON.stringify(getters.own))
      for (let idDeck in stats) {
        if (stats.hasOwnProperty(idDeck)) {
          stats[idDeck]['playedWith'] = getters.getGamesWithDeck(idDeck).length
          stats[idDeck]['wonWith'] = getters.getGamesWonWithDeck(idDeck).length
          stats[idDeck]['winPercentWith'] = getters.getWinPercentWithDeck(idDeck)
          stats[idDeck]['playedWithRecent'] = getters.getGamesWithDeck(idDeck, true).length
          stats[idDeck]['wonWithRecent'] = getters.getGamesWonWithDeck(idDeck, true).length
          stats[idDeck]['winPercentWithRecent'] = getters.getWinPercentWithDeck(idDeck, true)
        }
      }
      return stats
    }
  },
  actions: {
    win ({dispatch}) {
      dispatch('storeGame', true)
    },
    loose ({dispatch}) {
      dispatch('storeGame', false)
    },
    storeGame ({dispatch, state, commit}, won) {
      const historyData = {
        rank: state.serie.rank,
        stars: state.serie.stars,
        won: won,
        deck: state.deck.current,
        opponent: state.deck.opponent
      }
      commit(types.ADD_HISTORY, historyData)
    },
    resetState () {
      // call this.$store.dispatch('resetState') from a component action
      localStorage.removeItem(persistOptions.key)
      localStorage.removeItem('cookie:accepted')
      location.reload()
    }
  },
  modules: {
    serie, deck, history
  },
  strict: debug,
  plugins: debug ? [createLogger(), persistedState(persistOptions)] : [persistedState(persistOptions)]
})
