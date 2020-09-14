import * as types from '../mutation-types'
import Ranks from '@/assets/db/ranks.json'
import ArenaKeys from '@/assets/db/arenaKeys.json'
import Constants from '@/assets/db/constants.json'

// ----------
// Initial state
// ----------
const state = {
  wildMode: false,
  rank: Constants.serie.minRank,
  stars: 0,
  starsMult: 1,
  winStreak: 0,
  rankWild: Constants.serie.minRank,
  starsWild: 0,
  starsMultWild: 1,
  winStreakWild: 0,
  highest: Constants.serie.minRank,
  arenaWin: 0,
  arenaLoss: 0,
  arenaOpen: false
}

// ----------
// Getters
// ----------
const getters = {
  rank: state => state.rank,
  rankWild: state => state.rankWild,
  currentRank: state => {
    return state.wildMode ? state.rankWild : state.rank
  },
  getRankTitle: (state, getters) => (id) => {
    if (typeof id === 'undefined') id = getters.currentRank
    return Ranks[id]['title']
  },
  getRankData: (state, getters) => (id) => {
    if (typeof id === 'undefined') id = getters.currentRank
    return Ranks[id]
  },
  getRankLevel: (state, getters) => (id) => {
    if (typeof id === 'undefined') id = getters.currentRank
    if (id === 0) return Ranks[id]['league']
    return Ranks[id]['league'] + ' ' + Ranks[id]['rank']
  },
  getRankStars: (state, getters) => (id) => {
    if (typeof id === 'undefined') id = getters.currentRank
    return Ranks[id]['stars']
  },
  getRankFloor: (state, getters) => (id, next) => {
    if (typeof id === 'undefined' || id === null) id = getters.currentRank
    next = (typeof next !== 'undefined')
    let floor = id
    if (floor >= Constants.serie.minRank) floor = Constants.serie.minRank
    if (floor <= Constants.serie.maxRank) {
      floor = Constants.serie.maxRank
    } else if (next) {
      // start on rank above instead of given rank
      floor--
    }
    while (!Constants.serie.milestones.includes(floor)) {
      next ? floor-- : floor++
    }
    return floor
  },
  getRankChest: (state, getters) => (id) => {
    if (typeof id === 'undefined' || id === null) id = getters.highest
    const currentFloor = getters.getRankFloor(id)
    const nextFloor = getters.getRankFloor(id, true)
    let chest = JSON.parse(JSON.stringify(Ranks[currentFloor]['rewards']))
    let chestUpgrade = null
    if (currentFloor !== nextFloor) chestUpgrade = JSON.parse(JSON.stringify(Ranks[nextFloor]['rewards']))
    if (chestUpgrade !== null) {
      chestUpgrade.rareCard = chestUpgrade.rareCard - chest.rareCard
      chestUpgrade.epicCard = chestUpgrade.epicCard - chest.epicCard
      chestUpgrade.pack = chestUpgrade.pack - chest.pack
    }
    chest.chestUpgrade = chestUpgrade
    chest.rank = currentFloor
    chest.level = getters.getRankLevel(currentFloor)
    chest.nextRank = nextFloor
    chest.nextLevel = getters.getRankLevel(nextFloor)
    return chest
  },
  getRankFromLeague: (state) => (league, subrank) => {
    for (let rank in Ranks) {
      if (league === Ranks[rank]['league'] && subrank === Ranks[rank]['rank']) {
        return rank
      }
    }
    return Constants.serie.minRank
  },
  rankLeagues: (state) => {
    let leagues = []
    for (let rank in Ranks) {
      if (!leagues.includes(Ranks[rank]['league'])) leagues.push(Ranks[rank]['league'])
    }
    return leagues
  },
  nextMilestone: (state, getters) => {
    return getters.getRankFloor(null, true)
  },
  nextChest: (state, getters) => {
    return getters.getRankFloor(state.highest, true)
  },
  getStarsToRank: (state, getters) => (targetRank) => {
    const rank = getters.currentRank
    if (rank === Constants.serie.maxRank) return 0
    if (rank <= targetRank) return 0
    let stars = 1 // start at one to reach target rank
    for (let i = rank; i > targetRank; i--) {
      stars += Ranks[i]['stars']
    }
    stars -= getters.currentStars
    return stars
  },
  starsToMilestone: (state, getters) => {
    return getters.getStarsToRank(getters.nextMilestone)
  },
  starsToNextChest: (state, getters) => {
    return getters.getStarsToRank(getters.nextChest)
  },
  starsInMilestone: (state, getters) => {
    const rank = getters.currentRank
    if (rank === Constants.serie.maxRank) return 0
    const nextMilestone = getters.nextMilestone
    let prevMilestone = getters.getRankFloor()
    let stars = 0
    for (let i = prevMilestone; i > nextMilestone; i--) {
      stars += Ranks[i]['stars']
    }
    return stars
  },
  getWinsToRank: (state, getters) => (targetRank) => {
    let rank = getters.currentRank
    if (rank === Constants.serie.maxRank) return 0
    if (rank <= targetRank) return 0
    let stars = getters.currentStars
    let starsMult = getters.currentStarsMult
    let winStreak = getters.currentWinStreak
    let winsToRank = 0
    while (rank > targetRank) {
      winStreak++
      let nextWinStars = 1 * starsMult
      if (winStreak >= Constants.serie.winStreak) nextWinStars = nextWinStars * 2
      while ((stars + nextWinStars) > Ranks[rank].stars) {
        nextWinStars -= Ranks[rank].stars - stars
        rank--
        if (Constants.serie.milestones.includes(rank) && starsMult > 1) starsMult--
        stars = 0
      }
      stars += nextWinStars
      winsToRank++
    }
    return winsToRank
  },
  winsToMilestone: (state, getters) => {
    return getters.getWinsToRank(getters.nextMilestone)
  },
  winsToNextChest: (state, getters) => {
    return getters.getWinsToRank(getters.nextChest)
  },
  stars: state => state.stars,
  starsWild: state => state.starsWild,
  currentStars: state => {
    return state.wildMode ? state.starsWild : state.stars
  },
  starsMult: state => state.starsMult,
  starsMultWild: state => state.starsMultWild,
  currentStarsMult: state => {
    return state.wildMode ? state.starsMultWild : state.starsMult
  },
  winStreak: state => state.winStreak,
  winStreakWild: state => state.winStreakWild,
  currentWinStreak: state => {
    return state.wildMode ? state.winStreakWild : state.winStreak
  },
  highest: state => state.highest,
  getTotalStars: (state, getters) => (rank, starsInRank) => {
    if (typeof rank === 'undefined') rank = getters.currentRank
    if (typeof starsInRank === 'undefined') starsInRank = getters.currentStars
    let totalStars = 0
    for (let i = Constants.serie.minRank; i >= rank; i--) {
      if (rank === i) {
        totalStars += starsInRank
      } else {
        totalStars += Ranks[i]['stars']
      }
    }
    return totalStars
  },
  isOnWinStreak: (state, getters) => {
    return getters.currentWinStreak >= Constants.serie.winStreak
  },
  isOnWinStreakIfWin: (state, getters) => {
    return getters.currentWinStreak >= (Constants.serie.winStreak - 1)
  },
  getSerieTimeProgress: state => {
    let currentDate = new Date()
    // next month index 0 = day before first day = last day of current month
    let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    currentDate = currentDate.getDate()
    lastDate = lastDate.getDate()
    return Math.round(currentDate / lastDate * 100)
  },
  getSerieTimeLeft: state => {
    let currentDate = new Date()
    let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    currentDate = currentDate.getDate()
    lastDate = lastDate.getDate()
    return lastDate - currentDate
  },
  arenaWin: state => state.arenaWin,
  arenaLoss: state => state.arenaLoss,
  getArenaKeyTitle: state => (winCount) => {
    if (typeof winCount === 'undefined') winCount = state.arenaWin
    return ArenaKeys[winCount]['title']
  },
  arenaOpen: state => state.arenaOpen,
  arenaFee: state => Constants.arena.fee,
  cardPackCost: state => Constants.cardpack.cost
}

// ----------
// Actions
// ----------
const actions = {
  earnStar ({commit, state, getters}, number) {
    if (typeof number === 'undefined') number = 1 // default is earn 1 star
    let mult = 1
    let rank = getters.currentRank
    if (number < 0) {
      if (rank > Constants.serie.rankLossCount) return // check if loss counted for current rank
      mult = -1
      number = -number // keep number absolute to iterate
    }
    for (let i = 0; i < number; i++) {
      // reload rank/stars if any change made on previous loop
      rank = getters.currentRank
      let stars = getters.currentStars
      if (stars === 0 && mult < 0) {
        // decrease when no star on rank
        commit(types.DECREASE_RANK)
      } else if (stars === Ranks[rank]['stars'] && mult > 0) {
        // increase when max stars on rank
        commit(types.INCREASE_RANK)
      } else if (mult > 0) {
        commit(types.ADD_STAR)
      } else {
        commit(types.REMOVE_STAR)
      }
    }
  },
  win ({dispatch, commit, state, getters}, number) {
    if (typeof number === 'undefined') number = 1 // default is 1 win
    const rank = getters.currentStars
    const starsMult = getters.currentStarsMult
    const winStreak = getters.currentWinStreak
    let starGain = number * starsMult
    if (rank > Constants.serie.rankBonusCanceled) {
      if (getters.isOnWinStreakIfWin) {
        starGain = number * starsMult * 2
      } else if ((number + winStreak) >= Constants.serie.winStreak) {
        starGain = (Constants.serie.winStreak - winStreak) * starsMult // star gain before win streak
        starGain += ((number + winStreak) - Constants.serie.winStreak) * starsMult * 2 // star gain after win streak
      }
    }
    commit(types.ADD_WIN_STREAK, number)
    dispatch('earnStar', starGain)
  },
  loose ({dispatch, commit, state}, number) {
    if (typeof number === 'undefined') number = 1 // default is 1 loss
    commit(types.STOP_WIN_STREAK)
    dispatch('earnStar', -number)
  },
  openArena ({commit, state}) {
    commit(types.OPEN_ARENA)
  },
  closeArena ({commit, state}) {
    commit(types.CLOSE_ARENA)
  },
  winArena ({dispatch, commit, state}) {
    if (!state.arenaOpen) return
    commit(types.ADD_ARENA_WIN)
    if (state.arenaWin >= Constants.arena.maxWin) {
      dispatch('closeArena')
    }
  },
  looseArena ({dispatch, commit, state}) {
    if (!state.arenaOpen) return
    commit(types.ADD_ARENA_LOSS)
    if (state.arenaLoss >= Constants.arena.maxLoss) {
      dispatch('closeArena')
    }
  },
  reset ({commit}) {
    commit(types.RESET_SERIE)
    commit(types.RESET_HISTORY)
  },
  setSerieData ({dispatch, commit, state}, dataSet) {
    commit(types.SET_SERIE_DATA, dataSet)
    dispatch('addSuccess', 'Serie data set')
  }
}

// ----------
// Mutations
// ----------
const mutations = {
  [types.IMPORT_DATA_SERIE] (state, dataSerie) {
    // state = dataSerie
    // command above does NOT work, we need to change attributes one by one
    for (let attribute in state) {
      if (!state.hasOwnProperty(attribute)) continue
      state[attribute] = dataSerie[attribute]
    }
  },
  [types.SET_SERIE_DATA] (state, data) {
    if (typeof data.rank === 'undefined') data.rank = Constants.serie.minRank
    if (typeof data.stars === 'undefined') data.stars = 0
    if (typeof data.starsMult === 'undefined') data.starsMult = 1
    if (typeof data.winStreak === 'undefined') data.winStreak = 0
    if (typeof data.rankWild === 'undefined') data.rankWild = Constants.serie.minRank
    if (typeof data.starsWild === 'undefined') data.starsWild = 0
    if (typeof data.starsMultWild === 'undefined') data.starsMultWild = 1
    if (typeof data.winStreakWild === 'undefined') data.winStreakWild = 0

    data.highest = data.rank

    // rank between min and max
    if (data.rank >= Constants.serie.maxRank && data.rank <= Constants.serie.minRank) state.rank = parseInt(data.rank)
    if (data.rankWild >= Constants.serie.maxRank && data.rankWild <= Constants.serie.minRank) state.rankWild = parseInt(data.rankWild)
    // stars between 0 and max by rank, 0 if rank 0
    if (state.rank === Constants.serie.maxRank) data.stars = 0
    if (data.stars >= 0 && data.stars <= Ranks[state.rank]['stars']) state.stars = parseInt(data.stars)
    if (state.rankWild === Constants.serie.maxRank) data.starsWild = 0
    if (data.starsWild >= 0 && data.starsWild <= Ranks[state.rankWild]['stars']) state.starsWild = parseInt(data.starsWild)
    // win streak must be >= 0
    if (data.winStreak >= 0) state.winStreak = parseInt(data.winStreak)
    if (data.winStreakWild >= 0) state.winStreakWild = parseInt(data.winStreakWild)
    // stars mult must be >= 1
    if (data.starsMult >= 1) state.starsMult = parseInt(data.starsMult)
    if (data.starsMultWild >= 1) state.starsMultWild = parseInt(data.starsMultWild)
    // highest should be at least rank
    if (data.highest > state.rank) data.highest = state.rank
    if (data.highest > state.rankWild) data.highest = state.rankWild
    if (data.highest >= Constants.serie.maxRank && data.highest <= Constants.serie.minRank) state.highest = parseInt(data.highest)
  },
  [types.INCREASE_RANK] (state) {
    if (state.wildMode) {
      if (state.rankWild === Constants.serie.maxRank) return // max level
      state.rankWild--
      state.starsWild = 1
      if (state.rankWild === Constants.serie.maxRank) state.starsWild = 0 // no star in last level
      if (state.highest > state.rankWild) state.highest = state.rankWild // store highest rank reached
      if (Constants.serie.milestones.includes(state.rankWild) && state.starsMultWild > 1) state.starsMultWild-- // decrease multiplier if new milestone reached
    } else {
      if (state.rank === Constants.serie.maxRank) return // max level
      state.rank--
      state.stars = 1
      if (state.rank === Constants.serie.maxRank) state.stars = 0 // no star in last level
      if (state.highest > state.rank) state.highest = state.rank // store highest rank reached
      if (Constants.serie.milestones.includes(state.rank) && state.starsMult > 1) state.starsMult-- // decrease multiplier if new milestone reached
    }
  },
  [types.DECREASE_RANK] (state) {
    if (state.wildMode) {
      if (state.rankWild === Constants.serie.minRank) return // min level
      if (Constants.serie.milestones.includes(state.rankWild)) return // cannot decrease if milestone reached
      state.rankWild++
      state.starsWild = Ranks[state.rankWild]['stars'] - 1 // max stars minus 1
    } else {
      if (state.rank === Constants.serie.minRank) return // min level
      if (Constants.serie.milestones.includes(state.rank)) return // cannot decrease if milestone reached
      state.rank++
      state.stars = Ranks[state.rank]['stars'] - 1 // max stars minus 1
    }
  },
  [types.ADD_STAR] (state) {
    if (state.wildMode) {
      if (state.rankWild === Constants.serie.maxRank) return
      if (state.starsWild === Ranks[state.rankWild]['stars']) return // no more star if already max
      state.starsWild++
    } else {
      if (state.rank === Constants.serie.maxRank) return
      if (state.stars === Ranks[state.rank]['stars']) return // no more star if already max
      state.stars++
    }
  },
  [types.REMOVE_STAR] (state) {
    if (state.wildMode) {
      if (state.rankWild === Constants.serie.maxRank) return
      if (state.starsWild === 0) return // no less than 0
      state.starsWild--
    } else {
      if (state.rank === Constants.serie.maxRank) return
      if (state.stars === 0) return // no less than 0
      state.stars--
    }
  },
  [types.ADD_WIN_STREAK] (state, number) {
    if (typeof number === 'undefined') number = 0
    if (state.wildMode) {
      state.winStreakWild += number
    } else {
      state.winStreak += number
    }
  },
  [types.STOP_WIN_STREAK] (state) {
    if (state.wildMode) {
      state.winStreakWild = 0
    } else {
      state.winStreak = 0
    }
  },
  [types.RESET_SERIE] (state) {
    const nextStarsMult = Ranks[state.rank]['starsMult']
    state.rank = Constants.serie.minRank
    state.stars = 0
    state.starsMult = nextStarsMult
    state.winStreak = 0

    const nextStarsMultWild = Ranks[state.rankWild]['starsMult']
    state.rankWild = Constants.serie.minRank
    state.starsWild = 0
    state.starsMultWild = nextStarsMultWild
    state.winStreakWild = 0

    state.highest = Constants.serie.minRank
  },
  [types.OPEN_ARENA] (state) {
    state.arenaWin = 0
    state.arenaLoss = 0
    state.arenaOpen = true
  },
  [types.CLOSE_ARENA] (state) {
    state.arenaOpen = false
  },
  [types.ADD_ARENA_WIN] (state) {
    state.arenaWin++
  },
  [types.ADD_ARENA_LOSS] (state) {
    state.arenaLoss++
  },
  [types.SWITCH_WILD_MODE] (state) {
    state.wildMode = !state.wildMode
  },
  [types.CANCEL_LAST_GAME] (state, game) {
    state.highest = game.highest
    state.rank = game.rank
    state.stars = game.stars
    state.starsMult = game.starsMult
    state.winStreak = game.winStreak
    state.rankWild = game.rankWild
    state.starsWild = game.starsWild
    state.starsWildMult = game.starsWildMult
    state.winStreakWild = game.winStreakWild
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
