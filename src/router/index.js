import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { adminRouter } from './adminRouter.js'
import { clientRouter } from './clientRouter.js'
import store from '../store'
import { access } from '../config/auth'

const routes = [
  {
    path: '/',
    name: 'Entry',
    component: () => import('../views/index/Entry.vue'),
    beforeEnter: async (to, from, next) => {
      // check if user is logged in
      const user = await store.dispatch('actUser')
      if (user) next({ path: '/home' }) 
      else next()
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/NoAuth.vue'),
      },
    ],
  },
  adminRouter,
  clientRouter,
  {
    path: '/no-auth',
    name: 'NoAuth',
    component: () => import('../views/NoAuth.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Empty',
    component: () => import('../views/Empty.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.needAdminAuth) {
    let auth
    const user = store.getters.getUser
    if (user) auth = user.auth
    else {
      const res = await store.dispatch('actUser')
      auth = res.auth
    } 
    if (!auth || !auth.includes(access.LOG_IN_ADMIN)) next({ path: '/no-auth' })
    else next()
  }
  if (to.meta?.needLogin) {
    const user = store.getters.getUser
    if (!user) {
      const token = localStorage.getItem('token')
      if (!token) next({ path: '/' })
      const user = await store.dispatch('actUser')
      if (!user) next({ path: '/' })
    }
  }
  next()
})

export default router
