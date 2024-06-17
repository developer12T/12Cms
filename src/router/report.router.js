import LayoutSub from '../views/LayoutSub.vue';

const reportRoutes = [
  {
    path: '/cms/report',
    component: LayoutSub,
    children: [
      {
        path: 'main',
        component: () => import('../views/report/ReportMain.vue'),
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
