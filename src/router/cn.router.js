import LayoutSub from '../views/LayoutSub.vue';

const reportRoutes = [
  {
    path: '/cms/cn',
    component: LayoutSub,
    children: [
      {
        path: 'add',
        component: () => import('../views/cn/CnAdd.vue'),
      },
      {
        path: 'product',
        component: () => import('../views/cn/CnProduct.vue'),
        // meta: { disallowedRoute: true }
      },
      {
        path: 'cart',
        component: () => import('../views/cn/CnCart.vue'),
        // meta: { disallowedRoute: true }
      },
      {
        path: 'checkout',
        component: () => import('../views/cn/CnCheckout.vue'),
        // meta: { disallowedRoute: true }
      },
      {
        path: 'addFromOrder',
        component: () => import('../views/cn/CnAddFromOrder.vue'),
      },
      {
        path: 'detail',
        component: () => import('../views/cn/CnDetail.vue'),
      },
    ],
  },
];

export default reportRoutes;
