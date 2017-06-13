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
  opponent: {},
  archetypes: ['aggro', 'midrange', 'control', 'combo'],
  types: [
    {name: 'Aggro', hsClass: 'druid', archetype: 'aggro', top: false},
    {name: 'Dragon', hsClass: 'priest', archetype: 'midrange', top: false},
    {name: 'Elemental', hsClass: 'chaman', archetype: 'midrange', top: false},
    {name: 'Evolve', hsClass: 'chaman', archetype: 'midrange', top: false},
    {name: 'Face', hsClass: 'hunter', archetype: 'aggro', top: true},
    {name: 'Flamewaker', hsClass: 'mage', archetype: 'midrange', top: false},
    {name: 'Freeze', hsClass: 'mage', archetype: 'control', top: false},
    {name: 'Jade', hsClass: 'druid', archetype: 'combo', top: false},
    {name: 'Handlock', hsClass: 'warlock', archetype: 'control', top: false},
    {name: 'Mid-Range', hsClass: 'hunter', archetype: 'midrange', top: false},
    {name: 'Mid-Range', hsClass: 'paladin', archetype: 'midrange', top: false},
    {name: 'Mill', hsClass: 'rogue', archetype: 'combo', top: false},
    {name: 'Miracle', hsClass: 'rogue', archetype: 'combo', top: false},
    {name: 'Mech', hsClass: 'mage', archetype: 'midrange', top: false},
    {name: 'Mech', hsClass: 'shaman', archetype: 'aggro', top: false},
    {name: 'Medivh', hsClass: 'mage', archetype: 'control', top: false},
    {name: 'Murloc', hsClass: 'paladin', archetype: 'aggro', top: true},
    {name: 'Overload', hsClass: 'shaman', archetype: 'aggro', top: false},
    {name: 'Patron', hsClass: 'warrior', archetype: 'combo', top: false},
    {name: 'Pirate', hsClass: 'warrior', archetype: 'aggro', top: true},
    {name: 'Quest', hsClass: 'priest', archetype: 'midrange', top: false},
    {name: 'Quest', hsClass: 'rogue', archetype: 'combo', top: true},
    {name: 'Quest', hsClass: 'warrior', archetype: 'control', top: true},
    {name: 'Ramp', hsClass: 'druid', archetype: 'midrange', top: false},
    {name: 'Renolock', hsClass: 'warlock', archetype: 'control', top: false},
    {name: 'Silence', hsClass: 'priest', archetype: 'midrange', top: false},
    {name: 'Secret', hsClass: 'paladin', archetype: 'aggro', top: true},
    {name: 'Token', hsClass: 'druid', archetype: 'aggro', top: false},
    {name: 'Zoolock', hsClass: 'warlock', archetype: 'aggro', top: false}
  ],
  nextId: 1

}

// ----------
// Getters
// ----------
const getters = {
  classes: state => state.CLASSES,
  types: state => state.types,
  archetypes: state => state.archetypes,
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
  getTypesFiltered: state => (filter, value) => {
    if (typeof value === 'undefined') value = true
    return state.types.filter(type => { return type[filter] === value })
  },
  current: state => state.current,
  opponent: state => state.opponent
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
    state.current.id = parseInt(id)
  },
  [types.CHOOSE_OPPONENT] (state, type) {
    state.opponent = type
  },
  [types.ADD_DECKARCHETYPE] (state, name) {
    state.archetypes.push(name)
  },
  [types.SET_DECKARCHETYPES] (state, deckArcheypes) {
    state.archetypes = deckArcheypes
  },
  [types.REMOVE_DECKARCHETYPE] (state, name) {
    state.archetypes.splice(state.archetypes.indexOf(name), 1)
  },
  [types.ADD_DECKTYPE] (state, type) {
    state.types.push(type)
  },
  [types.SET_DECKTYPES] (state, deckTypes) {
    state.types = deckTypes
  },
  [types.REMOVE_DECKTYPE] (state, type) {
    state.types.splice(state.types.indexOf(type), 1)
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
