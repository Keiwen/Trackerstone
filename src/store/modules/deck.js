import * as types from '../mutation-types'
import Vue from 'vue'

// ----------
// Initial state
// ----------
const state = {
  CLASSES: {
    '': {'name': 'None'},
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
    {id: 1, name: 'Aggro', hsClass: 'druid', archetype: 'aggro', top: true, note: ''},
    {id: 2, name: 'Dragon', hsClass: 'priest', archetype: 'midrange', top: false, note: ''},
    {id: 3, name: 'Quest', hsClass: 'rogue', archetype: 'combo', top: false, note: ''},
    {id: 4, name: 'Evolve', hsClass: 'shaman', archetype: 'midrange', top: true, note: ''},
    {id: 5, name: 'Face', hsClass: 'hunter', archetype: 'aggro', top: false, note: ''},
    {id: 6, name: 'Freeze', hsClass: 'mage', archetype: 'control', top: false, note: ''},
    {id: 7, name: 'Jade', hsClass: 'druid', archetype: 'combo', top: true, note: ''},
    {id: 8, name: 'Mid-Range', hsClass: 'hunter', archetype: 'midrange', top: false, note: ''},
    {id: 9, name: 'Mid-Range', hsClass: 'paladin', archetype: 'midrange', top: false, note: ''},
    {id: 10, name: 'Miracle', hsClass: 'rogue', archetype: 'combo', top: true, note: ''},
    {id: 11, name: 'Token', hsClass: 'druid', archetype: 'aggro', top: false, note: ''},
    {id: 12, name: 'Murloc', hsClass: 'paladin', archetype: 'aggro', top: true, note: ''},
    {id: 13, name: 'Overload', hsClass: 'shaman', archetype: 'aggro', top: false, note: ''},
    {id: 14, name: 'Pirate', hsClass: 'warrior', archetype: 'aggro', top: true, note: ''},
    {id: 15, name: 'Quest', hsClass: 'priest', archetype: 'midrange', top: false, note: ''},
    {id: 16, name: 'Quest', hsClass: 'warrior', archetype: 'control', top: false, note: ''},
    {id: 17, name: 'Ramp', hsClass: 'druid', archetype: 'midrange', top: false, note: ''},
    {id: 18, name: 'Silence', hsClass: 'priest', archetype: 'midrange', top: false, note: ''},
    {id: 19, name: 'Secret', hsClass: 'mage', archetype: 'aggro', top: true, note: ''},
    {id: 20, name: 'Zoolock', hsClass: 'warlock', archetype: 'aggro', top: false, note: ''}
  ],
  nextId: 1,
  nextTypeId: 23

}

// ----------
// Getters
// ----------
const getters = {
  classes: state => state.CLASSES,
  types: state => state.types,
  archetypes: state => state.archetypes,
  className: state => (id) => {
    if (typeof state.CLASSES[id] === 'undefined') return ''
    return state.CLASSES[id]['name']
  },
  own: state => state.own,
  nextId: state => state.nextId,
  nextTypeId: state => state.nextTypeId,
  getTypesFiltered: state => (filter, value) => {
    if (typeof value === 'undefined') value = true
    return state.types.filter(type => { return type[filter] === value })
  },
  getTypesWithClass: (state, getters) => (hsClass) => {
    return getters.getTypesFiltered('hcClass', hsClass)
  },
  getTypesWithArchetype: (state, getters) => (archetype) => {
    return getters.getTypesFiltered('archetype', archetype)
  },
  getTypesOnTop: (state, getters) => (top) => {
    if (typeof top === 'undefined') top = true
    return getters.getTypesFiltered('top', top)
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
    type.id = state.nextTypeId
    state.nextTypeId++
    state.types.push(type)
  },
  [types.SET_DECKTYPES] (state, deckTypes) {
    state.types = deckTypes
  },
  [types.REMOVE_DECKTYPE] (state, id) {
    state.types.forEach(function (type, index, object) {
      if (type.id === id) {
        object.splice(index, 1)
      }
    })
    if (state.opponent.id === id) {
      state.opponent = {}
    }
  },
  [types.SET_DECKTYPE_NAME] (state, payload) {
    state.types.forEach(function (type, index, object) {
      if (type.id === payload.id) {
        type.name = payload.name
      }
    })
  },
  [types.SET_DECKTYPE_NOTE] (state, payload) {
    state.types.forEach(function (type, index, object) {
      if (type.id === payload.id) {
        type.note = payload.note
      }
    })
  },
  [types.SWITCH_DECKTYPE_TOP] (state, id) {
    state.types.forEach(function (type, index, object) {
      if (type.id === id) {
        type.top = !type.top
      }
    })
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
