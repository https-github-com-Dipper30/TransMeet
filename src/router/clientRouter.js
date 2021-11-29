import store from '../store'

export const clientRouter = {
  path: '/',
  name: 'Home',
  component: () => import('../views/client/index.vue'),
  beforeEnter: async (to, from, next) => {
    // check if user is logged in
    const user = await store.dispatch('actUser')
    // if not logged in, go to entry page
    if (!user) next({ path: '/index' }) 
    else next()
  },
  children: [
    {
      path: '',
      component: () => import('../views/client/home/Home.vue'),
    },
    {
      path: 'home',
      component: () => import('../views/client/home/Home.vue'),
    },
    {
      path: 'product/:id',
      component: () => import('../views/client/product-detail/ProductDetail.vue'),
    },
    {
      path: 'cart',
      component: () => import('../views/client/cart/Cart.vue'),
    },
    {
      path: 'order',
      component: () => import('../views/client/order/Order.vue'),
    },
    {
      path: 'account',
      component: () => import('../views/client/account/Account.vue'),
    },
  ],
}