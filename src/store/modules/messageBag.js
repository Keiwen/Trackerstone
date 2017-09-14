import * as types from '../mutation-types'

// ----------
// Initial state
// ----------
const state = {
  messages: []
}

// ----------
// Getters
// ----------
const getters = {
  messageBag: state => state.messages
}

// ----------
// Actions
// ----------
const actions = {
  addMessage ({dispatch, commit, state}, message) {
    commit(types.ADD_MESSAGE, message)
  },
  addSuccess ({dispatch, commit, state}, messageContent) {
    dispatch('addMessage', {type: 'success', message: messageContent})
  },
  addError ({dispatch, commit, state}, messageContent) {
    dispatch('addMessage', {type: 'error', message: messageContent})
  },
  addWarning ({dispatch, commit, state}, messageContent) {
    dispatch('addMessage', {type: 'warning', message: messageContent})
  },
  addInfo ({dispatch, commit, state}, messageContent) {
    dispatch('addMessage', {type: 'info', message: messageContent})
  },
  nextMessage ({dispatch, commit, state}) {
    if (state.messages.length === 0) return {}
    const nextMessage = state.messages[0]
    commit(types.REMOVE_MESSAGE)
    // !! return is promise
    return nextMessage
  }
}

// ----------
// Mutations
// ----------
const mutations = {
  [types.ADD_MESSAGE] (state, message) {
    if (typeof message === 'string') {
      message = {message: message}
    }
    if (typeof message.type === 'undefined') {
      message.type = 'info'
    }
    if (typeof message.title === 'undefined') {
      message.title = message.type.charAt(0).toUpperCase() + message.type.slice(1)
    }

    state.messages.push(message)
  },
  [types.REMOVE_MESSAGE] (state) {
    state.messages.shift()
  },
  [types.CLEAR_MESSAGES] (state) {
    state.messages = []
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
