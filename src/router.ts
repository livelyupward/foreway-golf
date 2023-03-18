import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'Home',
    path: '/',
    // @ts-ignore
    component: () => import('./views/Home.vue'),
  },
  {
    name: 'Round',
    path: '/round',
    component: () => import('./views/StartRound.vue'),
  },
  {
    path: '/test-round',
    component: () => import('./views/CurrentRound.vue'),
  },
  {
    path: '/authback',
    component: () => import('./views/AuthCallback.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
