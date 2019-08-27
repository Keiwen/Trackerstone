import * as types from '../mutation-types'
import Vue from 'vue'
import Constants from '@/assets/db/constants.json'
import CardSet from '@/assets/db/cardset.json'
import DefaultData from '@/assets/db/defaultData.json'

// ----------
// Initial state
// ----------
const state = {
  cardpacks: {}
}

// ----------
// Getters
// ----------
const getters = {
  cardset: state => CardSet,
  getCardset: (state, getters) => (key) => {
    const setList = getters.cardset
    if (typeof setList[key] === 'undefined') return {}
    return setList[key]
  },
  getCardsetStat: (state, getters) => (key) => {
    let cardsetStat = JSON.parse(JSON.stringify(DefaultData.cardpack))
    if (typeof state.cardpacks[key] !== 'undefined') {
      cardsetStat = JSON.parse(JSON.stringify(state.cardpacks[key]))
    }
    cardsetStat['nextEpicIn'] = Constants.cardpack.epicEvery + cardsetStat['lastEpicInPack'] - cardsetStat['opened']
    if (cardsetStat['lastLegendaryInPack']) {
      // first legendary found
      cardsetStat['nextLegendaryIn'] = Constants.cardpack.legendaryEvery + cardsetStat['lastLegendaryInPack'] - cardsetStat['opened']
    } else {
      // first legendary not open
      cardsetStat['nextLegendaryIn'] = Constants.cardpack.legendaryInFirst - cardsetStat['opened']
    }
    return cardsetStat
  },
  getSetFiltered: (state, getters) => (filter, value) => {
    const fullSet = getters.cardset
    if (typeof filter === 'undefined') return fullSet
    if (typeof value === 'undefined') value = true
    let setFiltered = {}
    for (let setKey in fullSet) {
      if (fullSet.hasOwnProperty(setKey)) {
        if (fullSet[setKey][filter] === value) {
          setFiltered[setKey] = fullSet[setKey]
        }
      }
    }
    return setFiltered
  },
  cardsetWithPack: (state, getters) => {
    return getters.getSetFiltered('hasPack', true)
  },
  cardsetStandard: (state, getters) => {
    return getters.getSetFiltered('wild', false)
  },
  cardsetWild: (state, getters) => {
    return getters.getSetFiltered('wild', true)
  }
}

// ----------
// Actions
// ----------
const actions = {
  openPack ({commit, state}, packData) {
    commit(types.OPEN_PACK, packData)
  }
}

// ----------
// Mutations
// ----------
const mutations = {
  [types.OPEN_PACK] (state, payload) {
    if (typeof payload.cardset === 'undefined') return
    const cardsetKey = payload.cardset
    if (typeof state.cardpacks[cardsetKey] === 'undefined') {
      let cardpackData = JSON.parse(JSON.stringify(DefaultData.cardpack))
      Vue.set(state.cardpacks, cardsetKey, cardpackData)
    }

    state.cardpacks[cardsetKey]['opened']++
    state.cardpacks[cardsetKey]['common'] += payload.common
    state.cardpacks[cardsetKey]['rare'] += payload.rare
    state.cardpacks[cardsetKey]['epic'] += payload.epic
    state.cardpacks[cardsetKey]['legendary'] += payload.legendary
    if (payload.epic) state.cardpacks[cardsetKey]['lastEpicInPack'] = state.cardpacks[cardsetKey]['opened']
    if (payload.legendary) state.cardpacks[cardsetKey]['lastLegendaryInPack'] = state.cardpacks[cardsetKey]['opened']
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
