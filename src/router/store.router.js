import LayoutMain from '../views/LayoutMain.vue';
import LayoutSub from '../views/LayoutSub.vue';

const storeRoutes = [
  {
    path: '/cms',
    component: LayoutMain,
    children: [
      {
        path: 'store',
        component: () => import('../views/store/StoreMain.vue'),
        meta: { mainRoute: true }
      },
    ],
  },
  {
    path: '/cms/store',
    component: LayoutSub,
    children: [
      {
        path: 'detail',
        component: () => import('../views/store/StoreDetail.vue'),
      },
      // {
      //   path: 'add',
      //   component: () => import('../views/store/StoreAdd.vue'),
      // },
      {
        path: 'add',
        component: () => import('../components/mobile/FormStore.vue'),
        meta: { disallowedRoute: true }
      },
    ],
  },
];

export default storeRoutes;
