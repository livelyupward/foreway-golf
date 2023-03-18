import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    // @ts-ignore
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
  // {
  //   path: '/test-round',
  //   component: () => import('./views/CurrentRound.vue'),
  // },
  {
    path: '/authback',
    component: () => import('./views/AuthCallback.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
