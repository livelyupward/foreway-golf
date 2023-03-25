import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mainStore } from './store';

async function checkAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const store = mainStore();
  const { getUser, authAndGetUserFromDB } = store;

  if (localStorage.getItem('gg_token')) {
    await authAndGetUserFromDB()
      .then((response) => {
        console.log('Response from authAndGetUserFromDB():: ', response);
        return next();
      })
      .catch((err) => {
        console.error(err);
        return next({ name: 'Auth' });
      });
  }

  if (getUser.value === null) {
    import.meta.env.MODE !== 'production' && console.log('force to auth');
    return next({ name: 'Auth' });
  } else {
    next();
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
