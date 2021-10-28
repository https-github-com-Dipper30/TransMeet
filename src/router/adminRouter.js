import store from '../store'
import { access } from '../config/auth'

export const adminRouter = {
  path: '/admin',
  component: import('../views/admin/Home.vue'),
  children: [],
  beforeEnter: (to, from, next) => {
    // check if user is admin
    const user = store.state.user
    if (!user?.auth || !user.auth.includes(access.LOG_IN_ADMIN)) next({ path: '/no-auth' })
    else next()
  },
}