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
  getGamesFiltered: state => (numberOfGames, filter, value) => {
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
  gamesPlayed: (state, getters) => { return getters.getGamesFiltered().length },
  gamesWon: (state, getters) => { return getters.getGamesFiltered(0, 'won').length },
  gamesLoss: (state, getters) => (getters.gamesPlayed - getters.gamesWon),
  winRate: (state, getters) => {
    if (getters.gamesPlayed === 0) return 0
    // round 2 digits
    return Math.round((getters.gamesWon / getters.gamesPlayed) * 100) / 100
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
