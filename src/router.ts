import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mainStore } from './store';
import isDebug from './plugins/debugConsole';

async function checkAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const store = mainStore();
  const { getUser, authAndGetUserFromDB } = store;

  if (localStorage.getItem('gg_token')) {
    try {
      /*
      Check if user has already been retrieved. If user continue with no db calls
       */
      if (!getUser?.id) {
        /**
         * with token in localStorage, attempt to use token and get auth
         * if fails then send to auth path to get a new token
         */
        await authAndGetUserFromDB();
      }
      return true;
    } catch (error) {
      /**
       * user could not be authed. send to the auth page to start auth process
       */
      isDebug() && console.error(error);
      return false;
    }
  }

  /**
   * if there is no user in state send to auth page only
   */
  if (getUser === null) {
    isDebug() && console.log('force to auth');
    return false;
  }
}

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    name: 'Current round',
    path: '/round/:id',
    component: () => import('./views/CurrentRound.vue'),
  },
  {
    name: 'Start',
    path: '/round',
    component: () => import('./views/StartRound.vue'),
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

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/auth') {
    const authed = await checkAuth(to, from, next);
    if (!authed) {
      return next('/auth');
    } else {
      return next();
    }
  } else {
    return next();
  }
});

export default router;
