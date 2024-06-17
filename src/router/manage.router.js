import LayoutMain from '../views/LayoutMain.vue';
import LayoutSub from '../views/LayoutSub.vue';

const manageRoutes = [
  {
    path: '/cms',
    component: LayoutMain,
    children: [
      {
        path: 'manage',
        component: () => import('../views/manage/ManageMain.vue'),
      },
    ],
  },
  {
    path: '/cms/manage',
    component: LayoutSub,
    children: [
      {
        path: 'refund',
        component: () => import('../views/manage/refund/RefundMain.vue'),
      },
      {
        path: 'refund/add',
        component: () => import('../views/manage/refund/RefundAdd.vue'),
      },
      {
        path: 'change/add',
        component: () => import('../views/manage/refund/ChangeAdd.vue'),
      },
    ],
  },
];

export default manageRoutes;
