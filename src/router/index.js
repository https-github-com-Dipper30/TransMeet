import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '',
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
