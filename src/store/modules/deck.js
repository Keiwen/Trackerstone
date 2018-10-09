import * as types from '../mutation-types'
import Vue from 'vue'
import HsClasses from '@/assets/db/hsClasses.json'
import Archetypes from '@/assets/db/archetypes.json'
// generic archetype is reserved for untracked types
import Dtus from '@/assets/db/dtus.json'
// Deck Types Update System

// ----------
// Initial state
// ----------
const state = {
  own: {},
  myHeroes: {
    'druid': 'malfurion',
    'hunter': 'rexxar',
    'mage': 'jaina',
    'paladin': 'uther',
    'priest': 'anduin',
    'rogue': 'valeera',
    'shaman': 'thrall',
    'warlock': 'guldan',
    'warrior': 'garrosh'
  },
  current: 0,
  opponent: 0,
  currentArena: {},
  opponentArena: {},
  types: [
    {id: 1, name: 'Cube', hsClass: 'warlock', archetype: 'midrange', top: true, note: '', representCard: ''},
    {id: 2, name: 'Odd', hsClass: 'paladin', archetype: 'aggro', top: true, note: '', representCard: ''},
    {id: 3, name: 'Spiteful', hsClass: 'druid', archetype: 'midrange', top: true, note: '', representCard: ''},
    {id: 4, name: 'Even', hsClass: 'paladin', archetype: 'midrange', top: true, note: '', representCard: ''},
    {id: 5, name: 'Taunt', hsClass: 'druid', archetype: 'midrange', top: true, note: '', representCard: ''},
    {id: 6, name: 'Spiteful', hsClass: 'priest', archetype: 'midrange', top: true, note: '', representCard: ''},
    {id: 7, name: 'Odd', hsClass: 'rogue', archetype: 'aggro', top: true, note: '', representCard: ''},
    {id: 8, name: 'Face', hsClass: 'hunter', archetype: 'aggro', top: true, note: '', representCard: ''},
    {id: 9, name: 'Tempo', hsClass: 'mage', archetype: 'aggro', top: true, note: '', representCard: ''},
    {id: 10, name: 'Quest', hsClass: 'rogue', archetype: 'combo', top: true, note: '', representCard: ''},
    {id: 11, name: 'Tempo', hsClass: 'rogue', archetype: 'aggro', top: true, note: '', representCard: ''},
    {id: 12, name: 'Big spell', hsClass: 'mage', archetype: 'control', top: true, note: '', representCard: ''},
    {id: 13, name: 'Rinlock', hsClass: 'warlock', archetype: 'control', top: false, note: '', representCard: ''},
    {id: 14, name: 'Shudderwock', hsClass: 'shaman', archetype: 'combo', top: false, note: '', representCard: ''},
    {id: 15, name: 'Miracle', hsClass: 'rogue', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 16, name: 'Elemental', hsClass: 'mage', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 17, name: 'Mind Blast', hsClass: 'priest', archetype: 'control', top: false, note: '', representCard: ''},
    {id: 18, name: 'Zoolock', hsClass: 'warlock', archetype: 'aggro', top: false, note: '', representCard: ''},
    {id: 19, name: 'Odd Taunt', hsClass: 'warrior', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 20, name: 'Murloc', hsClass: 'paladin', archetype: 'aggro', top: false, note: '', representCard: ''},
    {id: 21, name: 'Elemental', hsClass: 'shaman', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 22, name: 'Inner Fire', hsClass: 'priest', archetype: 'combo', top: false, note: '', representCard: ''},
    {id: 23, name: 'Taunt', hsClass: 'warrior', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 24, name: 'Spell', hsClass: 'hunter', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 25, name: 'Midrange', hsClass: 'hunter', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 26, name: 'Aggro', hsClass: 'paladin', archetype: 'aggro', top: false, note: '', representCard: ''},
    {id: 27, name: 'Control', hsClass: 'warrior', archetype: 'control', top: false, note: '', representCard: ''},
    {id: 28, name: 'Rush', hsClass: 'warrior', archetype: 'aggro', top: false, note: '', representCard: ''},
    {id: 29, name: 'Even', hsClass: 'shaman', archetype: 'aggro', top: false, note: '', representCard: ''},
    {id: 30, name: 'Token', hsClass: 'druid', archetype: 'aggro', top: false, note: '', representCard: ''},
    {id: 31, name: 'Quest', hsClass: 'druid', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 32, name: 'Resurrect', hsClass: 'priest', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 33, name: 'Kingsbane', hsClass: 'rogue', archetype: 'midrange', top: false, note: '', representCard: ''},
    {id: 34, name: 'Pirate', hsClass: 'warrior', archetype: 'aggro', top: false, note: '', representCard: ''}
  ],
  nextId: 1,
  nextTypeId: 35,
  lastDeckChanged: 0,
  lastTypeChanged: 0,
  lastDeckTypeUpdate: 1525400000000

}

// ----------
// Getters
// ----------
const getters = {
  classes: state => HsClasses,
  types: state => state.types,
  archetypes: state => Archetypes,
  dtus: state => Dtus,
  className: state => (id) => {
    if (typeof HsClasses[id] === 'undefined') return ''
    return HsClasses[id]['name']
  },
  own: state => state.own,
  nextId: state => state.nextId,
  nextTypeId: state => state.nextTypeId,
  getGenericType: (state, getters) => (className) => {
    return {id: className, name: '', hsClass: className, archetype: 'generic', top: false, note: '', representCard: ''}
  },
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
  current: state => {
    if (typeof state.own[state.current] === 'undefined') return {}
    let currentDeck = state.own[state.current]
    currentDeck.id = state.current
    return currentDeck
  },
  opponent: (state, getters) => {
    let opponentType = {}
    if (!Number.isInteger(state.opponent) && state.opponent.length > 0) {
      // string as opponent id => generic type
      return getters.getGenericType(state.opponent)
    }
    for (let i = 0; i < state.types.length; i++) {
      if (state.types[i].id === state.opponent) {
        opponentType = state.types[i]
        break
      }
    }
    return opponentType
  },
  currentArena: state => state.currentArena,
  opponentArena: state => state.opponentArena,
  lastDeckChanged: state => state.lastDeckChanged,
  lastTypeChanged: state => state.lastTypeChanged,
  lastDeckTypeUpdate: state => state.lastDeckTypeUpdate,
  heroesForClass: state => (hsClass) => {
    if (typeof HsClasses[hsClass] === 'undefined') return []
    return HsClasses[hsClass]['heroes']
  },
  myHeroes: state => state.myHeroes,
  myHeroForClass: state => (hsClass) => {
    if (typeof state.myHeroes[hsClass] === 'undefined') return ''
    return state.myHeroes[hsClass]
  }

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
    deckData.id = state.nextId
    Vue.set(state.own, state.nextId, deckData)
    state.lastDeckChanged = state.nextId
    state.nextId++
  },
  [types.REMOVE_DECK] (state, id) {
    Vue.delete(state.own, id)
    state.lastDeckChanged = id
    if (state.current === id) {
      state.current = 0
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
    state.current = parseInt(id)
  },
  [types.CHOOSE_OPPONENT] (state, type) {
    if (typeof type === 'object') type = type.id
    state.opponent = type
  },
  [types.CHOOSE_DECK_ARENA] (state, id) {
    if (typeof HsClasses[id] === 'undefined') return
    state.currentArena = HsClasses[id]
  },
  [types.CHOOSE_OPPONENT_ARENA] (state, id) {
    if (typeof HsClasses[id] === 'undefined') return
    state.opponentArena = HsClasses[id]
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
    if (state.opponent === id) {
      state.opponent = 0
    }
  },
  [types.SET_DECK] (state, payload) {
    const idDeck = parseInt(payload.id)
    if (typeof state.own[idDeck] === 'undefined') return
    state.lastDeckChanged = idDeck
    if (typeof payload.name !== 'undefined') state.own[idDeck]['name'] = payload.name
    if (typeof payload.note !== 'undefined') state.own[idDeck]['note'] = payload.note
    if (typeof payload.exportCode !== 'undefined') state.own[idDeck]['exportCode'] = payload.exportCode
    if (typeof payload.serie !== 'undefined') state.own[idDeck]['serie'] = payload.serie
    if (typeof payload.representCard !== 'undefined') state.own[idDeck]['representCard'] = payload.representCard
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
  [types.SET_DECKTYPE_REPRESENTCARD] (state, payload) {
    state.types.forEach(function (type, index, object) {
      if (type.id === payload.id) {
        state.lastTypeChanged = type.id
        type.representCard = payload.representCard
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
  },
  [types.UPDATE_DTUS_TIME] (state) {
    state.lastDeckTypeUpdate = Date.now()
  },
  [types.CHOOSE_HERO] (state, payload) {
    if (typeof HsClasses[payload.hsClass] === 'undefined') return
    if (!HsClasses[payload.hsClass].heroes.includes(payload.hero)) return
    Vue.set(state.myHeroes, payload.hsClass, payload.hero)
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
