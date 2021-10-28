import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { adminRouter } from './adminRouter.js'

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
        component: () => import('../views/auth/Login.vue'),
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
    path: '/home',
    name: 'Home',
    component: Home,
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
    path: '/:any',
    name: 'Empty',

    component: () => import('../views/Empty.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
