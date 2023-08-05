import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router';
// import * as Sentry from '@sentry/vue';
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
  faCheck,
  faUserMinus,
  faCircleQuestion,
  faCircleInfo,
  faPhoneVolume,
  faCaretLeft,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
// import * as process from 'process';

const app = createApp(App);

const pinia = createPinia();

library.add(
  faHouseChimney,
  faGolfBallTee,
  faListOl,
  faUserGear,
  faFlag,
  faCircleCheck,
  faUserMinus,
  faCircleQuestion,
  faCircleInfo,
  faPhoneVolume,
  faCaretLeft,
  faTriangleExclamation,
  faCheck,
  faDesktop
);

// if (process.env.NODE_ENV === 'production') {
//   Sentry.init({
//     app,
//     dsn: 'https://412d3ad8fbda4419af9604b9b26e0094@o4505222472073216.ingest.sentry.io/4505222473056256',
//     integrations: [
//       new Sentry.BrowserTracing({
//         routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       }),
//       new Sentry.Replay(),
//     ],
//     // Performance Monitoring
//     tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//     // Session Replay
//     replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//     replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
//   });
// }

app
  .use(vue3GoogleLogin, {
    clientId: '257187207265-45hmgvgojtvet5pdas76ih5gcrulqs7d.apps.googleusercontent.com',
  })
  .use(router)
  .use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
