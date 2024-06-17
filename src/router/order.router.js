import LayoutMain from '../views/LayoutMain.vue';
import LayoutSub from '../views/LayoutSub.vue';

const orderRoutes = [
  {
    path: '/cms',
    component: LayoutMain,
    children: [
      {
        path: 'order',
        component: () => import('../views/order/OrderMain.vue'),
      },
    ],
  },
  {
    path: '/cms/order',
    component: LayoutSub,
    children: [
      {
        path: 'add',
        component: () => import('../views/order/OrderAdd.vue'),
      },
      {
        path: 'product',
        component: () => import('../views/order/OrderProduct.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/order/OrderCart.vue'),
      },
      {
        path: 'promotion',
        component: () => import('../views/order/OrderPromotion.vue'),
      },
      {
        path: 'checkout',
        component: () => import('../views/order/OrderCheckout.vue'),
      },
      {
        path: 'detail',
        component: () => import('../views/order/OrderDetail.vue'),
      },
    ],
  },
];

export default orderRoutes;
