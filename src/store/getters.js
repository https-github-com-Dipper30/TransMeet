export const getters = {
  getToken: state => {
    return state.token
  },
  getCurrentAccount: state => {
    return state.currentAccount
  },
  getUser: state => {
    return state.user || JSON.parse(localStorage.getItem('user'))
  },
  getUserID: state => {
    return state.user?.id || Number(localStorage.getItem('user_id'))
  },
  getCurrentRoom: state => {
    return state.currentRoom
  },
  getTabbar: state => {
    return state.showTabbar
  },
  getStatus: state => {
    return state.status
  }
}
