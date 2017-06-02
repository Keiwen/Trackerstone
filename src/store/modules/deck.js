import * as types from '../mutation-types'
import Vue from 'vue'

// ----------
// Initial state
// ----------
const state = {
  CLASSES: {
    '': {'name': ''},
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

  own: {},
  current: {},
  types: ['aggro', 'control', 'midrange', 'combo', 'tempo'],
  nextId: 1

}

// ----------
// Getters
// ----------
const getters = {
  classes: state => state.CLASSES,
  types: state => state.types,
  ownDeck: state => (id) => {
    if (typeof id === 'undefined') id = 0
    if (typeof state.own[id] === 'undefined') return {}
    return state.own[id]
  },
  className: state => (id) => {
    if (typeof state.CLASSES[id] === 'undefined') return ''
    return state.CLASSES[id]['name']
  },
  own: state => state.own,
  nextId: state => state.nextId,
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
    state.own[state.nextId] = deckData
    state.nextId++
  },
  [types.REMOVE_DECK] (state, id) {
    Vue.delete(state.own, id)
    if (state.current.id === id) {
      state.current = {}
    }
  },
  [types.SET_OWN_DECKLIST] (state, deckList) {
    state.own = deckList
  },
  [types.SET_DECK_NEXTID] (state, nextId) {
    state.nextId = nextId
  },
  [types.CHOOSE_DECK] (state, id) {
    if (typeof state.own[id] === 'undefined') return
    state.current = state.own[id]
    state.current.id = id
  },
  [types.ADD_DECKTYPE] (state, name) {
    state.types.push(name)
  },
  [types.SET_DECKTYPES] (state, deckTypes) {
    state.types = deckTypes
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
