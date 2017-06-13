
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
//  getters,
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
