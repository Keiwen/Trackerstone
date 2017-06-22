import * as types from '../mutation-types'

// ----------
// Initial state
// ----------
const state = {
  history: [],
  recentNumberGames: 10

}

// ----------
// Getters
// ----------
const getters = {
  getGamesFiltered: state => (filter, value, numberOfGames) => {
    if (typeof numberOfGames === 'undefined') numberOfGames = 0
    const historySliced = state.history.slice(-numberOfGames)
    if (typeof filter === 'undefined') return historySliced
    if (typeof value === 'undefined') value = true
    return historySliced.filter(game => {
      if (filter.indexOf('.') > 0) {
        const split = filter.split('.')
        if (typeof game[split[0]] === 'undefined') return value !== false
        return game[split[0]][split[1]] === value
      }
      return game[filter] === value
    })
  },
  getLastGamesFiltered: (state, getters) => (numberOfGames, filter, value) => {
    let history = getters.getGamesFiltered(filter, value)
    if (typeof numberOfGames === 'undefined') numberOfGames = 0
    return history.slice(-numberOfGames)
  },
  // <<< GAMES FILTERS
  getGamesList: (state, getters) => (recentOnly, filter, value) => {
    if (recentOnly) {
      return getters.getLastGamesFiltered(state.recentNumberGames, filter, value)
    }
    return getters.getGamesFiltered(filter, value)
  },
  getGamesWonAmong: (state, getters) => (gamesList) => {
    return gamesList.filter(game => {
      return game['won'] === true
    })
  },
  computeWinPercent: state => (playedCount, wonCount) => {
    if (playedCount === 0) return 0
    return Math.round((wonCount / playedCount) * 100)
  },
  getGamesWithDeck: (state, getters) => (idDeck, recentOnly) => {
    return getters.getGamesList(recentOnly, 'deck.id', parseInt(idDeck))
  },
  getGamesWonWithDeck: (state, getters) => (idDeck, recentOnly) => {
    const played = getters.getGamesWithDeck(idDeck, recentOnly)
    return getters.getGamesWonAmong(played)
  },
  getWinPercentWithDeck: (state, getters) => (idDeck, recentOnly) => {
    const played = getters.getGamesWithDeck(idDeck, recentOnly)
    const won = getters.getGamesWonWithDeck(idDeck, recentOnly)
    return getters.computeWinPercent(played.length, won.length)
  },
  getGamesVsType: (state, getters) => (idType, recentOnly) => {
    return getters.getGamesList(recentOnly, 'opponent.id', parseInt(idType))
  },
  getGamesWonVsType: (state, getters) => (idType, recentOnly) => {
    const played = getters.getGamesVsType(idType, recentOnly)
    return getters.getGamesWonAmong(played)
  },
  getWinPercentVsType: (state, getters) => (idType, recentOnly) => {
    const played = getters.getGamesVsType(idType, recentOnly)
    const won = getters.getGamesWonVsType(idType, recentOnly)
    return getters.computeWinPercent(played.length, won.length)
  },
  // GAMES FILTERS >>>
  gamesPlayed: (state, getters) => { return getters.getGamesList().length },
  gamesWon: (state, getters) => { return getters.getGamesFiltered('won').length },
  gamesLoss: (state, getters) => (getters.gamesPlayed - getters.gamesWon),
  winRate: (state, getters) => {
    return (getters.winPercent / 100)
  },
  winPercent: (state, getters) => {
    return getters.computeWinPercent(getters.gamesPlayed, getters.gamesWon)
  },
  recentNumberGames: state => state.recentNumberGames
}

// ----------
// Actions
// ----------
const actions = {

}

// ----------
// Mutations
// ----------
const mutations = {
  [types.RESET_HISTORY] (state) {
    state.history = []
  },
  [types.SET_HISTORY] (state, history) {
    state.history = history
  },
  [types.ADD_HISTORY] (state, history) {
    state.history.push(history)
  }

}

// ----------
// Export
// ----------
export default {
  state,
  getters,
  actions,
  mutations
}
