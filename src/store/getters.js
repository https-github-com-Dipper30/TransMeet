export const getters = {
  getToken: state => {
    return state.token || localStorage.getItem('token')
  },
  getCurrentAccount: state => {
    return state.currentAccount
  },
  getUser: state => {
    return state.user
  },
  // getUser: state => {
  //   return state.user || JSON.parse(localStorage.getItem('user'))
  // },
  getUserID: state => {
    return state.user?.uid || Number(localStorage.getItem('userId'))
  },
  getCartItems: state => {
    return state.cartItems
  },
  getCartItemAmount: state => {
    return state.cartItems?.length || 0
  },
}
