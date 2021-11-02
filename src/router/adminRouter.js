export const adminRouter = {
  path: '/admin',
  name: 'Admin',
  component: () => import('../views/admin/Index.vue'),
  children: [
    {
      path: '',
      component: () => import('../views/admin/Home.vue'),
    },
    {
      path: 'staff',
      component: () => import('../views/admin/Staff.vue'),
    },
    {
      path: 'store',
      component: () => import('../views/admin/Store.vue'),
    },
    {
      path: 'product',
      component: () => import('../views/admin/Product.vue'),
    },
    {
      path: 'chat',
      component: () => import('../views/admin/Chat.vue'),
    },
  ],
  meta: {
    needAdminAuth: true,
  },

}