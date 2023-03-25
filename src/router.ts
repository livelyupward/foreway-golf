import { createRouter, createWebHistory, onBeforeRouteUpdate } from 'vue-router';
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
    path: '/authback',
    component: () => import('./views/AuthCallback.vue'),
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
