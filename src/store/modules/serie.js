import * as types from '../mutation-types'

// ----------
// Initial state
// ----------
const state = {
  RANKS: {
    25: {'title': 'Angry Chicken', 'stars': 2},
    24: {'title': 'Leper Gnome', 'stars': 2},
    23: {'title': 'Argent Squire', 'stars': 2},
    22: {'title': 'Murloc Raider', 'stars': 2},
    21: {'title': 'Southsea Deckhand', 'stars': 2},
    20: {'title': 'Shieldbearer', 'stars': 3},
    19: {'title': 'Novice Engineer', 'stars': 3},
    18: {'title': 'Sorcerer\'s Apprentice', 'stars': 3},
    17: {'title': 'Tauren Warrior', 'stars': 3},
    16: {'title': 'Questing Adventurer', 'stars': 3},
    15: {'title': 'Silvermoon Guardian', 'stars': 4},
    14: {'title': 'Raid Leader', 'stars': 4},
    13: {'title': 'Dread Corsair', 'stars': 4},
    12: {'title': 'Warsong Commander', 'stars': 4},
    11: {'title': 'Big Game Hunter', 'stars': 4},
    10: {'title': 'Ogre Magi', 'stars': 5},
    9: {'title': 'Silver Hand Knight', 'stars': 5},
    8: {'title': 'Frostwolf Warlord', 'stars': 5},
    7: {'title': 'Sunwalker', 'stars': 5},
    6: {'title': 'Ancient of War', 'stars': 5},
    5: {'title': 'Sea Giant', 'stars': 5},
    4: {'title': 'Mountain Giant', 'stars': 5},
    3: {'title': 'Molten Giant', 'stars': 5},
    2: {'title': 'The Black Knight', 'stars': 5},
    1: {'title': 'Innkeeper', 'stars': 5},
    0: {'title': 'Legend', 'stars': 0}
  },
  MILESTONES: [25, 20, 15, 10, 5, 0],
  RANK_LOSSCOUNT: 20,
  WIN_STREAK: 3,
  BONUS_STAR: 1,
  RANK_BONUSCANCELED: 5,

  rank: 25,
  stars: 0,
  winStreak: 0,
  highest: 25,
  history: []

}

// ----------
// Getters
// ----------
const getters = {
  rank: state => state.rank,
  rankTitle: state => (id) => {
    if (typeof id === 'undefined') id = state.rank
    return state.RANKS[id]['title']
  },
  rankStars: state => (id) => {
    if (typeof id === 'undefined') id = state.rank
    return state.RANKS[id]['stars']
  },
  nextMilestone: state => {
    if (state.rank === 0) return 0
    let nextMilestone = 0
    for (let i = state.MILESTONES.length - 1; i >= 0; i--) {
      if (state.MILESTONES[i] >= state.rank) break
      nextMilestone = state.MILESTONES[i]
    }
    return nextMilestone
  },
  starsToMilestone: (state, getters) => {
    if (state.rank === 0) return 0
    const nextMilestone = getters.nextMilestone
    let stars = 1
    for (let i = state.rank; i > nextMilestone; i--) {
      stars += state.RANKS[i]['stars']
    }
    stars -= state.stars
    return stars
  },
  winsToMilestone: (state, getters) => {
    if (state.rank === 0) return 0
    const starsToMilestone = getters.starsToMilestone
    // if no more bonus, wins = number of stars
    if (state.rank <= state.RANK_BONUSCANCELED) return starsToMilestone
    // games to win before bonus star
    let winTilBonus = state.WIN_STREAK - 1 - state.winStreak
    if (winTilBonus < 0) winTilBonus = 0
    let normalWins = Math.min(winTilBonus, starsToMilestone)
    // games to win with bonus
    let bonusWins = (starsToMilestone - normalWins) / (state.BONUS_STAR + 1)
    return Math.ceil(normalWins + bonusWins)
  },
  stars: state => state.stars,
  winStreak: state => state.winStreak,
  highest: state => state.highest,
  gamesPlayed: (state, getters) => { return getters.getGamesFiltered().length },
  gamesWon: (state, getters) => { return getters.getGamesFiltered(0, 'won').length },
  gamesLoss: (state, getters) => (getters.gamesPlayed - getters.gamesWon),
  winRate: (state, getters) => {
    if (getters.gamesPlayed === 0) return 0
    // round 2 digits
    return Math.round((getters.gamesWon / getters.gamesPlayed) * 100) / 100
  },
  getGamesFiltered: state => (numberOfGames, filter, value) => {
    if (typeof numberOfGames === 'undefined') numberOfGames = 0
    const historySliced = state.history.slice(-numberOfGames)
    if (typeof filter === 'undefined') return historySliced
    if (typeof value === 'undefined') value = true
    return historySliced.filter(game => { return game[filter] === value })
  }
}

// ----------
// Actions
// ----------
const actions = {
  earnStar ({commit, state}, number) {
    if (typeof number === 'undefined') number = 1 // default is earn 1 star
    let mult = 1
    if (number < 0) {
      if (state.rank > state.RANK_LOSSCOUNT) return // check if loss counted for current rank
      mult = -1
      number = -number // keep number absolute to iterate
    }
    for (let i = 0; i < number; i++) {
      if (state.stars === 0 && mult < 0) {
        // decrease when no star on rank
        commit(types.DECREASE_RANK)
      } else if (state.stars === state.RANKS[state.rank]['stars'] && mult > 0) {
        // increase when max stars on rank
        commit(types.INCREASE_RANK)
      } else if (mult > 0) {
        commit(types.ADD_STAR)
      } else {
        commit(types.REMOVE_STAR)
      }
    }
  },
  win ({dispatch, commit, state}, number) {
    if (typeof number === 'undefined') number = 1 // default is 1 win
    let bonusStar = 0
    if (state.rank > state.RANK_BONUSCANCELED) {
      if ((state.winStreak) >= state.WIN_STREAK) {
        bonusStar = number
      } else if ((number + state.winStreak) >= state.WIN_STREAK) {
        bonusStar = number - state.WIN_STREAK + 1 + state.winStreak
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
  reset ({dispatch, commit, state}) {
    const bonusStar = 25 - state.highest
    commit(types.RESET_SERIE)
    dispatch('earnStar', bonusStar)
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
    if (typeof data.highest === 'undefined') data.highest = data.rank

    // rank between 0 and 25
    if (data.rank >= 0 && data.rank <= 25) state.rank = parseInt(data.rank)
    // stars between 0 and max by rank, 0 if rank 0
    if (state.rank === 0) data.stars = 0
    if (data.stars >= 0 && data.stars <= state.RANKS[state.rank]['stars']) state.stars = parseInt(data.stars)
    // win streak must be > 0
    if (data.winStreak >= 0) state.winStreak = parseInt(data.winStreak)
    // highest should be at least rank
    if (data.highest > state.rank) data.highest = state.rank
    if (data.highest >= 0 && data.highest <= 25) state.highest = parseInt(data.highest)
  },
  [types.INCREASE_RANK] (state) {
    if (state.rank === 0) return // max level
    state.rank--
    state.stars = 1
    if (state.rank === 0) state.stars = 0 // no star in last level
    if (state.highest > state.rank) state.highest = state.rank // store highest rank reached
  },
  [types.DECREASE_RANK] (state) {
    if (state.rank === 25) return // min level
    if (state.MILESTONES.indexOf(state.rank) > 0) return // cannot decrease if milestone reached
    state.rank++
    state.stars = state.RANKS[state.rank]['stars'] - 1 // max stars minus 1
  },
  [types.ADD_STAR] (state) {
    if (state.rank === 0) return
    if (state.stars === state.RANKS[state.rank]['stars']) return // no more star if already max
    state.stars++
  },
  [types.REMOVE_STAR] (state) {
    if (state.rank === 0) return
    if (state.stars === 0) return // no less than 0
    state.stars--
  },
  [types.ADD_WIN_STREAK] (state, number) {
    if (typeof number === 'undefined') number = 0
    state.winStreak += number
  },
  [types.STOP_WIN_STREAK] (state) {
    state.winStreak = 0
  },
  [types.RESET_SERIE] (state) {
    state.highest = 25
    state.rank = 25
    state.stars = 0
    state.winstreak = 0
    state.history = []
  },
  [types.SET_HISTORY] (state, history) {
    state.history = history
  },
  [types.ADD_HISTORY] (state, history) {
    history.rank = state.rank
    history.stars = state.stars
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
