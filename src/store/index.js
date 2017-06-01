
import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import serie from './modules/serie'
import deck from './modules/deck'
import createLogger from '../../node_modules/vuex/src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
//  actions,
//  getters,
  modules: {
    serie, deck
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
