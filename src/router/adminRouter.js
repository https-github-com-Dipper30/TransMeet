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
      component: () => import('../views/admin/staff/Staff.vue'),
    },
    {
      path: 'store',
      component: () => import('../views/admin/store/Store.vue'),
    },
    {
      path: 'product',
      component: () => import('../views/admin/product/Product.vue'),
    },
    {
      path: 'order',
      component: () => import('../views/admin/order/Order.vue'),
    },
    {
      path: 'chat',
      component: () => import('../views/admin/chat/Chat.vue'),
    },
  ],
  meta: {
    needAdminAuth: true,
  },

}