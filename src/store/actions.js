import api from '../request'
import { handleResult } from '../utils'

export const actions = {
  setToken: ({ commit }, payload) => {
    commit('setToken', payload)
  },
  setCurrentAccount: ({ commit }, payload) => {
    commit('setCurrentAccount', payload)
  },
  setUser: ({ commit }, payload) => {
    commit('setUser', payload)
  },
  /**
   * get user information, if there is no user stored, post the login request
   * @param {*} store 
   * @param {Boolean} forceNew if false and user is stored, return the stored user; if true, repost login api and renew the user
   * @returns 
   */
  actUser: async (store, forceNew = false) => {
    let user = store.getters.getUser
    if (user && !forceNew) return user
    // now user is not stored and the information needs renewal
    // if no token store, return false
    // if token exists, login using token
    const token = localStorage.getItem('token')
    if (!token) return false
    const { loginByToken } = api
    const res = await loginByToken()
    if (!handleResult(res, true, 'Welcome Back!')) return false
    user = res.data.user
    store.commit('setUser', user)
    // localStorage.setItem('token', res.data.token)
    return user
  },
}
