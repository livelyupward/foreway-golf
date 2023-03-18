<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div id="app-container">
        <SidebarNav id="side-panel" />
        <main id="main-panel">
          <Suspense>
            <GoogleLogin v-if="!user" :callback="callback" />
            <router-view v-else></router-view>
            <template #fallback> Loading... </template>
          </Suspense>
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides, NMessageProvider } from 'naive-ui';
import SidebarNav from './components/SidebarNav.vue';
import { mainStore } from './store';

const store = mainStore();
const { setUser, user } = store;

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3d5afe',
    fontSize: '18px',
  },
  Button: {
    textColor: '#3d5afe',
  },
};

if (localStorage.getItem('gg_token')) {
  const cachedTokenSend = await fetch(`http://localhost:4000/authback?cred=${localStorage.getItem('gg_token')}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('TS: ', cachedTokenSend);
  const cachedTokenResponse = await cachedTokenSend.json();

  console.log('CTR: ', cachedTokenResponse);

  const userDbFetch = await fetch(`http://localhost:4000/api/users/${cachedTokenResponse.email}`);
  const userDbResponse: object[] = await userDbFetch.json();

  setUser(userDbResponse[0]);
}

const callback = async (response: GoogleResponse) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log('Handle the response', response);

  response.credential && localStorage.setItem('gg_token', response.credential);

  const tokenSend = await fetch(`http://localhost:4000/authback?cred=${response.credential}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('TS: ', tokenSend);
  const tokenResponse = await tokenSend.json();

  console.log('TR: ', tokenResponse);
};

interface GoogleResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}
</script>

<style lang="scss">
#app-container {
  //display: grid;
  //grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

#main-panel {
  border-left: 1px solid darkslategrey;
  padding: 30px;
}

h1 {
  margin-top: 0;
}
</style>
