import { createRouter, createWebHistory } from 'vue-router';
import LayoutMain from '../views/LayoutMain.vue';
import StoreRouter from './store.router'
import RouteRouter from './route.router'
import OrderRouter from './order.router'
import ManageRouter from './manage.router'
import ReportRouter from './report.router'
import CnRouter from './cn.router'

const routes = [
  { path: '/cms/login', component: () => import('../views/authentication/Login.vue') },
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
  // { path: '/cms/test', component: () => import('../components/mobile/FormStore.vue') },
  { path: '/cms/test', component: () => import('../components/TestPrint.vue') },
  { path: '/cms/test1', component: () => import('../components/ConnectBluetooth.vue') },
  { path: '/cms/test2', component: () => import('../components/TestBluetooth.vue') },
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