import { createRouter, createWebHistory } from 'vue-router';
import LayoutMain from '../views/LayoutMain.vue';
import StoreRouter from './store.router'
import RouteRouter from './route.router'
import OrderRouter from './order.router'
import ManageRouter from './manage.router'
import ReportRouter from './report.router'
import CnRouter from './cn.router'

const routes = [
  { path: '/', component: () => import('../views/authentication/Login.vue'), meta: { disallowedRoute: true } },
  { path: '/print', component: () => import('../views/print/Order.vue') },
  { path: '/print/detail', component: () => import('../views/print/OrderDetail.vue') },
  {
    path: '/cms',
    component: LayoutMain,
    children: [
      {
        path: 'home',
        component: () => import('../views/Home.vue'),
        meta: { mainRoute: true }
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

router.beforeEach((to, from, next) => {
  if (from.meta.disallowedRoute && !to.meta.mainRoute) {
    if (from.path.includes('/order')) {
      next({ path: '/cms/order' });
    } else if (from.path.includes('/store')) {
      next({ path: '/cms/store' });
    } else {
      next({ path: '/cms/home' });
    }
  } else {
    next();
  }
});

export default router;