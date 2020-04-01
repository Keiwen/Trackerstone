
import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import OTM from '@/assets/db/otm.json'
import serie from './modules/serie'
import deck from './modules/deck'
import history from './modules/history'
import messageBag from './modules/messageBag'
import pack from './modules/pack'
import createLogger from '../../node_modules/vuex/dist/logger'
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

const DECK_TITLE_LIMIT = 20

export default new Vuex.Store({
  getters: {
    oneTimeMessages: state => OTM,
    dataExport: (state) => {
      return JSON.stringify(state)
    },
    classStats: (state, getters) => {
      // clone classes to manipulate it, or it will change state directly
      let stats = JSON.parse(JSON.stringify(getters.classes))
      for (let hsClass in stats) {
        if (stats.hasOwnProperty(hsClass)) {
          stats[hsClass]['playedWith'] = getters.getGamesWithClass(hsClass).length
          stats[hsClass]['wonWith'] = getters.getGamesWonWithClass(hsClass).length
          const playedVs = getters.getGamesVsClass(hsClass)
          stats[hsClass]['playedVs'] = playedVs.length
          stats[hsClass]['playedVsCurrent'] = getters.getGamesVsWithDeck(playedVs, getters.current.id).length
          const wonVs = getters.getGamesWonVsClass(hsClass)
          stats[hsClass]['wonVs'] = wonVs.length
          stats[hsClass]['wonVsCurrent'] = getters.getGamesVsWithDeck(wonVs, getters.current.id).length
          stats[hsClass]['playedWithArena'] = getters.getArenaGamesWithClass(hsClass).length
          stats[hsClass]['wonWithArena'] = getters.getArenaGamesWonWithClass(hsClass).length
          stats[hsClass]['playedVsArena'] = getters.getArenaGamesVsClass(hsClass).length
          stats[hsClass]['wonVsArena'] = getters.getArenaGamesWonVsClass(hsClass).length
          stats[hsClass]['completeWithArena'] = getters.getArenaWithClass(hsClass).length
          stats[hsClass]['averageWinWithArena'] = getters.getArenaAverageWinWithClass(hsClass)
        }
      }
      return stats
    },
    deckStats: (state, getters) => {
      // clone decks to manipulate it, or it will change state directly
      let stats = JSON.parse(JSON.stringify(getters.own))
      for (let idDeck in stats) {
        if (stats.hasOwnProperty(idDeck)) {
          stats[idDeck]['playedWith'] = getters.getGamesWithDeck(idDeck).length
          stats[idDeck]['wonWith'] = getters.getGamesWonWithDeck(idDeck).length
          stats[idDeck]['lossWith'] = stats[idDeck]['playedWith'] - stats[idDeck]['wonWith']
          stats[idDeck]['winPercentWith'] = getters.getWinPercentWithDeck(idDeck)
          stats[idDeck]['winScoreWith'] = getters.getWinScoreWithDeck(idDeck)
          stats[idDeck]['playedWithRecent'] = getters.getGamesWithDeck(idDeck, true).length
          stats[idDeck]['wonWithRecent'] = getters.getGamesWonWithDeck(idDeck, true).length
          stats[idDeck]['lossWithRecent'] = stats[idDeck]['playedWithRecent'] - stats[idDeck]['wonWithRecent']
          stats[idDeck]['winPercentWithRecent'] = getters.getWinPercentWithDeck(idDeck, true)
        }
      }
      return stats
    },
    typesStats: (state, getters) => {
      // clone types to manipulate it, or it will change state directly
      let stats = JSON.parse(JSON.stringify(getters.types))
      for (let i = 0; i < stats.length; i++) {
        const idType = stats[i].id
        const playedVs = getters.getGamesVsType(idType)
        stats[i]['playedVs'] = playedVs.length
        stats[i]['playedVsCurrent'] = getters.getGamesVsWithDeck(playedVs, getters.current.id).length
        const wonVs = getters.getGamesWonVsType(idType)
        stats[i]['wonVs'] = wonVs.length
        stats[i]['wonVsCurrent'] = getters.getGamesVsWithDeck(wonVs, getters.current.id).length
        stats[i]['lossVs'] = stats[i]['playedVs'] - stats[i]['wonVs']
        stats[i]['lossVsCurrent'] = stats[i]['playedVsCurrent'] - stats[i]['wonVsCurrent']
        stats[i]['winPercentVs'] = getters.computeWinPercent(stats[i]['playedVs'], stats[i]['wonVs'])
        stats[i]['winScoreVs'] = getters.computeWinScore(stats[i]['playedVs'], stats[i]['winPercentVs'])
        stats[i]['winPercentVsCurrent'] = getters.computeWinPercent(stats[i]['playedVsCurrent'], stats[i]['wonVsCurrent'])
        stats[i]['winScoreVsCurrent'] = getters.computeWinScore(stats[i]['playedVsCurrent'], stats[i]['winPercentVsCurrent'])
        stats[i]['playedVsRecent'] = getters.getGamesVsType(idType, true).length
        stats[i]['wonVsRecent'] = getters.getGamesWonVsType(idType, true).length
        stats[i]['lossVsRecent'] = stats[i]['playedVsRecent'] - stats[i]['wonVsRecent']
        stats[i]['winPercentVsRecent'] = getters.getWinPercentVsType(idType, true)
      }
      return stats
    },
    archetypesStats: (state, getters) => {
      // clone archetypes to manipulate it, or it will change state directly
      let stats = JSON.parse(JSON.stringify(getters.archetypes))
      for (let archetype in stats) {
        if (stats.hasOwnProperty(archetype)) {
          stats[archetype]['playedWith'] = getters.getGamesWithArchetype(archetype).length
          stats[archetype]['wonWith'] = getters.getGamesWonWithArchetype(archetype).length
          const playedVs = getters.getGamesVsArchetype(archetype)
          stats[archetype]['playedVs'] = playedVs.length
          stats[archetype]['playedVsCurrent'] = getters.getGamesVsWithDeck(playedVs, getters.current.id).length
          const wonVs = getters.getGamesWonVsArchetype(archetype)
          stats[archetype]['wonVs'] = wonVs.length
          stats[archetype]['wonVsCurrent'] = getters.getGamesVsWithDeck(wonVs, getters.current.id).length
        }
      }
      return stats
    },
    limitTitle: () => (title) => {
      if (title.length <= DECK_TITLE_LIMIT) return title
      return title.substring(0, DECK_TITLE_LIMIT - 1) + '...'
    },
    generateDeckTitle: (state, getters) => (deck) => {
      if (typeof deck.type === 'undefined') {
        return ''
      }
      const className = getters.className(deck.type.hsClass)
      return deck.name + ' (' + deck.type.name + ' ' + className + ')'
    },
    generateDeckTitleLimit: (state, getters) => (deck) => {
      if (deck.name) {
        return getters.limitTitle(deck.name)
      } else {
        const title = getters.generateDeckTitle(deck)
        return getters.limitTitle(title)
      }
    },
    generateTypeTitle: (state, getters) => (type) => {
      if (typeof type.hsClass === 'undefined') {
        return ''
      }
      const className = getters.className(type.hsClass)
      return type.name + ' ' + className + ' (' + type.archetype + ')'
    },
    generateTypeTitleLimit: (state, getters) => (type, archetype) => {
      if (archetype) {
        const title = getters.generateTypeTitle(type)
        return getters.limitTitle(title)
      } else {
        const className = getters.className(type.hsClass)
        const title = type.name + ' ' + className
        return getters.limitTitle(title)
      }
    },
    sortList: (state, getters) => (list, field, isString) => {
      if (typeof isString === 'undefined') isString = false
      let sorted = JSON.parse(JSON.stringify(list))
      sorted = sorted.sort(function (a, b) {
        if (isString) {
          return a[field].localeCompare(b[field])
        } else {
          switch (true) {
            case a[field] > b[field]: return -1
            case a[field] < b[field]: return 1
            default: return 0
          }
        }
      })
      return sorted
    }
  },
  actions: {
    importData ({commit, dispatch}, dataImport) {
      try {
        dataImport = JSON.parse(dataImport)
      } catch (e) {
        dispatch('addError', 'Incorrect JSON format')
        console.log(e) // console.log on purpose
        return false
      }
      if (!dataImport.deck) {
        dispatch('addError', 'No deck data found')
        return false
      }
      if (!dataImport.history) {
        dispatch('addError', 'No history data found')
        return false
      }
      if (!dataImport.pack) {
        dispatch('addError', 'No pack data found')
        return false
      }
      if (!dataImport.serie) {
        dispatch('addError', 'No serie data found')
        return false
      }
      commit(types.IMPORT_DATA_DECK, dataImport.deck)
      commit(types.IMPORT_DATA_HISTORY, dataImport.history)
      commit(types.IMPORT_DATA_PACK, dataImport.pack)
      commit(types.IMPORT_DATA_SERIE, dataImport.serie)
      dispatch('addSuccess', 'Data imported')
      return true
    },
    switchWildMode ({commit}) {
      commit(types.SWITCH_WILD_MODE)
    },
    win ({dispatch}) {
      dispatch('storeGame', true)
    },
    loose ({dispatch}) {
      dispatch('storeGame', false)
    },
    storeGame ({dispatch, state, commit, getters}, won) {
      const dateNow = new Date()
      const historyData = {
        rank: state.serie.rank,
        stars: state.serie.stars,
        starsMult: state.serie.starsMult,
        winStreak: state.serie.winStreak,
        rankWild: state.serie.rankWild,
        starsWild: state.serie.starsWild,
        winStreakWild: state.serie.winStreakWild,
        starsMultWild: state.serie.starsMultWild,
        highest: state.serie.highest,
        won: won,
        deck: getters.current,
        opponent: getters.opponent,
        gameDate: {
          fullDate: dateNow,
          dayInMonth: dateNow.getDate(),
          dayInWeek: dateNow.getDay(),
          hour: dateNow.getHours()
        }
      }
      commit(types.ADD_HISTORY, historyData)
    },
    winArena ({dispatch, state, commit}) {
      // messages: win count not yet updated!
      switch (true) {
        case (state.serie.arenaWin === 0):
          dispatch('addInfo', 'Honor is safe')
          break
        case (state.serie.arenaWin === 2):
          dispatch('addInfo', 'Another random reward earned')
          break
        case (state.serie.arenaWin === 4):
          dispatch('addInfo', 'Card pack refunded')
          break
        case (state.serie.arenaWin === 6):
          dispatch('addInfo', 'Arena fee refunded')
          break
        case (state.serie.arenaWin === 7):
          dispatch('addInfo', 'Another random reward earned')
          break
      }
      dispatch('storeArenaGame', true)
    },
    looseArena ({dispatch, state, commit}) {
      // messages: loss count not yet updated!
      switch (true) {
        case (state.serie.arenaLoss === 1):
          dispatch('addInfo', 'Last chance!')
          break
      }
      dispatch('storeArenaGame', false)
    },
    closeArena ({dispatch, state, commit}) {
      const completeData = {
        win: state.serie.arenaWin,
        loss: state.serie.arenaLoss,
        hsClass: state.deck.currentArena.id
      }
      commit(types.COMPLETE_ARENA_HISTORY, completeData)
      switch (true) {
        case (state.serie.arenaWin === 0):
          dispatch('addInfo', 'Come on man!')
          break
        case (state.serie.arenaWin < 3):
          dispatch('addInfo', 'A little more effort!')
          break
        case (state.serie.arenaWin === 12):
          dispatch('addInfo', 'Wonderful!')
          break
      }
    },
    storeArenaGame ({dispatch, state, commit}, won) {
      const dateNow = new Date()
      const historyData = {
        arenaWin: state.serie.arenaWin,
        arenaLoss: state.serie.arenaLoss,
        won: won,
        player: state.deck.currentArena,
        opponent: state.deck.opponentArena,
        gameDate: {
          fullDate: dateNow,
          dayInMonth: dateNow.getDate(),
          dayInWeek: dateNow.getDay(),
          hour: dateNow.getHours()
        }
      }
      commit(types.ADD_ARENA_HISTORY, historyData)
    },
    resetState () {
      // call this.$store.dispatch('resetState') from a component action
      localStorage.removeItem(persistOptions.key)
      // also remove one time message stored
      localStorage.removeItem('tsotm:localStorageAccepted')
      localStorage.removeItem('tsotm:update_1.0')
      location.reload()
    },
    cancelLastGame ({dispatch, commit, getters}) {
      let lastGame = getters.getLastGamesFiltered(1)
      if (lastGame.length < 1) return
      lastGame = lastGame[0]
      commit(types.CANCEL_LAST_GAME, lastGame)
      commit(types.REMOVE_LAST_HISTORY)
      dispatch('addSuccess', 'Last game canceled')
    }
  },
  modules: {
    serie, deck, history, messageBag, pack
  },
  strict: debug,
  plugins: debug ? [createLogger(), persistedState(persistOptions)] : [persistedState(persistOptions)]
})
