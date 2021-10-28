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
  setCurrentRoom: ({ commit }, payload) => {
    commit('setCurrentRoom', payload)
  },
  setCurrentRoomUsers: ({ commit }, payload) => {
    commit('setCurrentRoomUsers', payload)
  },
  actTabbar: ({ commit }, payload) => {
    commit('toggleTabbar', payload)
  },
  actTabIndex: ({ commit }, payload) => {
    commit('setTabIndex', payload)
  }
}
