import * as types from '../mutation-types'
import Vue from 'vue'

// ----------
// Initial state
// ----------
const state = {
  CLASSES: {
    '': {id: '', name: 'None', backgroundColor: '#FFFFFF'},
    'druid': {id: 'druid', name: 'Druid', backgroundColor: '#663E27'},
    'hunter': {id: 'hunter', name: 'Hunter', backgroundColor: '#1D6619'},
    'mage': {id: 'mage', name: 'Mage', backgroundColor: '#2F6DAA'},
    'paladin': {id: 'paladin', name: 'Paladin', backgroundColor: '#BF761E'},
    'priest': {id: 'priest', name: 'Priest', backgroundColor: '#DCD0E8'},
    'rogue': {id: 'rogue', name: 'Rogue', backgroundColor: '#33262A'},
    'shaman': {id: 'shaman', name: 'Shaman', backgroundColor: '#3142AF'},
    'warlock': {id: 'warlock', name: 'Warlock', backgroundColor: '#542877'},
    'warrior': {id: 'warrior', name: 'Warrior', backgroundColor: '#750F1E'}
  },

  own: {},
  current: {},
  opponent: {},
  currentArena: {},
  opponentArena: {},
  archetypes: ['aggro', 'midrange', 'control', 'combo'],
  types: [
    {id: 1, name: 'Token', hsClass: 'druid', archetype: 'aggro', top: true, note: ''},
    {id: 2, name: 'Dragon', hsClass: 'priest', archetype: 'midrange', top: false, note: ''},
    {id: 3, name: 'Quest', hsClass: 'rogue', archetype: 'combo', top: false, note: ''},
    {id: 4, name: 'Evolve', hsClass: 'shaman', archetype: 'midrange', top: true, note: ''},
    {id: 5, name: 'Face', hsClass: 'hunter', archetype: 'aggro', top: true, note: ''},
    {id: 6, name: 'Freeze', hsClass: 'mage', archetype: 'control', top: false, note: ''},
    {id: 7, name: 'Jade', hsClass: 'druid', archetype: 'combo', top: true, note: ''},
    {id: 8, name: 'Mid-Range', hsClass: 'hunter', archetype: 'midrange', top: false, note: ''},
    {id: 9, name: 'Mid-Range', hsClass: 'paladin', archetype: 'midrange', top: false, note: ''},
    {id: 10, name: 'Miracle', hsClass: 'rogue', archetype: 'combo', top: true, note: ''},
    {id: 11, name: 'DK Taunt', hsClass: 'druid', archetype: 'midrange', top: true, note: ''},
    {id: 12, name: 'Murloc', hsClass: 'paladin', archetype: 'aggro', top: true, note: ''},
    {id: 13, name: 'Overload', hsClass: 'shaman', archetype: 'aggro', top: false, note: ''},
    {id: 14, name: 'Pirate', hsClass: 'warrior', archetype: 'aggro', top: true, note: ''},
    {id: 15, name: 'Quest', hsClass: 'priest', archetype: 'midrange', top: false, note: ''},
    {id: 16, name: 'Quest', hsClass: 'warrior', archetype: 'control', top: false, note: ''},
    {id: 17, name: 'Ramp', hsClass: 'druid', archetype: 'midrange', top: false, note: ''},
    {id: 18, name: 'Silence', hsClass: 'priest', archetype: 'midrange', top: false, note: ''},
    {id: 19, name: 'Secret', hsClass: 'mage', archetype: 'midrange', top: true, note: ''},
    {id: 20, name: 'Zoolock', hsClass: 'warlock', archetype: 'aggro', top: false, note: ''},
    {id: 21, name: 'Quest', hsClass: 'mage', archetype: 'combo', top: false, note: ''},
    {id: 22, name: 'DK Kazakus', hsClass: 'priest', archetype: 'control', top: false, note: ''},
    {id: 23, name: 'Jade elemental', hsClass: 'shaman', archetype: 'midrange', top: false, note: ''},
    {id: 24, name: 'DK lock', hsClass: 'warlock', archetype: 'control', top: false, note: ''}
  ],
  nextId: 1,
  nextTypeId: 25,
  lastDeckChanged: 0,
  lastTypeChanged: 0

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
    return getters.getTypesFiltered('hsClass', hsClass)
  },
  getTypesWithArchetype: (state, getters) => (archetype) => {
    return getters.getTypesFiltered('archetype', archetype)
  },
  getTypesOnTop: (state, getters) => (top) => {
    if (typeof top === 'undefined') top = true
    return getters.getTypesFiltered('top', top)
  },
  current: state => state.current,
  opponent: state => state.opponent,
  currentArena: state => state.currentArena,
  opponentArena: state => state.opponentArena,
  lastDeckChanged: state => state.lastDeckChanged,
  lastTypeChanged: state => state.lastTypeChanged
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
    Vue.set(state.own, state.nextId, deckData)
    state.lastDeckChanged = state.nextId
    state.nextId++
  },
  [types.REMOVE_DECK] (state, id) {
    Vue.delete(state.own, id)
    state.lastDeckChanged = id
    if (state.current.id === id) {
      state.current = {}
    }
  },
  [types.SET_OWN_DECKLIST] (state, deckList) {
    state.lastDeckChanged = 0
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
  [types.CHOOSE_DECK_ARENA] (state, id) {
    if (typeof state.CLASSES[id] === 'undefined') return
    state.currentArena = state.CLASSES[id]
  },
  [types.CHOOSE_OPPONENT_ARENA] (state, id) {
    if (typeof state.CLASSES[id] === 'undefined') return
    state.opponentArena = state.CLASSES[id]
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
    state.lastTypeChanged = type.id
    state.nextTypeId++
    state.types.push(type)
  },
  [types.SET_DECKTYPES] (state, deckTypes) {
    state.lastTypeChanged = 0
    state.types = deckTypes
  },
  [types.REMOVE_DECKTYPE] (state, id) {
    state.types.forEach(function (type, index, object) {
      if (type.id === id) {
        object.splice(index, 1)
      }
    })
    state.lastTypeChanged = id
    if (state.opponent.id === id) {
      state.opponent = {}
    }
  },
  [types.SET_DECKTYPE_NAME] (state, payload) {
    state.types.forEach(function (type, index, object) {
      if (type.id === payload.id) {
        state.lastTypeChanged = type.id
        type.name = payload.name
      }
    })
  },
  [types.SET_DECKTYPE_NOTE] (state, payload) {
    state.types.forEach(function (type, index, object) {
      if (type.id === payload.id) {
        state.lastTypeChanged = type.id
        type.note = payload.note
      }
    })
  },
  [types.SWITCH_DECKTYPE_TOP] (state, id) {
    state.types.forEach(function (type, index, object) {
      if (type.id === id) {
        state.lastTypeChanged = type.id
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
