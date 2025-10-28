import Vue from 'vue'
import Vuex from 'vuex'
import { logout } from '@/api/api'
import msg from './msg.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    HOST: 'http://localhost:8080',
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    logout({ commit }) {
      return new Promise(resolve => {
        logout().then(res => {
          
        })
        resolve()
      })
    }
  },
  modules: {
    msg
  }
})
