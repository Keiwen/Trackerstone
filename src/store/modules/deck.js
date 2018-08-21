import * as types from '../mutation-types'
import Vue from 'vue'

// ----------
// Initial state
// ----------
const state = {
  CLASSES: {
    '': {id: '', name: 'None', backgroundColor: '#FFFFFF', heroes: []},
    'druid': {id: 'druid', name: 'Druid', backgroundColor: '#663E27', heroes: ['malfurion', 'lunara']},
    'hunter': {id: 'hunter', name: 'Hunter', backgroundColor: '#1D6619', heroes: ['rexxar', 'alleria']},
    'mage': {id: 'mage', name: 'Mage', backgroundColor: '#2F6DAA', heroes: ['jaina', 'khagdar', 'medivh']},
    'paladin': {id: 'paladin', name: 'Paladin', backgroundColor: '#BF761E', heroes: ['uther', 'liadrin', 'arthas']},
    'priest': {id: 'priest', name: 'Priest', backgroundColor: '#DCD0E8', heroes: ['anduin', 'tyrande']},
    'rogue': {id: 'rogue', name: 'Rogue', backgroundColor: '#33262A', heroes: ['valeera', 'maeiv']},
    'shaman': {id: 'shaman', name: 'Shaman', backgroundColor: '#3142AF', heroes: ['thrall', 'morgl']},
    'warlock': {id: 'warlock', name: 'Warlock', backgroundColor: '#542877', heroes: ['gul\'dan', 'nemsy', 'jaraxxus']},
    'warrior': {id: 'warrior', name: 'Warrior', backgroundColor: '#750F1E', heroes: ['garrosh', 'magni']}
  },

  own: {},
  myHeroes: {
    'druid': 'malfurion',
    'hunter': 'rexxar',
    'mage': 'jaina',
    'paladin': 'uther',
    'priest': 'anduin',
    'rogue': 'valeera',
    'shaman': 'thrall',
    'warlock': 'gul\'dan',
    'warrior': 'garrosh'
  },
  current: 0,
  opponent: 0,
  currentArena: {},
  opponentArena: {},
  archetypes: {
    'aggro': {id: 'aggro', backgroundColor: '#D43F3A'},
    'midrange': {id: 'midrange', backgroundColor: '#4CAE4C'},
    'control': {id: 'control', backgroundColor: '#089FA0'},
    'combo': {id: 'combo', backgroundColor: '#D3921F'}
    // 'generic' archetype is reserved for untracked type
  },
  types: [
    {id: 1, name: 'Cube', hsClass: 'warlock', archetype: 'midrange', top: true, note: ''},
    {id: 2, name: 'Odd', hsClass: 'paladin', archetype: 'aggro', top: true, note: ''},
    {id: 3, name: 'Spiteful', hsClass: 'druid', archetype: 'midrange', top: true, note: ''},
    {id: 4, name: 'Even', hsClass: 'paladin', archetype: 'midrange', top: true, note: ''},
    {id: 5, name: 'Taunt', hsClass: 'druid', archetype: 'midrange', top: true, note: ''},
    {id: 6, name: 'Spiteful', hsClass: 'priest', archetype: 'midrange', top: true, note: ''},
    {id: 7, name: 'Odd', hsClass: 'rogue', archetype: 'aggro', top: true, note: ''},
    {id: 8, name: 'Face', hsClass: 'hunter', archetype: 'aggro', top: true, note: ''},
    {id: 9, name: 'Tempo', hsClass: 'mage', archetype: 'aggro', top: true, note: ''},
    {id: 10, name: 'Quest', hsClass: 'rogue', archetype: 'combo', top: true, note: ''},
    {id: 11, name: 'Tempo', hsClass: 'rogue', archetype: 'aggro', top: true, note: ''},
    {id: 12, name: 'Big spell', hsClass: 'mage', archetype: 'control', top: true, note: ''},
    {id: 13, name: 'Rinlock', hsClass: 'warlock', archetype: 'control', top: false, note: ''},
    {id: 14, name: 'Shudderwock', hsClass: 'shaman', archetype: 'combo', top: false, note: ''},
    {id: 15, name: 'Miracle', hsClass: 'rogue', archetype: 'midrange', top: false, note: ''},
    {id: 16, name: 'Elemental', hsClass: 'mage', archetype: 'midrange', top: false, note: ''},
    {id: 17, name: 'Mind Blast', hsClass: 'priest', archetype: 'control', top: false, note: ''},
    {id: 18, name: 'Zoolock', hsClass: 'warlock', archetype: 'aggro', top: false, note: ''},
    {id: 19, name: 'Odd Taunt', hsClass: 'warrior', archetype: 'midrange', top: false, note: ''},
    {id: 20, name: 'Murloc', hsClass: 'paladin', archetype: 'aggro', top: false, note: ''},
    {id: 21, name: 'Elemental', hsClass: 'shaman', archetype: 'midrange', top: false, note: ''},
    {id: 22, name: 'Inner Fire', hsClass: 'priest', archetype: 'combo', top: false, note: ''},
    {id: 23, name: 'Taunt', hsClass: 'warrior', archetype: 'midrange', top: false, note: ''},
    {id: 24, name: 'Spell', hsClass: 'hunter', archetype: 'midrange', top: false, note: ''},
    {id: 25, name: 'Midrange', hsClass: 'hunter', archetype: 'midrange', top: false, note: ''},
    {id: 26, name: 'Aggro', hsClass: 'paladin', archetype: 'aggro', top: false, note: ''},
    {id: 27, name: 'Control', hsClass: 'warrior', archetype: 'control', top: false, note: ''},
    {id: 28, name: 'Rush', hsClass: 'warrior', archetype: 'aggro', top: false, note: ''},
    {id: 29, name: 'Even', hsClass: 'shaman', archetype: 'aggro', top: false, note: ''},
    {id: 30, name: 'Token', hsClass: 'druid', archetype: 'aggro', top: false, note: ''},
    {id: 31, name: 'Quest', hsClass: 'druid', archetype: 'midrange', top: false, note: ''},
    {id: 32, name: 'Resurrect', hsClass: 'priest', archetype: 'midrange', top: false, note: ''},
    {id: 33, name: 'Kingsbane', hsClass: 'rogue', archetype: 'midrange', top: false, note: ''},
    {id: 34, name: 'Pirate', hsClass: 'warrior', archetype: 'aggro', top: false, note: ''}
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
  getGenericType: (state, getters) => (className) => {
    return {id: className, name: '', hsClass: className, archetype: 'generic', top: false, note: ''}
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
    if (typeof state.CLASSES[hsClass] === 'undefined') return []
    return state.CLASSES[hsClass]['heroes']
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
  loadDeckTypeUpdate ({dispatch}) {
    return new Promise((resolve, reject) => {
      Vue.http.get('https://keiwen.github.io/Trackerstone/static/dtus.json').then(
        (response) => {
          resolve(response.body)
        },
        (response) => {
          reject(response)
          dispatch('addError', 'Cannot retrieve deck types data from server')
        }
      )
    })
  }
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
    if (typeof state.CLASSES[id] === 'undefined') return
    state.currentArena = state.CLASSES[id]
  },
  [types.CHOOSE_OPPONENT_ARENA] (state, id) {
    if (typeof state.CLASSES[id] === 'undefined') return
    state.opponentArena = state.CLASSES[id]
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
  },
  [types.UPDATE_DTUS_TIME] (state) {
    state.lastDeckTypeUpdate = Date.now()
  },
  [types.CHOOSE_HERO] (state, payload) {
    if (typeof state.CLASSES[payload.hsClass] === 'undefined') return
    if (!state.CLASSES[payload.hsClass].heroes.includes(payload.hero)) return
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
