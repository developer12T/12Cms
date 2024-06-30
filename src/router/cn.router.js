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
