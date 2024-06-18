import { createRouter, createWebHistory } from 'vue-router';
import LayoutMain from '../views/LayoutMain.vue';
import StoreRouter from './store.router'
import RouteRouter from './route.router'
import OrderRouter from './order.router'
import ManageRouter from './manage.router'
import ReportRouter from './report.router'
import CnRouter from './cn.router'

const routes = [
  { path: '/', component: () => import('../views/authentication/Login.vue') },
  {
    path: '/cms',
    component: LayoutMain,
    children: [
      {
        path: 'home',
        component: () => import('../views/Home.vue'),
      },
    ],
  },
  ...StoreRouter,
  ...RouteRouter,
  ...OrderRouter,
  ...ManageRouter,
  ...ReportRouter,
  ...CnRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;