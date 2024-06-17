import LayoutSub from '../views/LayoutSub.vue';

const reportRoutes = [
  {
    path: '/cms/cn',
    component: LayoutSub,
    children: [
      {
        path: 'add',
        component: () => import('../views/order/cn/CnAdd.vue'),
      },
      {
        path: 'month',
        component: () => import('../views/report/ReportMonth.vue'),
      },
      {
        path: 'group',
        component: () => import('../views/report/ReportGroup.vue'),
      },
      {
        path: 'sku',
        component: () => import('../views/report/ReportSku.vue'),
      },
    ],
  },
];

export default reportRoutes;
