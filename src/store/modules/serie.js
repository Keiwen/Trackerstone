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
  ARENA_KEYS: {
    0: {'title': 'Novice', 'rewards': 2},
    1: {'title': 'Apprentice', 'rewards': 2},
    2: {'title': 'Journeyman', 'rewards': 2},
    3: {'title': 'Copper', 'rewards': 3},
    4: {'title': 'Silver', 'rewards': 3},
    5: {'title': 'Gold', 'rewards': 3},
    6: {'title': 'Platinum', 'rewards': 3},
    7: {'title': 'Diamond', 'rewards': 3},
    8: {'title': 'Champion', 'rewards': 4},
    9: {'title': 'Ruby', 'rewards': 4},
    10: {'title': 'Frostborn', 'rewards': 4},
    11: {'title': 'Molten', 'rewards': 4},
    12: {'title': 'Lightforge', 'rewards': 5}
  },
  MILESTONES: [25, 20, 15, 10, 5, 0],
  RANK_LOSSCOUNT: 20,
  WIN_STREAK: 3,
  BONUS_STAR: 1,
  RANK_BONUSCANCELED: 5,

  ARENA_MAX_WIN: 12,
  ARENA_MAX_LOSS: 3,
  ARENA_FEE: 150,
  CARD_PACK_COST: 100,

  wildMode: false,
  rank: 25,
  stars: 0,
  winStreak: 0,
  rankWild: 25,
  starsWild: 0,
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
    return state.RANKS[id]['title']
  },
  rankStars: state => (id) => {
    if (typeof id === 'undefined') id = state.wildMode ? state.rankWild : state.rank
    return state.RANKS[id]['stars']
  },
  nextMilestone: state => {
    const rank = state.wildMode ? state.rankWild : state.rank
    if (rank === 0) return 0
    let nextMilestone = 0
    for (let i = state.MILESTONES.length - 1; i >= 0; i--) {
      if (state.MILESTONES[i] >= rank) break
      nextMilestone = state.MILESTONES[i]
    }
    return nextMilestone
  },
  starsToMilestone: (state, getters) => {
    const rank = state.wildMode ? state.rankWild : state.rank
    if (rank === 0) return 0
    const nextMilestone = getters.nextMilestone
    let stars = 1
    for (let i = rank; i > nextMilestone; i--) {
      stars += state.RANKS[i]['stars']
    }
    stars -= state.wildMode ? state.starsWild : state.stars
    return stars
  },
  starsInMilestone: (state, getters) => {
    const rank = state.wildMode ? state.rankWild : state.rank
    if (rank === 0) return 0
    const nextMilestone = getters.nextMilestone
    let prevMilestone = 25
    for (let i = state.MILESTONES.length - 1; i > 0; i--) {
      if (state.MILESTONES[i] === nextMilestone) {
        prevMilestone = state.MILESTONES[i - 1]
        break
      }
    }
    let stars = 1
    for (let i = prevMilestone; i > nextMilestone; i--) {
      stars += state.RANKS[i]['stars']
    }
    return stars
  },
  winsToMilestone: (state, getters) => {
    const rank = state.wildMode ? state.rankWild : state.rank
    if (rank === 0) return 0
    const starsToMilestone = getters.starsToMilestone
    // if no more bonus, wins = number of stars
    if (rank <= state.RANK_BONUSCANCELED) return starsToMilestone
    // games to win before bonus star
    const winStreak = state.wildMode ? state.winStreakWild : state.winStreak
    let winTilBonus = state.WIN_STREAK - 1 - winStreak
    if (winTilBonus < 0) winTilBonus = 0
    let normalWins = Math.min(winTilBonus, starsToMilestone)
    // games to win with bonus
    let bonusWins = (starsToMilestone - normalWins) / (state.BONUS_STAR + 1)
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
        totalStars += state.RANKS[i]['stars']
      }
    }
    return totalStars
  },
  isOnWinStreak: state => {
    let currentWinStreak = state.wildMode ? state.winStreakWild : state.winStreak
    return currentWinStreak >= state.WIN_STREAK
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
    return state.ARENA_KEYS[winCount]['title']
  },
  arenaOpen: state => state.arenaOpen,
  arenaFee: state => state.ARENA_FEE,
  cardPackCost: state => state.CARD_PACK_COST
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
      if (rank > state.RANK_LOSSCOUNT) return // check if loss counted for current rank
      mult = -1
      number = -number // keep number absolute to iterate
    }
    for (let i = 0; i < number; i++) {
      rank = state.wildMode ? state.rankWild : state.rank
      let stars = state.wildMode ? state.starsWild : state.stars
      if (stars === 0 && mult < 0) {
        // decrease when no star on rank
        commit(types.DECREASE_RANK)
      } else if (stars === state.RANKS[rank]['stars'] && mult > 0) {
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
    const rank = state.wildMode ? state.rankWild : state.rank
    const winStreak = state.wildMode ? state.winStreakWild : state.winStreak
    if (rank > state.RANK_BONUSCANCELED) {
      if ((winStreak) >= state.WIN_STREAK) {
        bonusStar = number
      } else if ((number + winStreak) >= state.WIN_STREAK) {
        bonusStar = number - state.WIN_STREAK + 1 + winStreak
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
    if (state.arenaWin >= state.ARENA_MAX_WIN) {
      dispatch('closeArena')
    }
  },
  looseArena ({dispatch, commit, state}) {
    if (!state.arenaOpen) return
    commit(types.ADD_ARENA_LOSS)
    if (state.arenaLoss >= state.ARENA_MAX_LOSS) {
      dispatch('closeArena')
    }
  },
  reset ({dispatch, commit, state}) {
    const bonusStar = 25 - state.highest
    commit(types.RESET_SERIE)
    commit(types.RESET_HISTORY)
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
    if (typeof data.rankWild === 'undefined') data.rank = 25
    if (typeof data.starsWild === 'undefined') data.stars = 0
    if (typeof data.winStreakWild === 'undefined') data.winStreakWild = 0
    if (typeof data.highest === 'undefined') data.highest = data.rank

    // rank between 0 and 25
    if (data.rank >= 0 && data.rank <= 25) state.rank = parseInt(data.rank)
    if (data.rankWild >= 0 && data.rankWild <= 25) state.rankWild = parseInt(data.rankWild)
    // stars between 0 and max by rank, 0 if rank 0
    if (state.rank === 0) data.stars = 0
    if (data.stars >= 0 && data.stars <= state.RANKS[state.rank]['stars']) state.stars = parseInt(data.stars)
    if (state.rankWild === 0) data.starsWild = 0
    if (data.starsWild >= 0 && data.starsWild <= state.RANKS[state.rankWild]['stars']) state.starsWild = parseInt(data.starsWild)
    // win streak must be >= 0
    if (data.winStreak >= 0) state.winStreak = parseInt(data.winStreak)
    if (data.winStreakWild >= 0) state.winStreakWild = parseInt(data.winStreakWild)
    // highest should be at least rank
    if (data.highest > state.rank) data.highest = state.rank
    if (data.highest > state.rankWild) data.highest = state.rankWild
    if (data.highest >= 0 && data.highest <= 25) state.highest = parseInt(data.highest)
  },
  [types.INCREASE_RANK] (state) {
    if (state.wildMode) {
      if (state.rankWild === 0) return // max level
      state.rankWild--
      state.starsWild = 1
      if (state.rankWild === 0) state.starsWild = 0 // no star in last level
      if (state.highest > state.rankWild) state.highest = state.rankWild // store highest rank reached
    } else {
      if (state.rank === 0) return // max level
      state.rank--
      state.stars = 1
      if (state.rank === 0) state.stars = 0 // no star in last level
      if (state.highest > state.rank) state.highest = state.rank // store highest rank reached
    }
  },
  [types.DECREASE_RANK] (state) {
    if (state.wildMode) {
      if (state.rankWild === 25) return // min level
      if (state.MILESTONES.indexOf(state.rankWild) > 0) return // cannot decrease if milestone reached
      state.rankWild++
      state.starsWild = state.RANKS[state.rankWild]['stars'] - 1 // max stars minus 1
    } else {
      if (state.rank === 25) return // min level
      if (state.MILESTONES.indexOf(state.rank) > 0) return // cannot decrease if milestone reached
      state.rank++
      state.stars = state.RANKS[state.rank]['stars'] - 1 // max stars minus 1
    }
  },
  [types.ADD_STAR] (state) {
    if (state.wildMode) {
      if (state.rankWild === 0) return
      if (state.starsWild === state.RANKS[state.rankWild]['stars']) return // no more star if already max
      state.starsWild++
    } else {
      if (state.rank === 0) return
      if (state.stars === state.RANKS[state.rank]['stars']) return // no more star if already max
      state.stars++
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
    state.highest = 25
    state.rank = 25
    state.stars = 0
    state.winStreak = 0
    state.rankWild = 25
    state.starsWild = 0
    state.winStreakWild = 0
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
