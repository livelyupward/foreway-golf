import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mainStore } from './store';
import isDebug from './plugins/debugConsole';

async function checkAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const store = mainStore();
  const { getUser, authAndGetUserFromDB } = store;

  if (localStorage.getItem('gg_token')) {
    try {
      /**
       * with token in localStorage, attempt to use token and get auth
       * if fails then send to auth path to get a new token
       */
      await authAndGetUserFromDB();
      return next();
    } catch (error) {
      /**
       * user could not be authed. send to the auth page to start auth process
       */
      console.error(error);
      return { name: 'Auth' };
    }
  }

  /**
   * if there is no user in state send to auth page only
   * else send to route that was intended
   */
  if (getUser === null) {
    isDebug() && console.log('force to auth');
    return next({ name: 'Auth' });
  }
}

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('./views/Home.vue'),
    beforeEnter: checkAuth,
  },
  {
    name: 'Start',
    path: '/round',
    component: () => import('./views/StartRound.vue'),
    beforeEnter: checkAuth,
  },
  {
    name: 'Current round',
    path: '/rounds/:id',
    component: () => import('./views/CurrentRound.vue'),
    beforeEnter: checkAuth,
  },
  {
    name: 'Auth',
    path: '/auth',
    component: () => import('./views/Auth.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve((to, from) => {
  const store = mainStore();

  /**
   * before nav make sure to close the drawer for mobile
   */
  store.closeDrawer();
});

export default router;
