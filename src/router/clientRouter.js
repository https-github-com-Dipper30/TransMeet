export const clientRouter = {
  path: '/home',
  name: 'Home',
  component: () => import('../views/client/Home.vue'),
  children: [
    
  ],
  meta: {
    // needLogin: true,
  },
}