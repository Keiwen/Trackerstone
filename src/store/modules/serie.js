import * as types from '../mutation-types'
import Ranks from '@/assets/db/ranks.json'
import ArenaKeys from '@/assets/db/arenaKeys.json'
import Constants from '@/assets/db/constants.json'

// ----------
// Initial state
// ----------
const state = {
  wildMode: false,
  rank: 25,
  rankMax: 25,
  stars: 0,
  starsMax: 0,
  winStreak: 0,
  rankWild: 25,
  rankWildMax: 25,
  starsWild: 0,
  starsWildMax: 0,
  winStreakWild: 0,
  highest: 25,
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
  rankTitle: state => (id) => {
    if (typeof id === 'undefined') id = state.wildMode ? state.rankWild : state.rank
    return Ranks[id]['title']
  },
  rankStars: state => (id) => {
    if (typeof id === 'undefined') id = state.wildMode ? state.rankWild : state.rank
    return Ranks[id]['stars']
  },
  nextMilestone: state => {
    const rank = state.wildMode ? state.rankWild : state.rank
    if (rank === 0) return 0
    let nextMilestone = 0
    for (let i = Constants.serie.milestones.length - 1; i >= 0; i--) {
      if (Constants.serie.milestones[i] >= rank) break
      nextMilestone = Constants.serie.milestones[i]
    }
    return nextMilestone
  },
  starsToMilestone: (state, getters) => {
    const rank = state.wildMode ? state.rankWild : state.rank
    if (rank === 0) return 0
    const nextMilestone = getters.nextMilestone
    let stars = 1
    for (let i = rank; i > nextMilestone; i--) {
      stars += Ranks[i]['stars']
    }
    stars -= state.wildMode ? state.starsWild : state.stars
    return stars
  },
  starsInMilestone: (state, getters) => {
    const rank = state.wildMode ? state.rankWild : state.rank
    if (rank === 0) return 0
    const nextMilestone = getters.nextMilestone
    let prevMilestone = 25
    for (let i = Constants.serie.milestones.length - 1; i > 0; i--) {
      if (Constants.serie.milestones[i] === nextMilestone) {
        prevMilestone = Constants.serie.milestones[i - 1]
        break
      }
    }
    let stars = 1
    for (let i = prevMilestone; i > nextMilestone; i--) {
      stars += Ranks[i]['stars']
    }
    return stars
  },
  winsToMilestone: (state, getters) => {
    const rank = state.wildMode ? state.rankWild : state.rank
    if (rank === 0) return 0
    const starsToMilestone = getters.starsToMilestone
    // if no more bonus, wins = number of stars
    if (rank <= Constants.serie.rankBonusCanceled) return starsToMilestone
    // games to win before bonus star
    const winStreak = state.wildMode ? state.winStreakWild : state.winStreak
    let winTilBonus = Constants.serie.winStreak - 1 - winStreak
    if (winTilBonus < 0) winTilBonus = 0
    let normalWins = Math.min(winTilBonus, starsToMilestone)
    // games to win with bonus
    let bonusWins = (starsToMilestone - normalWins) / (Constants.serie.bonusStar + 1)
    return Math.ceil(normalWins + bonusWins)
  },
  stars: state => state.stars,
  starsWild: state => state.starsWild,
  winStreak: state => state.winStreak,
  winStreakWild: state => state.winStreakWild,
  highest: state => state.highest,
  getTotalStars: state => (rank, starsInRank) => {
    if (typeof rank === 'undefined') rank = state.wildMode ? state.rankWild : state.rank
    if (typeof starsInRank === 'undefined') starsInRank = state.wildMode ? state.starsWild : state.stars
    let totalStars = 0
    for (let i = 25; i >= rank; i--) {
      if (rank === i) {
        totalStars += starsInRank
      } else {
        totalStars += Ranks[i]['stars']
      }
    }
    return totalStars
  },
  isOnWinStreak: state => {
    let currentWinStreak = state.wildMode ? state.winStreakWild : state.winStreak
    return currentWinStreak >= Constants.serie.winStreak
  },
  getSerieTimeProgress: state => {
    let currentDate = new Date()
    let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
    currentDate = currentDate.getDate()
    lastDate = lastDate.getDate()
    return Math.round(currentDate / lastDate * 100)
  },
  getSerieTimeLeft: state => {
    let currentDate = new Date()
    let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
    currentDate = currentDate.getDate()
    lastDate = lastDate.getDate()
    return lastDate - currentDate + 1
  },
  arenaWin: state => state.arenaWin,
  arenaLoss: state => state.arenaLoss,
  arenaKeyTitle: state => (winCount) => {
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
  earnStar ({commit, state}, number) {
    if (typeof number === 'undefined') number = 1 // default is earn 1 star
    let mult = 1
    let rank = state.wildMode ? state.rankWild : state.rank
    if (number < 0) {
      if (rank > Constants.serie.rankLossCount) return // check if loss counted for current rank
      mult = -1
      number = -number // keep number absolute to iterate
    }
    for (let i = 0; i < number; i++) {
      rank = state.wildMode ? state.rankWild : state.rank
      let stars = state.wildMode ? state.starsWild : state.stars
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
    let bonusStar = 0
    const rank = state.wildMode ? state.rankWild : state.rank
    const winStreak = state.wildMode ? state.winStreakWild : state.winStreak
    if (rank > Constants.serie.rankBonusCanceled) {
      if (getters.isOnWinStreak) {
        bonusStar = number
      } else if ((number + winStreak) >= Constants.serie.winStreak) {
        bonusStar = number - Constants.serie.winStreak + 1 + winStreak
        if (bonusStar < 0) bonusStar = 0
      }
    }
    commit(types.ADD_WIN_STREAK, number)
    dispatch('earnStar', number + bonusStar)
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
  reset ({dispatch, commit, state}) {
    // old reset: back to 25 and earn stars
    // march 2018: loose 4 ranks
    // const bonusStar = 25 - state.highest
    commit(types.RESET_SERIE)
    commit(types.RESET_HISTORY)
    // dispatch('earnStar', bonusStar)
  },
  setSerieData ({dispatch, commit, state}, dataSet) {
    commit(types.SET_SERIE_DATA, dataSet)
  }
}

// ----------
// Mutations
// ----------
const mutations = {
  [types.SET_SERIE_DATA] (state, data) {
    if (typeof data.rank === 'undefined') data.rank = 25
    if (typeof data.stars === 'undefined') data.stars = 0
    if (typeof data.winStreak === 'undefined') data.winStreak = 0
    if (typeof data.rankWild === 'undefined') data.rank = 25
    if (typeof data.starsWild === 'undefined') data.stars = 0
    if (typeof data.winStreakWild === 'undefined') data.winStreakWild = 0
    if (typeof data.highest === 'undefined') data.highest = data.rank

    // rank between 0 and 25
    if (data.rank >= 0 && data.rank <= 25) state.rank = parseInt(data.rank)
    if (data.rankWild >= 0 && data.rankWild <= 25) state.rankWild = parseInt(data.rankWild)
    // stars between 0 and max by rank, 0 if rank 0
    if (state.rank === 0) data.stars = 0
    if (data.stars >= 0 && data.stars <= Ranks[state.rank]['stars']) state.stars = parseInt(data.stars)
    if (state.rankWild === 0) data.starsWild = 0
    if (data.starsWild >= 0 && data.starsWild <= Ranks[state.rankWild]['stars']) state.starsWild = parseInt(data.starsWild)
    // win streak must be >= 0
    if (data.winStreak >= 0) state.winStreak = parseInt(data.winStreak)
    if (data.winStreakWild >= 0) state.winStreakWild = parseInt(data.winStreakWild)
    // highest should be at least rank
    if (data.highest > state.rank) data.highest = state.rank
    if (data.highest > state.rankWild) data.highest = state.rankWild
    if (data.highest >= 0 && data.highest <= 25) state.highest = parseInt(data.highest)
    state.rankMax = state.rank
    state.rankWildMax = state.rankWild
    state.starsMax = state.stars
    state.starsWildMax = state.starsWild
  },
  [types.INCREASE_RANK] (state) {
    if (state.wildMode) {
      if (state.rankWild === 0) return // max level
      state.rankWild--
      state.starsWild = 1
      if (state.rankWild === 0) state.starsWild = 0 // no star in last level
      if (state.highest > state.rankWild) state.highest = state.rankWild // store highest rank reached
      if (state.rankWildMax > state.rankWild) {
        // store max wild rank reached
        state.rankWildMax = state.rankWild
        state.starsWildMax = state.starsWild
      } else if (state.rankWildMax === state.rankWild && state.starsWildMax < state.starsWild) {
        state.starsWildMax = state.starsWild
      }
    } else {
      if (state.rank === 0) return // max level
      state.rank--
      state.stars = 1
      if (state.rank === 0) state.stars = 0 // no star in last level
      if (state.highest > state.rank) state.highest = state.rank // store highest rank reached
      if (state.rankMax > state.rank) {
        // store max rank reached
        state.rankMax = state.rank
        state.starsMax = state.stars
      } else if (state.rankMax === state.rank && state.starsMax < state.stars) {
        state.starsMax = state.stars
      }
    }
  },
  [types.DECREASE_RANK] (state) {
    if (state.wildMode) {
      if (state.rankWild === 25) return // min level
      if (Constants.serie.milestones.indexOf(state.rankWild) > 0) return // cannot decrease if milestone reached
      state.rankWild++
      state.starsWild = Ranks[state.rankWild]['stars'] - 1 // max stars minus 1
    } else {
      if (state.rank === 25) return // min level
      if (Constants.serie.milestones.indexOf(state.rank) > 0) return // cannot decrease if milestone reached
      state.rank++
      state.stars = Ranks[state.rank]['stars'] - 1 // max stars minus 1
    }
  },
  [types.ADD_STAR] (state) {
    if (state.wildMode) {
      if (state.rankWild === 0) return
      if (state.starsWild === Ranks[state.rankWild]['stars']) return // no more star if already max
      state.starsWild++
      if (state.rankWildMax === state.rankWild && state.starsWildMax < state.starsWild) {
        // stored max wild stars
        state.starsWildMax = state.starsWild
      }
    } else {
      if (state.rank === 0) return
      if (state.stars === Ranks[state.rank]['stars']) return // no more star if already max
      state.stars++
      if (state.rankMax === state.rank && state.starsMax < state.stars) {
        // stored max stars
        state.starsMax = state.stars
      }
    }
  },
  [types.REMOVE_STAR] (state) {
    if (state.wildMode) {
      if (state.rankWild === 0) return
      if (state.starsWild === 0) return // no less than 0
      state.starsWild--
    } else {
      if (state.rank === 0) return
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
    state.rank = state.rankMax + 4
    if (state.rank > 25) {
      state.rank = 25
    }
    state.rankMax = state.rank
    state.stars = state.starsMax
    // low ranks could have less stars
    if (state.stars > Ranks[state.rank]['stars']) state.stars = Ranks[state.rank]['stars']
    state.winStreak = 0
    state.rankWild = state.rankWildMax + 4
    if (state.rankWild > 25) {
      state.rankWild = 25
    }
    state.rankWildMax = state.rankWild
    state.starsWild = state.starsWildMax
    if (state.starsWild > Ranks[state.rankWild]['stars']) state.starsWild = Ranks[state.rankWild]['stars']
    state.winStreakWild = 0
    state.highest = Math.min(state.rankMax, state.rankWildMax)
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
    state.starsMax = game.starsMax
    state.winStreak = game.winStreak
    state.rankWild = game.rankWild
    state.starsWild = game.starsWild
    state.starsWildMax = game.starsWildMax
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
