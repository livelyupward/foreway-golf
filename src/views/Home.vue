<template>
  <main id="main-panel">
    <GoogleLogin v-if="getUser === null" :callback="callback" />
    <router-view v-else></router-view>
  </main>
</template>

<script setup lang="ts">
import { mainStore } from '../store';
import { router } from '../router';
const store = mainStore();
const { setUser, getUser, resetUser } = store;

if (localStorage.getItem('gg_token')) {
  try {
    const cachedTokenSend = await fetch(`http://localhost:4000/authback?cred=${localStorage.getItem('gg_token')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (cachedTokenSend.status === 403) {
      localStorage.removeItem('gg_token');
      resetUser();
      router.push('/');
    }

    console.log('TS: ', cachedTokenSend);
    const cachedTokenResponse = await cachedTokenSend.json();

    console.log('CTR: ', cachedTokenResponse);

    const userDbFetch = await fetch(`http://localhost:4000/api/users/${cachedTokenResponse.email}`);
    const userDbResponse: object[] = await userDbFetch.json();

    setUser(userDbResponse[0]);
  } catch (error) {
    localStorage.removeItem('gg_token');
    console.error(error);
  }
}

const callback = async (response: GoogleResponse) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log('Handle the response', response);

  localStorage.setItem('gg_token', response.credential);

  const tokenSend = await fetch(`http://localhost:4000/authback?cred=${response.credential}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('TS: ', tokenSend);
  const tokenResponse = await tokenSend.json();

  console.log('TR: ', tokenResponse);
  const userDbFetch = await fetch(`http://localhost:4000/api/users/${tokenResponse.email}`);
  const userDbResponse: object[] = await userDbFetch.json();

  setUser(userDbResponse[0]);
  router.push('/');
};

interface GoogleResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}
</script>

<style lang="scss" scoped>
.homepage-title {
  margin-top: 0;
}
</style>
