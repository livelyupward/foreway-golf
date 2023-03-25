import { createRouter, createWebHistory } from 'vue-router';
import { mainStore } from './store';

const routes = [
  {
    path: '/',
    component: () => import('./views/MyView.vue'),
  },
  {
    path: '/round',
    component: () => import('./views/StartRound.vue'),
  },
  {
    path: '/rounds/:id',
    component: () => import('./views/CurrentRound.vue'),
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

router.beforeEach((to, from) => {
  const store = mainStore();
  const { getUser } = store;

  if (getUser.value === null && to.path !== '/auth') {
    console.log('hello');
    return { name: 'Auth' };
  }
});

router.beforeResolve((to, from) => {
  const store = mainStore();

  store.closeDrawer();
});

export default router;
