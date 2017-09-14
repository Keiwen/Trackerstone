
import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import serie from './modules/serie'
import deck from './modules/deck'
import history from './modules/history'
import messageBag from './modules/messageBag'
import createLogger from '../../node_modules/vuex/src/plugins/logger'
import * as types from './mutation-types'

import persistedState from 'vuex-persistedstate'
// tried to store in cookie with import Cookie from 'vue-cookie' but too many datas
// cookie values are limited ot 4 096 characters. Default store is around 10 000
// we could split store in different part and cookie, but
// considering variable length of deck type as simple example, should be really complex
// keep local storage for now

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
          stats[hsClass]['playedWithArena'] = getters.getArenaGamesWithClass(hsClass).length
          stats[hsClass]['wonWithArena'] = getters.getArenaGamesWonWithClass(hsClass).length
          stats[hsClass]['playedVsArena'] = getters.getArenaGamesVsClass(hsClass).length
          stats[hsClass]['wonVsArena'] = getters.getArenaGamesWonVsClass(hsClass).length
          stats[hsClass]['completeWithArena'] = getters.getArenaWithClass(hsClass).length
          stats[hsClass]['averageWinWithArena'] = getters.arenaAverageWinWithClass(hsClass)
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
          stats[idDeck]['winScoreWith'] = getters.getWinScoreWithDeck(idDeck)
          stats[idDeck]['playedWithRecent'] = getters.getGamesWithDeck(idDeck, true).length
          stats[idDeck]['wonWithRecent'] = getters.getGamesWonWithDeck(idDeck, true).length
          stats[idDeck]['winPercentWithRecent'] = getters.getWinPercentWithDeck(idDeck, true)
        }
      }
      return stats
    },
    typesStats: (state, getters) => {
      // clone classes to manipulate it, or it will change state directly
      let stats = JSON.parse(JSON.stringify(getters.types))
      for (let i = 0; i < stats.length; i++) {
        const idType = stats[i].id
        stats[i]['playedVs'] = getters.getGamesVsType(idType).length
        stats[i]['wonVs'] = getters.getGamesWonVsType(idType).length
        stats[i]['winPercentVs'] = getters.getWinPercentVsType(idType)
        stats[i]['winScoreVs'] = getters.getWinScoreVsType(idType)
        stats[i]['playedVsRecent'] = getters.getGamesVsType(idType, true).length
        stats[i]['wonVsRecent'] = getters.getGamesWonVsType(idType, true).length
        stats[i]['winPercentVsRecent'] = getters.getWinPercentVsType(idType, true)
      }
      return stats
    },
    generateDeckTitle: (state, getters) => (deck) => {
      const className = getters.className(deck.type.hsClass)
      return deck.name + ' (' + className + ' ' + deck.type.name + ')'
    },
    generateTypeTitle: (state, getters) => (type) => {
      const className = getters.className(type.hsClass)
      return className + ' ' + type.name + ' (' + type.archetype + ')'
    },
    sortList: (state, getters) => (list, field, isString) => {
      if (typeof isString === 'undefined') isString = false
      let sorted = JSON.parse(JSON.stringify(list))
      sorted = sorted.sort(function (a, b) {
        if (isString) {
          return a[field].localeCompare(b[field])
        } else {
          return a[field] > b[field]
        }
      })
      return sorted
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
    winArena ({dispatch, commit}) {
      dispatch('storeArenaGame', true)
    },
    looseArena ({dispatch, commit}) {
      dispatch('storeArenaGame', false)
    },
    closeArena ({dispatch, state, commit}) {
      const completeData = {
        win: state.serie.arenaWin,
        loss: state.serie.arenaLoss,
        hsClass: state.deck.currentArena.id
      }
      commit(types.COMPLETE_ARENA_HISTORY, completeData)
    },
    storeArenaGame ({dispatch, state, commit}, won) {
      const historyData = {
        arenaWin: state.serie.arenaWin,
        arenaLoss: state.serie.arenaLoss,
        won: won,
        player: state.deck.currentArena,
        opponent: state.deck.opponentArena
      }
      commit(types.ADD_ARENA_HISTORY, historyData)
    },
    resetState () {
      // call this.$store.dispatch('resetState') from a component action
      localStorage.removeItem(persistOptions.key)
      localStorage.removeItem('cookie:accepted')
      location.reload()
    }
  },
  modules: {
    serie, deck, history, messageBag
  },
  strict: debug,
  plugins: debug ? [createLogger(), persistedState(persistOptions)] : [persistedState(persistOptions)]
})
