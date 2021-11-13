export const mutations = {
  // 存储当前token
  setToken: (state, token) => {
    state.token = token
  },
  setUser: (state, user) => {
    state.user = user
  },
  setCartItems: (state, items) => {
    state.cartItems = items
  },
}
