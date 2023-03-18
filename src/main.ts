import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router';
import { createPinia } from 'pinia';
import vue3GoogleLogin from 'vue3-google-login';

const pinia = createPinia();

createApp(App)
  .use(vue3GoogleLogin, {
    clientId: '257187207265-45hmgvgojtvet5pdas76ih5gcrulqs7d.apps.googleusercontent.com',
  })
  .use(router)
  .use(pinia)
  .mount('#app');
