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
        return next({ name: 'Auth' });
      });
  }

  /**
   * if there is no user in state send to auth page only
   * else send to route that was intended
   */
  if (getUser.value === null) {
    isDebug() && console.log('force to auth');
    return next({ name: 'Auth' });
  } else {
    next();
  }
}

async function verifyOwnership(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const store = mainStore();
  const { getUser } = store;

  const requestRoundFromParam = await fetch(`http://localhost:4000/api/round/${to.params.id}`);
  const roundResponse = await requestRoundFromParam.json();

  console.log('verifyOwnership fired');
  // if user in state has same id as userId in passed roundId
  if (getUser.value && roundResponse.userId === getUser.value.id) {
    isDebug() && console.log('round response: ', roundResponse);
    isDebug() && console.log('user from state.value: ', getUser.value);
    isDebug() &&
      console.log('round user and getUser id match: ', getUser.value && roundResponse.userId === getUser.value.id);
    return next();
  } else {
    isDebug() && console.log('user and round do not match');
    return false;
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
