import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mainStore } from './store';
import isDebug from './plugins/debugConsole';

async function checkAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const store = mainStore();
  const { getUser, authAndGetUserFromDB } = store;

  if (localStorage.getItem('gg_token')) {
    await authAndGetUserFromDB()
      .then(() => {
        /**
         * auth passes and allow user into the route
         */
        return next();
      })
      .catch((err) => {
        console.error(err);
        /**
         * user could not be authed. send to the auth page to start auth process
         */
        return { name: 'Auth' };
      });
  }

  /**
   * if there is no user in state send to auth page only
   * else send to route that was intended
   */
  if (getUser.value === null) {
    isDebug() && console.log('force to auth');
    return next({ name: 'Auth' });
  }
}

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/round',
    component: () => import('./views/StartRound.vue'),
    beforeEnter: checkAuth,
  },
  {
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

  store.closeDrawer();
});

export default router;
