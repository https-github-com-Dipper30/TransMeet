import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { adminRouter } from './adminRouter.js'
import store from '../store'
import { access } from '../config/auth'

const routes = [
  {
    path: '/',
    name: 'Entry',
    component: () => import('../views/index/Entry.vue'),
    beforeEnter: (to, from, next) => {
      // check if user is logged in
      if (false) next({ path: '/home' }) 
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
  {
    path: '/no-auth',
    name: 'NoAuth',
    component: () => import('../views/NoAuth.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
  else next()
})

export default router
