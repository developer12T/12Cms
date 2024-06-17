import LayoutMain from '../views/LayoutMain.vue';
import LayoutSub from '../views/LayoutSub.vue';

const routeRoutes = [
  {
    path: '/cms',
    component: LayoutMain,
    children: [
      {
        path: 'route',
        component: () => import('../views/route/RouteMain.vue'),
      },
    ],
  },
  {
    path: '/cms/route',
    component: LayoutSub,
    children: [
      {
        path: 'detail',
        component: () => import('../views/route/RouteDetail.vue'),
      },
      {
        path: 'store',
        component: () => import('../views/route/RouteStore.vue'),
      },
      {
        path: 'location',
        component: () => import('../views/route/RouteLocation.vue'),
      },
    ],
  },
];

export default routeRoutes;
