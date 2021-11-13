export const clientRouter = {
  path: '/',
  name: 'Index',
  component: () => import('../views/client/index.vue'),
  children: [
    {
      path: 'Home',
      component: () => import('../views/client/Home.vue'),
    },
    {
      path: ''
    }
  ],
  meta: {
    // needLogin: true,
  },
}