import * as types from '../mutation-types'

// ----------
// Initial state
// ----------
const state = {
  wildMode: false,
  history: [],
  historyWild: [],
  historyArena: [], // list of all games, mixed from any run
  completedArena: [], // data of each arena run
  recentNumberGames: 10,
  // score is win percent multiplied by function a/(1+(b/(x^3)))
  // x = games count
  // a = multiplier
  // b = coef
  // first games doesn't count much, then score grows up to maximum
  scoreCoef: 30, // by 5 games, score will be 80 % of multiplier
  scoreMult: 2 // Winrate should be around 1/2, so multiply by 2 to give score with max ~ 100
}

// ----------
// Getters
// ----------
const getters = {
  wildMode: state => state.wildMode,
  getGamesFilteredFromHistory: state => (history, filter, value, numberOfGames) => {
    if (typeof numberOfGames === 'undefined') numberOfGames = 0
    const historySliced = history.slice(-numberOfGames)
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
  getGamesFiltered: (state, getters) => (filter, value, numberOfGames) => {
    const history = (state.wildMode) ? state.historyWild : state.history
    return getters.getGamesFilteredFromHistory(history, filter, value, numberOfGames)
  },
  getLastGamesFiltered: (state, getters) => (numberOfGames, filter, value) => {
    let history = getters.getGamesFiltered(filter, value)
    if (typeof numberOfGames === 'undefined') numberOfGames = 0
    return history.slice(-numberOfGames)
  },
  getArenaGamesFiltered: (state, getters) => (filter, value, numberOfGames) => {
    return getters.getGamesFilteredFromHistory(state.historyArena, filter, value, numberOfGames)
  },
  // <<< GAMES FILTERS
  getGamesList: (state, getters) => (recentOnly, filter, value) => {
    if (recentOnly) {
      return getters.getLastGamesFiltered(state.recentNumberGames, filter, value)
    }
    return getters.getGamesFiltered(filter, value)
  },
  getArenaGamesList: (state, getters) => (currentOnly, filter, value) => {
    let gamesList = getters.getArenaGamesFiltered(filter, value)
    if (!currentOnly) return gamesList
    let currentGames = []
    for (let i = gamesList.length - 1; i >= 0; i--) {
      currentGames.push(gamesList[i])
      // check if it was first game, won and loss was 0
      if (gamesList[i]['arenaWin'] === 0 && gamesList[i]['arenaLoss'] === 0) {
        break
      }
    }
    return currentGames.reverse()
  },
  getArenaList: (state, getters) => (filter, value) => {
    return getters.getGamesFilteredFromHistory(state.completedArena, filter, value)
  },
  getGamesWonAmong: (state, getters) => (gamesList) => {
    return gamesList.filter(game => {
      return game['won'] === true
    })
  },
  getGamesVsWithDeck: (state, getters) => (gamesList, idDeck) => {
    return gamesList.filter(game => {
      return game['deck']['id'] === idDeck
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
  getArenaGamesWithClass: (state, getters) => (hsClass, currentOnly) => {
    return getters.getArenaGamesList(currentOnly, 'player.id', hsClass)
  },
  getArenaGamesWonWithClass: (state, getters) => (hsClass, currentOnly) => {
    const played = getters.getArenaGamesWithClass(hsClass, currentOnly)
    return getters.getGamesWonAmong(played)
  },
  getArenaWinPercentWithClass: (state, getters) => (hsClass, currentOnly) => {
    const played = getters.getArenaGamesWithClass(hsClass, currentOnly)
    const won = getters.getArenaGamesWonWithClass(hsClass, currentOnly)
    return getters.computeWinPercent(played.length, won.length)
  },
  getArenaWithClass: (state, getters) => (hsClass) => {
    return getters.getArenaList('hsClass', hsClass)
  },
  getGamesVsType: (state, getters) => (idType, recentOnly) => {
    if (Number.isInteger(idType) || idType > 0) {
      // string as opponent id => generic type
      // if id, force cast to int before search
      idType = parseInt(idType)
    }
    return getters.getGamesList(recentOnly, 'opponent.id', idType)
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
  getGamesWithArchetype: (state, getters) => (archetype, recentOnly) => {
    return getters.getGamesList(recentOnly, 'deck.type.archetype', archetype)
  },
  getGamesWonWithArchetype: (state, getters) => (archetype, recentOnly) => {
    const played = getters.getGamesWithClass(archetype, recentOnly)
    return getters.getGamesWonAmong(played)
  },
  getGamesVsArchetype: (state, getters) => (archetype, recentOnly) => {
    return getters.getGamesList(recentOnly, 'opponent.archetype', archetype)
  },
  getGamesWonVsArchetype: (state, getters) => (archetype, recentOnly) => {
    const played = getters.getGamesVsClass(archetype, recentOnly)
    return getters.getGamesWonAmong(played)
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
  getArenaGamesVsClass: (state, getters) => (hsClass, currentOnly) => {
    return getters.getArenaGamesList(currentOnly, 'opponent.id', hsClass)
  },
  getArenaGamesWonVsClass: (state, getters) => (hsClass, currentOnly) => {
    const played = getters.getArenaGamesVsClass(hsClass, currentOnly)
    return getters.getGamesWonAmong(played)
  },
  getArenaWinPercentVsClass: (state, getters) => (hsClass, currentOnly) => {
    const played = getters.getArenaGamesVsClass(hsClass, currentOnly)
    const won = getters.getArenaGamesWonVsClass(hsClass, currentOnly)
    return getters.computeWinPercent(played.length, won.length)
  },
  // GAMES FILTERS >>>
  // <<< GAMES STATS
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
  gamesPlayedRecent: (state, getters) => { return getters.getGamesList(true).length },
  gamesWonRecent: (state, getters) => { return getters.getGamesWonAmong(getters.getGamesList(true)).length },
  gamesLossRecent: (state, getters) => (getters.gamesPlayedRecent - getters.gamesWonRecent),
  winRateRecent: (state, getters) => {
    return (getters.winPercentRecent / 100)
  },
  winPercentRecent: (state, getters) => {
    return getters.computeWinPercent(getters.gamesPlayedRecent, getters.gamesWonRecent)
  },
  arenaGamesPlayed: (state, getters) => { return getters.getArenaGamesList().length },
  arenaGamesWon: (state, getters) => { return getters.getArenaGamesFiltered('won').length },
  arenaGamesLoss: (state, getters) => (getters.arenaGamesPlayed - getters.arenaGamesWon),
  arenaWinRate: (state, getters) => {
    return (getters.arenaWinPercent / 100)
  },
  arenaWinPercent: (state, getters) => {
    return getters.computeWinPercent(getters.arenaGamesPlayed, getters.arenaGamesWon)
  },
  arenaGamesPlayedCurrent: (state, getters) => { return getters.getArenaGamesList(true).length },
  arenaGamesWonCurrent: (state, getters) => { return getters.getGamesWonAmong(getters.getArenaGamesList(true)).length },
  arenaGamesLossCurrent: (state, getters) => (getters.arenaGamesPlayedCurrent - getters.arenaGamesWonCurrent),
  arenaWinRateCurrent: (state, getters) => {
    return (getters.arenaWinPercentCurrent / 100)
  },
  arenaWinPercentCurrent: (state, getters) => {
    return getters.computeWinPercent(getters.arenaGamesPlayedCurrent, getters.arenaGamesWonCurrent)
  },
  arenaPlayed: (state, getters) => { return getters.getArenaList().length },
  arenaAverageWin: (state, getters) => {
    const arenaComplete = getters.getArenaList()
    if (arenaComplete.length === 0) return 0
    let totalWin = 0
    for (let i = 0; i < arenaComplete.length; i++) {
      totalWin += arenaComplete[i]['win']
    }
    return Math.round(totalWin / arenaComplete.length * 10) / 10
  },
  getArenaAverageWinWithClass: (state, getters) => (hsClass) => {
    const arenaComplete = getters.getArenaWithClass(hsClass)
    if (arenaComplete.length === 0) return 0
    let totalWin = 0
    for (let i = 0; i < arenaComplete.length; i++) {
      totalWin += arenaComplete[i]['win']
    }
    return Math.round(totalWin / arenaComplete.length * 10) / 10
  },
  arenaMaxWin: (state, getters) => {
    const arenaComplete = getters.getArenaList()
    let maxWin = 0
    for (let i = 0; i < arenaComplete.length; i++) {
      if (arenaComplete[i]['win'] > maxWin) maxWin = arenaComplete[i]['win']
    }
    return maxWin
  },
  arenaWithPrize: (state, getters) => {
    const arenaComplete = getters.getArenaList()
    let arenaCount = 0
    for (let i = 0; i < arenaComplete.length; i++) {
      if (typeof arenaComplete[i]['prizes'] === 'undefined') continue
      arenaCount++
    }
    return arenaCount
  },
  getArenaTotalPrize: (state, getters) => (prize) => {
    const arenaComplete = getters.getArenaList()
    let totalPrize = 0
    for (let i = 0; i < arenaComplete.length; i++) {
      if (typeof arenaComplete[i]['prizes'] === 'undefined') continue
      totalPrize += arenaComplete[i]['prizes'][prize]
    }
    return totalPrize
  },
  getArenaAveragePrize: (state, getters) => (prize) => {
    if (getters.arenaWithPrize === 0) return 0
    return Math.round(getters.getArenaTotalPrize(prize) / getters.arenaWithPrize)
  },

  // GAMES STATS >>>
  recentNumberGames: state => state.recentNumberGames,
  scoreCoef: state => state.scoreCoef
}

// ----------
// Actions
// ----------
const actions = {
  setLastArenaPrize ({dispatch, state, commit}, prizes) {
    if (state.completedArena.length === 0) return
    // check prizes set
    if (typeof prizes.gold === 'undefined' || prizes.gold === '') prizes.gold = 0
    if (typeof prizes.dust === 'undefined' || prizes.dust === '') prizes.dust = 0
    // check prizes format
    prizes.gold = parseInt(prizes.gold)
    prizes.dust = parseInt(prizes.dust)

    commit(types.SET_LAST_ARENA_PRIZE, prizes)
    dispatch('addSuccess', 'Arena prizes saved')
  },
  setRecentGamesNumber ({state, commit}, gameNumber) {
    commit(types.SET_RECENT_GAMES_NUMBER, gameNumber)
  },
  setScoreCoef ({state, commit}, scoreCoef) {
    commit(types.SET_SCORE_COEF, scoreCoef)
  },
  resetArena ({commit}) {
    commit(types.RESET_ARENA_HISTORY)
  }
}

// ----------
// Mutations
// ----------
const mutations = {
  [types.IMPORT_DATA_HISTORY] (state, dataHistory) {
    for (let attribute in state) {
      if (!state.hasOwnProperty(attribute)) continue
      state[attribute] = dataHistory[attribute]
    }
  },
  [types.RESET_HISTORY] (state) {
    state.history = []
    state.historyWild = []
  },
  [types.SET_HISTORY] (state, history) {
    if (state.wildMode) {
      state.historyWild = history
    } else {
      state.history = history
    }
  },
  [types.ADD_HISTORY] (state, history) {
    if (state.wildMode) {
      state.historyWild.push(history)
    } else {
      state.history.push(history)
    }
  },
  [types.RESET_ARENA_HISTORY] (state) {
    state.historyArena = []
    state.completedArena = []
  },
  [types.SET_ARENA_HISTORY] (state, history) {
    state.historyArena = history
  },
  [types.ADD_ARENA_HISTORY] (state, history) {
    state.historyArena.push(history)
  },
  [types.COMPLETE_ARENA_HISTORY] (state, history) {
    state.completedArena.push(history)
  },
  [types.SET_LAST_ARENA_PRIZE] (state, prizePayload) {
    let lastArena = state.completedArena.pop()
    lastArena['prizes'] = prizePayload
    state.completedArena.push(lastArena)
  },
  [types.SWITCH_WILD_MODE] (state) {
    state.wildMode = !state.wildMode
  },
  [types.SET_RECENT_GAMES_NUMBER] (state, gameNumber) {
    if (gameNumber > 1) {
      state.recentNumberGames = gameNumber
    }
  },
  [types.SET_SCORE_COEF] (state, scoreCoef) {
    if (scoreCoef > 1) {
      state.scoreCoef = scoreCoef
    }
  },
  [types.REMOVE_LAST_HISTORY] (state) {
    state.wildMode ? state.historyWild.pop() : state.history.pop()
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
