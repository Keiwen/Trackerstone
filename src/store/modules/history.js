import * as types from '../mutation-types'

// ----------
// Initial state
// ----------
const state = {
  history: [],
  recentNumberGames: 10,
  // score is win percent multiplied by function a/(1+(b/(x^3)))
  // x = games count
  // a = multiplier
  // b = coef
  // first games doesn't count much, then score grows up to maximum
  scoreCoef: 2000, // by 20 games, score will be 80 % of multiplier
  scoreMult: 2 // Winrate should be around 1/2, so multiply by 2 to give score with max ~ 100
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
  computeWinScore: state => (playedCount, winPercent) => {
    if (playedCount === 0) return -1
    return Math.round(winPercent * state.scoreMult / (1 + (state.scoreCoef / Math.pow(playedCount, 3))))
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
  getWinScoreWithDeck: (state, getters) => (idDeck, recentOnly) => {
    const played = getters.getGamesWithDeck(idDeck, recentOnly)
    const percent = getters.getWinPercentWithDeck(idDeck, recentOnly)
    return getters.computeWinScore(played.length, percent)
  },
  getGamesWithClass: (state, getters) => (hsClass, recentOnly) => {
    return getters.getGamesList(recentOnly, 'deck.type.hsClass', hsClass)
  },
  getGamesWonWithClass: (state, getters) => (hsClass, recentOnly) => {
    const played = getters.getGamesWithClass(hsClass, recentOnly)
    return getters.getGamesWonAmong(played)
  },
  getWinPercentWithClass: (state, getters) => (hsClass, recentOnly) => {
    const played = getters.getGamesWithClass(hsClass, recentOnly)
    const won = getters.getGamesWonWithClass(hsClass, recentOnly)
    return getters.computeWinPercent(played.length, won.length)
  },
  getWinScoreWithClass: (state, getters) => (hsClass, recentOnly) => {
    const played = getters.getGamesWithClass(hsClass, recentOnly)
    const percent = getters.getWinPercentWithClass(hsClass, recentOnly)
    return getters.computeWinScore(played.length, percent)
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
  getWinScoreVsType: (state, getters) => (idType, recentOnly) => {
    const played = getters.getGamesVsType(idType, recentOnly)
    const percent = getters.getWinPercentVsType(idType, recentOnly)
    return getters.computeWinScore(played.length, percent)
  },
  getGamesVsClass: (state, getters) => (hsClass, recentOnly) => {
    return getters.getGamesList(recentOnly, 'opponent.hsClass', hsClass)
  },
  getGamesWonVsClass: (state, getters) => (hsClass, recentOnly) => {
    const played = getters.getGamesVsClass(hsClass, recentOnly)
    return getters.getGamesWonAmong(played)
  },
  getWinPercentVsClass: (state, getters) => (hsClass, recentOnly) => {
    const played = getters.getGamesVsClass(hsClass, recentOnly)
    const won = getters.getGamesWonVsClass(hsClass, recentOnly)
    return getters.computeWinPercent(played.length, won.length)
  },
  getWinScoreVsClass: (state, getters) => (hsClass, recentOnly) => {
    const played = getters.getGamesVsClass(hsClass, recentOnly)
    const percent = getters.getWinPercentVsClass(hsClass, recentOnly)
    return getters.computeWinScore(played.length, percent)
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
  winScore: (state, getters) => {
    return getters.computeWinScore(getters.gamesPlayed, getters.winPercent)
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
