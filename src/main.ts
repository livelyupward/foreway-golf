import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import vue3GoogleLogin from 'vue3-google-login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHouseChimney,
  faGolfBallTee,
  faListOl,
  faUserGear,
  faFlag,
  faTriangleExclamation,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const pinia = createPinia();

library.add(
  faHouseChimney,
  faGolfBallTee,
  faListOl,
  faUserGear,
  faFlag,
  faCircleCheck,
  faTriangleExclamation,
  faUserMinus
);

createApp(App)
  .use(vue3GoogleLogin, {
    clientId: '257187207265-45hmgvgojtvet5pdas76ih5gcrulqs7d.apps.googleusercontent.com',
  })
  .use(router)
  .use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
