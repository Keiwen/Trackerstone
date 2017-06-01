import * as types from '../mutation-types'

// ----------
// Initial state
// ----------
const state = {
  CLASSES: {
    'druid': {'name': 'Druid'},
    'hunter': {'name': 'Hunter'},
    'mage': {'name': 'Mage'},
    'paladin': {'name': 'Paladin'},
    'priest': {'name': 'Priest'},
    'rogue': {'name': 'Rogue'},
    'shaman': {'name': 'Shaman'},
    'warlock': {'name': 'Warlock'},
    'warrior': {'name': 'Warrior'}
  },

  own: [],
  current: {},
  types: ['aggro', 'control', 'midrange', 'combo', 'tempo']

}

// ----------
// Getters
// ----------
const getters = {
  types: state => state.types,
  ownDeck: state => (id) => {
    if (typeof id === 'undefined') id = 0
//    if (typeof state.own[id] === 'undefined') return undefined
    return state.own[id]
  },
  own: state => state.own,
  current: state => state.current
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
  [types.ADD_DECK] (state, deckData) {
    state.own.push(deckData)
  },
  [types.REMOVE_DECK] (state, id) {
    state.own[id] = undefined
    if (state.current.id === id) {
      state.current = {}
    }
  },
  [types.CHOOSE_DECK] (state, id) {
    if (typeof state.own[id] === 'undefined') return
    state.current = state.own[id]
    state.current.id = id
  },
  [types.ADD_DECKTYPE] (state, name) {
    state.types.push(name)
  },
  [types.REMOVE_DECKTYPE] (state, name) {
    state.types.splice(state.types.indexOf(name), 1)
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
